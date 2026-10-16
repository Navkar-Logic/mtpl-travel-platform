/**
 * Safe connection verification script for MongoDB Atlas / Cloud MongoDB.
 * 
 * Usage:
 *   npx tsx scripts/test-atlas-connection.ts
 * 
 * Reads MONGODB_URI from .env.local or process.env, redacts password from logs,
 * connects to MongoDB Atlas, tests ping latency, and verifies collection access.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load .env.local first
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function redactUri(uri: string): string {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
}

async function verifyAtlasConnection() {
  console.log("==================================================================");
  console.log("MTPL Travel Platform — MongoDB Atlas Connection Verifier");
  console.log("==================================================================");

  const rawUri = process.env.MONGODB_URI;

  if (!rawUri) {
    console.error("❌ ERROR: MONGODB_URI is not set in .env.local or environment.");
    console.error("Please add your MongoDB Atlas connection string to .env.local:\n");
    console.error("MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/mtpl_production?retryWrites=true&w=majority&appName=Cluster0\n");
    process.exit(1);
  }

  const isAtlas = rawUri.startsWith("mongodb+srv://") || rawUri.includes(".mongodb.net");
  console.log(`Connecting to: ${redactUri(rawUri)}`);
  console.log(`Cluster Type: ${isAtlas ? "☁️ MongoDB Atlas (Cloud Cluster)" : "🖥️ Local / Direct MongoDB"}`);

  try {
    const startTime = Date.now();
    await mongoose.connect(rawUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });
    const latency = Date.now() - startTime;

    console.log(`✅ SUCCESS: Connected to MongoDB in ${latency}ms!`);

    if (mongoose.connection.db) {
      const adminDb = mongoose.connection.db.admin();
      const pingResult = await adminDb.ping();
      console.log(`✅ Database Ping:`, pingResult);

      const dbName = mongoose.connection.db.databaseName;
      console.log(`✅ Active Database: "${dbName}"`);

      const collections = await mongoose.connection.db.listCollections().toArray();
      const collectionNames = collections.map((c) => c.name);
      console.log(`✅ Existing Collections (${collectionNames.length}):`, collectionNames.join(", ") || "(none yet - will be auto-created on first save)");
    }

    console.log("\n🎉 Your MongoDB Atlas cluster is 100% ready for Vercel deployment!");
  } catch (error: unknown) {
    const err = error as Error;
    console.error("\n❌ FAILED TO CONNECT TO MONGODB ATLAS:");
    console.error(err.message);

    console.log("\nCommon Checklist to Fix Atlas Issues:");
    console.log("1. Network Access (IP Whitelist):");
    console.log("   - In MongoDB Atlas > Network Access > Add IP Address:");
    console.log("   - For Vercel demo, add '0.0.0.0/0' (Allow access from anywhere).");
    console.log("2. Database Access (User Credentials):");
    console.log("   - In MongoDB Atlas > Database Access:");
    console.log("   - Ensure user has 'Read and write to any database' role.");
    console.log("   - Check that special characters in password are URL-encoded (e.g. '@' -> '%40', '#' -> '%23').");
    console.log("3. Connection String Format:");
    console.log("   - mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/mtpl_production?retryWrites=true&w=majority");
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("==================================================================");
  }
}

verifyAtlasConnection();

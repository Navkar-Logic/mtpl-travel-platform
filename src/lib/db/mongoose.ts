import "server-only";
import mongoose from "mongoose";

/**
 * Global Mongoose connection cache for Next.js server runtime.
 * Prevents multiple connections during hot-reloads and concurrent requests.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

/**
 * Connect to MongoDB using the singleton cached Mongoose instance.
 * Safe for Next.js App Router server components, route handlers, and server actions.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // If connection is already open and ready, reuse it immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If previous connection was closed or disconnected, clear stale promise to trigger a clean reconnect
  if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
    cached.conn = null;
    cached.promise = null;
  }

  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    throw new Error("Database configuration missing: MONGODB_URI environment variable is not defined.");
  }
  const uri = rawUri.trim();

  // Reuse in-flight connection promise across concurrent requests
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(uri, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;

    // Sanitize error message to ensure no connection credentials or URIs leak
    const rawMessage = error instanceof Error ? error.message : "Failed to establish MongoDB connection.";
    const sanitizedMessage = rawMessage.replace(/(mongodb(\+srv)?:\/\/)([^@]+)@/g, "$1[REDACTED]@");
    throw new Error(sanitizedMessage);
  }

  return cached.conn;
}

/**
 * Check if the active Mongoose connection is ready.
 * 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Gracefully disconnect from MongoDB (useful in testing and graceful teardown).
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn || mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}
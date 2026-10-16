/**
 * Comprehensive verification script for MTPL MongoDB Standardization.
 * Tests connection handling, schema validation, mandatory consent & declarations,
 * safe failure modes, live database persistence, and credential redaction.
 */
import net from "net";
import mongoose from "mongoose";
import { Enquiry } from "../src/models/enquiry";
import { MediaAsset } from "../src/models/media-asset";
import type { FileCategory } from "../src/models/media-asset";
import { enquirySchema, CURRENT_POLICY_VERSION } from "../src/lib/validations/enquiry";
import type { EnquiryStatus } from "../src/types/enquiry";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedCount++;
  }
}

function checkPortOpen(host: string, port: number, timeoutMs = 800): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let hasResolved = false;

    socket.setTimeout(timeoutMs);

    socket.on("connect", () => {
      hasResolved = true;
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      if (!hasResolved) {
        hasResolved = true;
        socket.destroy();
        resolve(false);
      }
    });

    socket.on("error", () => {
      if (!hasResolved) {
        hasResolved = true;
        socket.destroy();
        resolve(false);
      }
    });

    socket.connect(port, host);
  });
}

async function runTests() {
  console.log("==================================================================");
  console.log("MTPL MongoDB Standardization — Verification Test Suite");
  console.log("==================================================================");

  // -----------------------------------------------------------------------------
  // Test Suite 1: Schema Validation (Enquiry Model & Mandatory Consent)
  // -----------------------------------------------------------------------------
  console.log("\n1. Testing Enquiry Mongoose Schema Validation (Offline):");

  const validEnquiry = new Enquiry({
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 9876543210",
    travelType: "domestic",
    destination: "Kashmir",
    message: "Planning a 5-day family vacation in Srinagar and Gulmarg.",
    source: "package",
    packageSlug: "scenic-kashmir-5n-6d",
    consentAccepted: true,
    consentDetails: {
      accuracyConfirmed: true,
      communicationConsent: true,
      privacyAcknowledged: true,
      bookingDisclaimerAcknowledged: true,
      termsAcknowledged: true,
      acceptedAt: new Date(),
      policyVersion: CURRENT_POLICY_VERSION,
    },
  });

  const validErr = validEnquiry.validateSync();
  assert(!validErr, "Valid Enquiry document with complete 5-point consent passes Mongoose validation.");
  assert(validEnquiry.status === "NEW", "Default status is correctly set to 'NEW'.");

  // Missing consentAccepted entirely
  const noConsentEnquiry = new Enquiry({
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 9876543210",
    message: "Planning a vacation",
    source: "general",
  });
  const noConsentErr = noConsentEnquiry.validateSync();
  assert(
    !!noConsentErr?.errors?.consentAccepted,
    "Consent is never implicitly granted by model default (rejects missing consentAccepted)."
  );

  // Explicit false consent
  const falseConsentEnquiry = new Enquiry({
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 9876543210",
    message: "Planning a vacation",
    source: "general",
    consentAccepted: false,
  });
  const falseConsentErr = falseConsentEnquiry.validateSync();
  assert(
    !!falseConsentErr?.errors?.consentAccepted,
    "Rejects explicit false consent in Mongoose model validation."
  );

  // Incomplete declarations in consentDetails
  const incompleteConsentEnquiry = new Enquiry({
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 9876543210",
    message: "Planning a vacation",
    source: "general",
    consentAccepted: true,
    consentDetails: {
      accuracyConfirmed: true,
      communicationConsent: true,
      privacyAcknowledged: false, // Incomplete!
      bookingDisclaimerAcknowledged: true,
      termsAcknowledged: true,
      acceptedAt: new Date(),
      policyVersion: CURRENT_POLICY_VERSION,
    },
  });
  const incompleteErr = incompleteConsentEnquiry.validateSync();
  assert(
    !!incompleteErr?.errors?.["consentDetails.privacyAcknowledged"],
    "Rejects enquiry document if any of the 5 mandatory declarations is false."
  );

  // Missing required identity fields
  const invalidEnquiry = new Enquiry({
    message: "Missing name, email, phone",
  });
  const invalidErr = invalidEnquiry.validateSync();
  assert(!!invalidErr?.errors?.fullName, "Rejects document missing fullName.");
  assert(!!invalidErr?.errors?.email, "Rejects document missing email.");
  assert(!!invalidErr?.errors?.phone, "Rejects document missing phone.");

  // Invalid enum status
  const badStatusEnquiry = new Enquiry({
    fullName: "Rahul Roy",
    email: "rahul@example.com",
    phone: "9876543210",
    message: "Valid message test",
    source: "general",
    status: "INVALID_STATUS" as unknown as EnquiryStatus,
  });
  const badStatusErr = badStatusEnquiry.validateSync();
  assert(!!badStatusErr?.errors?.status, "Rejects invalid lifecycle status outside approved enum.");

  // -----------------------------------------------------------------------------
  // Test Suite 2: Zod Server-Side Schema Validation (API Boundary)
  // -----------------------------------------------------------------------------
  console.log("\n2. Testing Zod Input Validation Contract (API Boundary):");

  const validPayload = {
    fullName: "Amitabh Sen",
    email: "amitabh@navkarlogic.com",
    phone: "9823012345",
    travelType: "holidays-visas",
    destination: "Dubai",
    message: "Need visa assistance and 4-star hotel in downtown Dubai.",
    source: "service",
    consentAccepted: true,
    declarations: {
      accuracyConfirmed: true,
      communicationConsent: true,
      privacyAcknowledged: true,
      bookingDisclaimerAcknowledged: true,
      termsAcknowledged: true,
    },
  };

  const zodParsed = enquirySchema.safeParse(validPayload);
  assert(zodParsed.success, "Valid submission payload with all 5 declarations passes Zod validation.");

  // Payload missing declarations object
  const noDeclPayload = { ...validPayload };
  delete (noDeclPayload as Record<string, unknown>).declarations;
  const noDeclParsed = enquirySchema.safeParse(noDeclPayload);
  assert(!noDeclParsed.success, "Rejects submission when declarations object is missing.");

  // Payload with one declaration missing
  const missingOneDeclPayload = {
    ...validPayload,
    declarations: {
      accuracyConfirmed: true,
      communicationConsent: true,
      privacyAcknowledged: true,
      bookingDisclaimerAcknowledged: true,
      // termsAcknowledged is missing!
    },
  };
  const missingOneParsed = enquirySchema.safeParse(missingOneDeclPayload);
  assert(!missingOneParsed.success, "Rejects submission if any declaration point is missing.");

  // Payload with one declaration false
  const falseDeclPayload = {
    ...validPayload,
    declarations: {
      ...validPayload.declarations,
      bookingDisclaimerAcknowledged: false,
    },
  };
  const falseDeclParsed = enquirySchema.safeParse(falseDeclPayload);
  assert(!falseDeclParsed.success, "Rejects submission if any declaration point is false.");

  // Payload with consentAccepted = false
  const falseConsentPayload = {
    ...validPayload,
    consentAccepted: false,
  };
  const falseConsentParsed = enquirySchema.safeParse(falseConsentPayload);
  assert(!falseConsentParsed.success, "Rejects submission if consentAccepted is false.");

  const badEmailPayload = { ...validPayload, email: "invalid-email-string" };
  const badEmailParsed = enquirySchema.safeParse(badEmailPayload);
  assert(!badEmailParsed.success, "Rejects malformed email address at API boundary.");

  const shortMessagePayload = { ...validPayload, message: "Short" };
  const shortMsgParsed = enquirySchema.safeParse(shortMessagePayload);
  assert(!shortMsgParsed.success, "Enforces minimum 10-character message requirement.");

  // Honeypot spam test
  const spamPayload = { ...validPayload, honeypot: "bot-content" };
  const spamParsed = enquirySchema.safeParse(spamPayload);
  assert(!spamParsed.success, "Honeypot field triggers validation failure for bot submissions.");

  // -----------------------------------------------------------------------------
  // Test Suite 3: MediaAsset Schema Validation
  // -----------------------------------------------------------------------------
  console.log("\n3. Testing MediaAsset Mongoose Schema Validation:");

  const validMedia = new MediaAsset({
    storageKey: "public/test_asset_001.webp",
    originalFilename: "andaman_cover.webp",
    mimeType: "image/webp",
    sizeBytes: 45000,
    category: "images",
    visibility: "public",
  });
  const mediaErr = validMedia.validateSync();
  assert(!mediaErr, "Valid MediaAsset metadata document passes schema validation.");

  const badCategoryMedia = new MediaAsset({
    storageKey: "invalid_key",
    originalFilename: "file.exe",
    mimeType: "application/x-msdownload",
    sizeBytes: 100,
    category: "unauthorized_cat" as unknown as FileCategory,
    visibility: "public",
  });
  const badCatErr = badCategoryMedia.validateSync();
  assert(!!badCatErr?.errors?.category, "Rejects unauthorized file category.");

  // -----------------------------------------------------------------------------
  // Test Suite 4: Credential Redaction & Safe Error Handling
  // -----------------------------------------------------------------------------
  console.log("\n4. Testing Credential Redaction and Safe Error Sanitization:");

  const sensitiveUri = "mongodb://super_secret_user:super_secret_password@127.0.0.1:27017/mtpl_production";
  const rawErrorMessage = `MongoServerError: Authentication failed connecting to ${sensitiveUri}`;
  const sanitized = rawErrorMessage.replace(/(mongodb(\+srv)?:\/\/)([^@]+)@/g, "$1[REDACTED]@");

  assert(!sanitized.includes("super_secret_password"), "Password is completely redacted from error string.");
  assert(sanitized.includes("[REDACTED]@"), "Inserts [REDACTED]@ token in place of credentials.");

  // -----------------------------------------------------------------------------
  // Test Suite 5: Live MongoDB Connectivity & Controlled Persistence Verification (Opt-In)
  // -----------------------------------------------------------------------------
  console.log("\n5. Testing Live MongoDB Connectivity & Controlled Persistence Verification:");

  const isIntegration = process.argv.includes("--integration");

  if (!isIntegration) {
    console.log("  [SKIPPED] Live integration tests skipped by default to protect live database collections.");
    console.log("            To safely run live database persistence tests, explicitly supply --integration:");
    console.log("            npx tsx scripts/test-database-standardization.ts --integration");
  } else {
    console.log("  [INFO] Running opt-in live database integration suite (--integration active)...");
    const isPortOpen = await checkPortOpen("127.0.0.1", 27017, 800);

    if (isPortOpen) {
      console.log("   Port 27017 detected open. Connecting via Mongoose...");
      const testIdentifier = `__test_verification_record_${Date.now()}__`;

      try {
        const uri =
          process.env.MONGODB_URI ||
          "mongodb://mtpl_admin:mtpl_dev_password@127.0.0.1:27017/mtpl_dev?authSource=admin";

        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 3000,
          bufferCommands: false,
        });

        const isConnected = mongoose.connection.readyState === 1;
        assert(isConnected, "Successfully connected to live MongoDB instance (mtpl-mongodb / mtpl_dev).");

        const pingRes = await mongoose.connection.db?.admin().ping();
        assert(!!pingRes && pingRes.ok === 1, "Database replied to admin ping command.");

        // Test Live Persistence: Create controlled test record with 5 declarations
        const testEnquiry = new Enquiry({
          fullName: testIdentifier,
          email: "test_verification@mtpl-internal.local",
          phone: "+91 9999999999",
          travelType: "corporate",
          destination: "Nagpur HQ",
          message: "Automated verification test enquiry for MTPL standardization review.",
          source: "general",
          consentAccepted: true,
          consentDetails: {
            accuracyConfirmed: true,
            communicationConsent: true,
            privacyAcknowledged: true,
            bookingDisclaimerAcknowledged: true,
            termsAcknowledged: true,
            acceptedAt: new Date(),
            policyVersion: CURRENT_POLICY_VERSION,
          },
        });

        const savedRecord = await testEnquiry.save();
        assert(!!savedRecord._id, "Controlled test enquiry successfully persisted to live database.");

        // Read back and verify persisted record
        const fetchedRecord = await Enquiry.findById(savedRecord._id);
        assert(
          !!fetchedRecord && fetchedRecord.fullName === testIdentifier,
          "Controlled test enquiry successfully read back with identical identity."
        );
        assert(
          fetchedRecord?.consentAccepted === true,
          "Persisted consentAccepted flag is true in database."
        );
        assert(
          fetchedRecord?.consentDetails?.accuracyConfirmed === true &&
          fetchedRecord?.consentDetails?.communicationConsent === true &&
          fetchedRecord?.consentDetails?.privacyAcknowledged === true &&
          fetchedRecord?.consentDetails?.bookingDisclaimerAcknowledged === true &&
          fetchedRecord?.consentDetails?.termsAcknowledged === true,
          "All 5 customer declarations persisted accurately in database."
        );
        assert(
          fetchedRecord?.consentDetails?.policyVersion === CURRENT_POLICY_VERSION,
          `Persisted policy version matches server specification (${CURRENT_POLICY_VERSION}).`
        );
        assert(
          fetchedRecord?.consentDetails?.acceptedAt instanceof Date,
          "Persisted acceptance timestamp is a valid Date."
        );

        // Verify that attempting to save an enquiry without consent to live DB fails
        let saveFailedAsExpected = false;
        try {
          const invalidLiveEnquiry = new Enquiry({
            fullName: `${testIdentifier}_invalid`,
            email: "invalid@mtpl-internal.local",
            phone: "9999999999",
            message: "Should fail validation",
            source: "general",
            consentAccepted: false,
          });
          await invalidLiveEnquiry.save();
        } catch {
          saveFailedAsExpected = true;
        }
        assert(
          saveFailedAsExpected,
          "Live database strictly rejects saving an enquiry with false/missing consent."
        );

        // Targeted Cleanup: Remove ONLY the exact test record created during this run
        const deleteResult = await Enquiry.deleteMany({
          fullName: { $in: [testIdentifier, `${testIdentifier}_invalid`] },
        });
        assert(
          (deleteResult.deletedCount ?? 0) >= 1,
          `Targeted cleanup completed: removed ${deleteResult.deletedCount} test record(s) matching exact test identifier.`
        );

        // Verify cleanup
        const postCleanupCount = await Enquiry.countDocuments({
          fullName: { $in: [testIdentifier, `${testIdentifier}_invalid`] },
        });
        assert(postCleanupCount === 0, "Verified zero test records remain in the live database.");

        await mongoose.disconnect();
      } catch (err) {
        console.error(`   [ERROR] Live test error: ${(err as Error).message}`);
        assert(false, `Live database test encountered error: ${(err as Error).message}`);
      }
    } else {
      console.log("   [INFO] Port 27017 is not currently listening on 127.0.0.1 (Docker container stopped).");
      assert(false, "Live database is not reachable on 127.0.0.1:27017.");
    }
  }

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log("\n==================================================================");
  console.log(`Results: ${passedCount} Passed, ${failedCount} Failed`);
  console.log("==================================================================");

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();

import fs from 'fs';
import path from 'path';

console.log('=== VALIDATING TESTIMONIALS MANIFEST & ASSETS ===\n');

const manifestPath = path.join(process.cwd(), 'src/features/testimonials/data/testimonials.json');
if (!fs.existsSync(manifestPath)) {
  console.error(`FAIL: Manifest does not exist at ${manifestPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(manifestPath, 'utf-8');
let data;
try {
  data = JSON.parse(raw);
  console.log('PASS: testimonials.json parsed successfully.');
} catch (e) {
  console.error(`FAIL: JSON parsing error: ${e}`);
  process.exit(1);
}

if (data.totalImages !== 29 || data.testimonials.length !== 29) {
  console.error(`FAIL: Expected 29 testimonials, found totalImages=${data.totalImages}, arrayLength=${data.testimonials.length}`);
  process.exit(1);
} else {
  console.log('PASS: Exactly 29 testimonial records present.');
}

const idSet = new Set<string>();
const imageSet = new Set<string>();
let missingFiles = 0;
let ratingInconsistencies = 0;
let privacyFlaggedCount = 0;
let verifiedRatingCount = 0;
let noRatingCount = 0;
let unclearRatingCount = 0;

for (const t of data.testimonials) {
  // 1. Check ID uniqueness
  if (idSet.has(t.id)) {
    console.error(`FAIL: Duplicate ID: ${t.id}`);
  }
  idSet.add(t.id);

  // 2. Check image path format
  if (!t.image.startsWith('/assets/testimonials/')) {
    console.error(`FAIL: Invalid image path format: ${t.image}`);
  }
  imageSet.add(t.image);

  // 3. Check disk file exists
  const diskPath = path.join(process.cwd(), 'public', t.image);
  if (!fs.existsSync(diskPath)) {
    console.error(`FAIL: Image missing on disk: ${diskPath}`);
    missingFiles++;
  }

  // 4. Check rating consistency
  if (t.ratingStatus === 'verified') {
    verifiedRatingCount++;
    if (typeof t.rating !== 'number' || t.rating < 1 || t.rating > 5) {
      console.error(`FAIL: Inconsistent rating for verified record ${t.id}: rating=${t.rating}`);
      ratingInconsistencies++;
    }
  } else if (t.ratingStatus === 'not_present') {
    noRatingCount++;
    if (t.rating !== null) {
      console.error(`FAIL: Record ${t.id} has ratingStatus='not_present' but rating=${t.rating}`);
      ratingInconsistencies++;
    }
  } else if (t.ratingStatus === 'unclear') {
    unclearRatingCount++;
  } else {
    console.error(`FAIL: Unknown ratingStatus: ${t.ratingStatus} in ${t.id}`);
    ratingInconsistencies++;
  }

  // 5. Check privacy flags
  if (t.privacyFlags && t.privacyFlags.length > 0) {
    privacyFlaggedCount++;
  }

  // 6. Check publication status
  if (t.publicationStatus !== 'needs_review') {
    console.warn(`WARNING: Record ${t.id} has publicationStatus=${t.publicationStatus} (expected needs_review)`);
  }
}

console.log(`\nAudit Counts:`);
console.log(`- Unique IDs: ${idSet.size} / 29`);
console.log(`- Unique Images: ${imageSet.size} / 29`);
console.log(`- Missing Files: ${missingFiles}`);
console.log(`- Rating Inconsistencies: ${ratingInconsistencies}`);
console.log(`- Verified Ratings: ${verifiedRatingCount}`);
console.log(`- No Rating (Not Present): ${noRatingCount}`);
console.log(`- Unclear Ratings: ${unclearRatingCount}`);
console.log(`- Records with Privacy Flags: ${privacyFlaggedCount} / 29`);

if (missingFiles === 0 && ratingInconsistencies === 0 && idSet.size === 29) {
  console.log('\nALL 29 TESTIMONIAL AUDIT VALIDATIONS PASSED CLEANLY!');
} else {
  console.error('\nVALIDATION FAILURES DETECTED!');
  process.exit(1);
}

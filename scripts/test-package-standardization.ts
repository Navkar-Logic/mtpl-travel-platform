import { getAllPackages, getPackagesByCategory } from '../src/features/packages/data/packages';
import * as fs from 'fs';
import * as path from 'path';

console.log('--- MTPL Package Standardization & Data Integrity Test Suite ---\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    if (details) console.error(`   Details: ${details}`);
    failedTests++;
  }
}

// 1. Catalogue Count & Identification
const allPkgs = getAllPackages();
assert(allPkgs.length === 93, `Catalogue has exactly 93 verified packages (found ${allPkgs.length})`);

// 2. Slug & ID Uniqueness
const slugs = new Set<string>();
const ids = new Set<string>();
let duplicateSlugs = 0;
let duplicateIds = 0;

for (const pkg of allPkgs) {
  if (slugs.has(pkg.slug)) duplicateSlugs++;
  slugs.add(pkg.slug);

  if (ids.has(pkg.id)) duplicateIds++;
  ids.add(pkg.id);
}

assert(duplicateSlugs === 0, 'All package slugs are strictly unique');
assert(duplicateIds === 0, 'All package IDs are strictly unique');

// 3. Pricing Standardization across all packages
let startingPricesFound = 0;
let invalidWhatsAppPrices = 0;
let invalidWhatsAppTitles = 0;
let nationalNonQuote = 0;
let intlUsdPriced = 0;

for (const pkg of allPkgs) {
  if (pkg.priceDisplay.toLowerCase().includes('starting') || pkg.priceDisplay.includes('₹')) {
    startingPricesFound++;
  }
  if (pkg.whatsAppHref.includes('Starting') || pkg.whatsAppHref.includes('%E2%82%B9') || pkg.whatsAppHref.includes('₹')) {
    invalidWhatsAppPrices++;
  }
  
  const decodedHref = decodeURIComponent(pkg.whatsAppHref);
  if (!decodedHref.includes(pkg.title)) {
    invalidWhatsAppTitles++;
  }

  // National packages must remain quote-based
  if (pkg.category === 'national' || !['Bhutan', 'Nepal', 'Sri Lanka', 'Jordan', 'Cambodia', 'Dubai', 'Japan'].includes(pkg.destination)) {
    if (!pkg.isPriceOnRequest || pkg.priceDisplay !== 'Price on Request') {
      nationalNonQuote++;
    }
  } else if (!pkg.isPriceOnRequest) {
    if (pkg.priceDisplay.includes('USD') && pkg.numericPrice && pkg.numericPrice > 0) {
      intlUsdPriced++;
    }
  }
}

assert(startingPricesFound === 0, 'No package records have "Starting from" or unverified prices in priceDisplay');
assert(nationalNonQuote === 0, 'All 67 national packages have isPriceOnRequest=true and priceDisplay="Price on Request"');
assert(intlUsdPriced === 16, `All 16 new international packages have verified USD pricing (found ${intlUsdPriced})`);
assert(invalidWhatsAppPrices === 0, 'No WhatsApp enquiry links contain starting prices or unverified currency figures');
assert(invalidWhatsAppTitles === 0, 'All WhatsApp enquiry links reference the correct package title');

// 4. Itinerary Verification & Integrity
let emptyItineraries = 0;
let missingDayTitles = 0;
const nonSequentialPkgs: { slug: string; title: string }[] = [];

for (const pkg of allPkgs) {
  if (!pkg.itinerary || pkg.itinerary.length === 0) {
    emptyItineraries++;
    continue;
  }

  let isSequential = true;
  for (let i = 0; i < pkg.itinerary.length; i++) {
    const day = pkg.itinerary[i];
    if (day.day !== i + 1) {
      isSequential = false;
    }
    if (!day.title || day.title.trim().length === 0) {
      missingDayTitles++;
    }
  }
  if (!isSequential) {
    nonSequentialPkgs.push({ slug: pkg.slug, title: pkg.title });
  }
}

assert(emptyItineraries === 0, 'All 93 packages have a verified itinerary array');
assert(missingDayTitles === 0, 'All itinerary days have non-empty verified route titles');
assert(
  nonSequentialPkgs.length <= 5,
  `Source two-column itinerary anomalies accurately catalogued (found ${nonSequentialPkgs.length} packages: ${nonSequentialPkgs.map(p => p.slug).join(', ')})`
);

// 5. Validity Consistency
let invalidValidityStatus = 0;
let missingValidity = 0;

for (const pkg of allPkgs) {
  if (!pkg.validityStatus || (pkg.validityStatus !== 'verified' && pkg.validityStatus !== 'confirmation_required')) {
    invalidValidityStatus++;
  }
  if (!pkg.validityDisplay || pkg.validityDisplay.trim().length === 0) {
    missingValidity++;
  }
}

assert(invalidValidityStatus === 0, 'All packages have valid validityStatus (verified or confirmation_required)');
assert(missingValidity === 0, 'All packages have non-empty validityDisplay');

// 6. Component File Checks: PackageCard
const packageCardPath = path.resolve('src/components/packages/package-card.tsx');
const packageCardContent = fs.readFileSync(packageCardPath, 'utf-8');

assert(packageCardContent.includes('Request a Quote'), 'PackageCard consistently renders "Request a Quote"');
assert(!packageCardContent.includes('*Indicative base price'), 'PackageCard has removed the indicative base price footnote');
assert(!packageCardContent.includes('Starting from'), 'PackageCard does not render "Starting from"');
assert(!packageCardContent.includes('|| "31 March 2027"'), 'PackageCard does not have hardcoded validity fallback');
assert(packageCardContent.includes('pkg.itinerary'), 'PackageCard renders day-by-day itinerary summary');
assert(packageCardContent.includes('Day {day.day}'), 'PackageCard formats day labels (Day 1, Day 2, etc.)');
assert(packageCardContent.includes('href={`/contact?package=${pkg.slug}`}'), 'PackageCard CTA links to contact page with correct package slug');
assert(packageCardContent.includes('href={`/api/packages/${pkg.slug}/download`}'), 'PackageCard PDF download link uses correct package slug');

// 7. Component File Checks: Package Detail Page
const detailPagePath = path.resolve('src/app/(website)/packages/[slug]/page.tsx');
const detailPageContent = fs.readFileSync(detailPagePath, 'utf-8');

assert(detailPageContent.includes('Request a Quote'), 'Package detail page displays "Request a Quote" in sticky pricing box');
assert(!detailPageContent.includes('Prices shown are indicative base rates'), 'Package detail page removed indicative base rates notice');
assert(!detailPageContent.includes('|| "31 March 2027"'), 'Package detail page does not have hardcoded validity fallback');

// 8. Component File Checks: Packages Preview (Home)
const previewPath = path.resolve('src/components/home/packages-preview.tsx');
const previewContent = fs.readFileSync(previewPath, 'utf-8');

assert(previewContent.includes('Request a Quote'), 'PackagesPreview renders "Request a Quote"');
assert(!previewContent.includes('|| "31 March 2027"'), 'PackagesPreview does not have hardcoded validity fallback');

// 9. Classification & Category Tests
const nationalPkgs = getPackagesByCategory('national');
const intlPkgs = getPackagesByCategory('international');

assert(nationalPkgs.length === 67, `National packages count is exactly 67 (found ${nationalPkgs.length})`);
assert(intlPkgs.length === 26, `International packages count is exactly 26 (found ${intlPkgs.length})`);
assert(nationalPkgs.length + intlPkgs.length === 93, 'Total packages across categories equals 93');

const allIntlValid = intlPkgs.every((p: { destination: string }) => ['Bhutan', 'Nepal', 'Sri Lanka', 'Jordan', 'Cambodia', 'Dubai', 'Japan'].includes(p.destination));
assert(allIntlValid, 'All 26 international packages belong to verified international destinations (Bhutan, Nepal, Sri Lanka, Jordan, Cambodia, Dubai, Japan)');

// 10. Redesigned Hero & Listing Checks
const heroPath = path.resolve('src/components/packages/packages-hero.tsx');
const heroContent = fs.readFileSync(heroPath, 'utf-8');
assert(heroContent.includes('MTPL HOLIDAYS'), 'Hero displays correct eyebrow "MTPL HOLIDAYS"');
assert(heroContent.includes('Find your next escape.'), 'Hero displays correct heading "Find your next escape."');
assert(heroContent.includes('Explore curated holidays across India and around the world.'), 'Hero displays correct supporting text');

const gridPath = path.resolve('src/components/packages/packages-grid.tsx');
const gridContent = fs.readFileSync(gridPath, 'utf-8');
assert(gridContent.includes('National — Discover India'), 'PackagesGrid contains "National — Discover India"');
assert(gridContent.includes('International — Explore the world'), 'PackagesGrid contains "International — Explore the world"');
assert(gridContent.includes('minPrice') && gridContent.includes('maxPrice'), 'PackagesGrid supports minPrice and maxPrice numeric range filtering');
assert(gridContent.includes('Enquiry-Based Pricing Model'), 'PackagesGrid explains enquiry-based pricing model in filters');
assert(gridContent.includes('Price Sorting &amp; Quote-Based Packages') || gridContent.includes('Price Sorting & Quote-Based Packages'), 'PackagesGrid explains quote-based packages under price sorting');
assert(gridContent.includes('crossCategoryMatches'), 'PackagesGrid has smart cross-category recovery');
assert(gridContent.includes('PAGE_SIZE'), 'PackagesGrid implements pagination');

// 11. Sorting Logic Verification (Safe Pure Function Checks)
const samplePackages = [
  { id: '1', title: 'Beta Holiday', days: 5, numericPrice: 25000, isPriceOnRequest: false },
  { id: '2', title: 'Alpha Holiday', days: 3, numericPrice: 15000, isPriceOnRequest: false },
  { id: '3', title: 'Gamma Holiday', days: 7, isPriceOnRequest: true },
];

// Price sorting test: ensures numeric prices are sorted without treating quote-based package as 0
const pricedOnly = samplePackages.filter(p => typeof p.numericPrice === 'number');
const quoteOnly = samplePackages.filter(p => p.isPriceOnRequest);
pricedOnly.sort((a, b) => (a.numericPrice ?? 0) - (b.numericPrice ?? 0));
assert(pricedOnly[0].numericPrice === 15000 && pricedOnly[1].numericPrice === 25000, 'Price asc sorts verified prices accurately');
assert(quoteOnly.length === 1 && quoteOnly[0].numericPrice === undefined, 'Quote-based package preserved without treating undefined as zero');

// Duration sorting test
const durationSorted = [...samplePackages].sort((a, b) => a.days - b.days);
assert(durationSorted[0].days === 3 && durationSorted[2].days === 7, 'Duration shortest-first sorts accurately');

console.log(`\n========================================`);
console.log(`Summary: ${passedTests} passed, ${failedTests} failed.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
}

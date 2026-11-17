import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { authoritativePackages, getPackageTables, getPackageCategory } from "../src/features/packages/data/packages";
import { getPackagePriceDetails } from "../src/features/packages/utils/package-pricing";
import { buildPackageDetailJsonLd, buildOrganizationAndAgencyGraph } from "../src/lib/seo/schemas";
import { PRIMARY_SITE_URL } from "../src/lib/seo/site-seo";

console.log("==================================================");
console.log("MTPL SEO & STRUCTURED DATA VERIFICATION SUITE");
console.log("==================================================\n");

let failures = 0;
function assert(condition: boolean | undefined | null, message: string) {
  if (Boolean(condition)) {
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
    failures++;
  }
}

// 1. SITEMAP VERIFICATION
console.log("1. XML Sitemap Audit:");
const sitemapEntries = sitemap();
const totalCount = sitemapEntries.length;
const staticRoutes = sitemapEntries.filter((e) => !e.url.includes("/packages/"));
const packageRoutes = sitemapEntries.filter((e) => e.url.includes("/packages/mtpl-"));
const secondaryDomainUrls = sitemapEntries.filter((e) => e.url.includes("mtpl.online"));
const nonPrimaryUrls = sitemapEntries.filter((e) => !e.url.startsWith(PRIMARY_SITE_URL));
const uniqueUrls = new Set(sitemapEntries.map((e) => e.url));

assert(totalCount === 103, `Total sitemap entries is 103 (actual: ${totalCount})`);
assert(staticRoutes.length === 10, `Static route count is 10 (actual: ${staticRoutes.length})`);
assert(packageRoutes.length === 93, `Package route count is 93 (actual: ${packageRoutes.length})`);
assert(secondaryDomainUrls.length === 0, `Secondary domain (mtpl.online) URLs is 0 (actual: ${secondaryDomainUrls.length})`);
assert(nonPrimaryUrls.length === 0, `100% of URLs begin with ${PRIMARY_SITE_URL}`);
assert(uniqueUrls.size === totalCount, `Zero duplicate URLs in sitemap (${uniqueUrls.size} unique of ${totalCount})`);

// 2. ROBOTS.TXT VERIFICATION
console.log("\n2. Robots.txt Audit:");
const robotsConfig = robots();
const mainRule = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;
const allowList = Array.isArray(mainRule?.allow) ? mainRule.allow : [mainRule?.allow];
const disallowList = Array.isArray(mainRule?.disallow) ? mainRule.disallow : [mainRule?.disallow];

assert(allowList.includes("/"), "Robots allows root '/' for general crawling");
assert(allowList.includes("/api/media/"), "Robots explicitly allows '/api/media/' for image crawlers");
assert(disallowList.includes("/api/"), "Robots disallows private '/api/'");
assert(disallowList.includes("/admin/"), "Robots disallows '/admin/'");
assert(disallowList.includes("/email-previews/"), "Robots disallows '/email-previews/'");
assert(!disallowList.some((d) => d && d.includes("_next")), "Robots does NOT block '/_next/' static assets");
assert(robotsConfig.sitemap === `${PRIMARY_SITE_URL}/sitemap.xml`, `Robots sitemap declaration is ${PRIMARY_SITE_URL}/sitemap.xml`);
assert(robotsConfig.host === PRIMARY_SITE_URL, `Robots host declaration is ${PRIMARY_SITE_URL}`);

interface SchemaNode {
  "@type"?: string;
  name?: string;
  legalName?: string;
  foundingDate?: string;
  founder?: Array<{ name?: string }>;
  memberOf?: Array<{ name?: string; identifier?: string }>;
  telephone?: string;
  email?: string;
  openingHoursSpecification?: unknown[];
  offers?: {
    "@type"?: string;
    price?: number;
    priceCurrency?: string;
    availability?: string;
  };
  aggregateRating?: unknown;
  review?: unknown;
  [key: string]: unknown;
}

interface SchemaGraph {
  "@context": string;
  "@graph": SchemaNode[];
}

// 3. GLOBAL STRUCTURED DATA VERIFICATION
console.log("\n3. Global Organization & TravelAgency Schema Audit:");
const globalGraph = buildOrganizationAndAgencyGraph() as unknown as SchemaGraph;
const orgNode = globalGraph["@graph"].find((n: SchemaNode) => n["@type"] === "Organization");
const agencyNode = globalGraph["@graph"].find((n: SchemaNode) => n["@type"] === "TravelAgency");

assert(orgNode !== undefined, "Global schema includes Organization node");
assert(orgNode?.legalName === "MISHRIKOTKAR TRAVELS PVT LTD", "Organization legalName is MISHRIKOTKAR TRAVELS PVT LTD");
assert(orgNode?.name === "Mishrikotkar Travels Pvt. Ltd.", "Organization name is Mishrikotkar Travels Pvt. Ltd.");
assert(orgNode?.foundingDate === "2006", "Founding date is 2006");
assert(
  Array.isArray(orgNode?.founder) &&
    orgNode.founder.some((f: { name?: string }) => f.name === "Tushar Mishrikotkar") &&
    orgNode.founder.some((f: { name?: string }) => f.name === "Puja Mishrikotkar"),
  "Founders include Tushar Mishrikotkar and Puja Mishrikotkar"
);
assert(
  orgNode?.memberOf?.some((m: { name?: string; identifier?: string }) => m.name?.includes("IATA") && m.identifier === "14344864"),
  "Organization lists IATA Accreditation with identifier 14344864"
);
assert(
  orgNode?.memberOf?.some((m: { name?: string }) => m.name?.includes("TAAI")),
  "Organization lists Travel Agents Association of India (TAAI) membership"
);
assert(agencyNode !== undefined, "Global schema includes TravelAgency node");
assert(agencyNode?.telephone === "+91 7741006600", "TravelAgency primary phone is +91 7741006600");
assert(agencyNode?.email === "support@mishrikotkartravels.com", "TravelAgency email is support@mishrikotkartravels.com");
assert((agencyNode?.openingHoursSpecification?.length ?? 0) > 0, "TravelAgency includes openingHoursSpecification");

// 4. PACKAGE STRUCTURED DATA & PRICING VERIFICATION
console.log("\n4. 93 Package Structured Data & Pricing Audit:");
let validOfferCount = 0;
let inrOfferCount = 0;
let usdOfferCount = 0;
let unknownCurrencyCount = 0;
let priceMismatchCount = 0;
let fakeRatingsCount = 0;
let fakeReviewsCount = 0;
let fakeAvailabilityCount = 0;
const knownDiscrepancies: string[] = [];

for (const pkg of authoritativePackages) {
  const tables = getPackageTables(pkg.slug);
  const category = getPackageCategory(pkg);
  const details = getPackagePriceDetails(pkg, tables);
  const schema = buildPackageDetailJsonLd(pkg, category, details) as unknown as SchemaGraph;

  if (details.currency === "unknown") {
    unknownCurrencyCount++;
  }

  const tripNode = schema["@graph"].find((n: SchemaNode) => n["@type"] === "TouristTrip");
  const productNode = schema["@graph"].find((n: SchemaNode) => n["@type"] === "Product");
  const breadcrumbNode = schema["@graph"].find((n: SchemaNode) => n["@type"] === "BreadcrumbList");

  if (!tripNode || !productNode || !breadcrumbNode) {
    failures++;
    console.error(`  [FAIL] Missing required schema nodes for package ${pkg.id}`);
  }

  // Check no fabricated data
  if (productNode?.aggregateRating || tripNode?.aggregateRating) fakeRatingsCount++;
  if (productNode?.review || tripNode?.review) fakeReviewsCount++;
  if (productNode?.offers?.availability) fakeAvailabilityCount++;

  // Check Offer node
  if (productNode?.offers) {
    validOfferCount++;
    const offer = productNode.offers;
    if (offer.priceCurrency === "INR") inrOfferCount++;
    if (offer.priceCurrency === "USD") usdOfferCount++;

    if (offer.price !== details.startingPrice) {
      priceMismatchCount++;
    }
  }

  // Detect table vs summary currency mismatch (6 known Bhutan/Nepal packages)
  if (tables?.costTables && tables.costTables.length > 0) {
    const tableCur = tables.costTables[0].currency;
    if (tableCur && tableCur !== details.currency) {
      knownDiscrepancies.push(`${pkg.id} (${pkg.title}): summary=${details.currency}, table=${tableCur}`);
    }
  }
}

assert(authoritativePackages.length === 93, `Total packages in catalogue is 93 (actual: ${authoritativePackages.length})`);
assert(unknownCurrencyCount === 0, `Unknown currency count is 0 (actual: ${unknownCurrencyCount})`);
assert(validOfferCount === 93, `Packages with valid Offer is 93 (actual: ${validOfferCount})`);
assert(inrOfferCount === 67, `National packages with INR Offer is 67 (actual: ${inrOfferCount})`);
assert(usdOfferCount === 26, `International packages with USD Offer is 26 (actual: ${usdOfferCount})`);
assert(priceMismatchCount === 0, `Schema offer price matches visible starting price for 100% of packages`);
assert(fakeRatingsCount === 0, `Fabricated aggregateRating nodes count is 0`);
assert(fakeReviewsCount === 0, `Fabricated review nodes count is 0`);
assert(fakeAvailabilityCount === 0, `Fabricated availability markers count is 0`);
assert(knownDiscrepancies.length === 6, `Exactly 6 known Bhutan/Nepal table-vs-summary discrepancies detected`);

console.log("\n==================================================");
if (failures === 0) {
  console.log("VERIFICATION RESULT: ALL CHECKS PASSED (0 FAILURES)");
  console.log("==================================================");
  process.exit(0);
} else {
  console.error(`VERIFICATION RESULT: ${failures} FAILED CHECKS`);
  console.log("==================================================");
  process.exit(1);
}

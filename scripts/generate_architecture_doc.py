"""
Script to generate the complete architecture documentation and exhaustive file tree
for Mishrikotkar Travels Pvt. Ltd. (MTPL) travel platform.
"""
import os
import sys
from datetime import datetime

ROOT_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
OUTPUT_FILE = os.path.join(ROOT_DIR, "COMPLETE_PROJECT_ARCHITECTURE.txt")
EXCLUDE_DIRS = {".git", ".next", "node_modules"}

def build_tree(dir_path, prefix=""):
    try:
        items = sorted(os.listdir(dir_path))
    except Exception as e:
        return [f"{prefix}[Error reading directory: {e}]"]
        
    items = [item for item in items if item not in EXCLUDE_DIRS]
    entries = []
    
    for i, item in enumerate(items):
        is_last = (i == len(items) - 1)
        full_path = os.path.join(dir_path, item)
        is_dir = os.path.isdir(full_path)
        
        branch = "└── " if is_last else "├── "
        sub_prefix = "    " if is_last else "│   "
        
        if is_dir:
            file_count = 0
            for r, d, files in os.walk(full_path):
                d[:] = [sub for sub in d if sub not in EXCLUDE_DIRS]
                file_count += len(files)
            entries.append(f"{prefix}{branch}{item}/ [{file_count} files]")
            entries.extend(build_tree(full_path, prefix + sub_prefix))
        else:
            size_bytes = os.path.getsize(full_path)
            if size_bytes < 1024:
                size_str = f"{size_bytes} B"
            elif size_bytes < 1024 * 1024:
                size_str = f"{size_bytes / 1024:.1f} KB"
            else:
                size_str = f"{size_bytes / (1024 * 1024):.2f} MB"
            entries.append(f"{prefix}{branch}{item} ({size_str})")
            
    return entries

def get_stats():
    total_files = 0
    total_dirs = 0
    total_size = 0
    ext_counts = {}
    
    for r, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        total_dirs += len(dirs)
        for f in files:
            total_files += 1
            ext = os.path.splitext(f)[1].lower() or "[no-ext]"
            ext_counts[ext] = ext_counts.get(ext, 0) + 1
            fp = os.path.join(r, f)
            try:
                total_size += os.path.getsize(fp)
            except Exception:
                pass
                
    return total_files, total_dirs, total_size, ext_counts

def main():
    print("Collecting repository statistics...")
    total_files, total_dirs, total_size, ext_counts = get_stats()
    
    print("Generating complete tree...")
    tree_lines = build_tree(ROOT_DIR)
    
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    size_mb = total_size / (1024 * 1024)
    
    sorted_exts = sorted(ext_counts.items(), key=lambda x: x[1], reverse=True)
    ext_table = "\n".join([f"    - {ext:<12} : {count:>4} files" for ext, count in sorted_exts[:15]])
    
    header = (
        "====================================================================================================\n"
        "               MISHRIKOTKAR TRAVELS PVT. LTD. (MTPL) — TRAVEL PLATFORM\n"
        "                     COMPLETE SYSTEM ARCHITECTURE & EXHAUSTIVE FILE TREE\n"
        "====================================================================================================\n\n"
        f"Generated: {now}\n"
        f"Repository Root: {ROOT_DIR}\n"
        "Status: Production Phase 1 Architecture\n"
        f"Total Tracked Project Files: {total_files}\n"
        f"Total Project Directories:   {total_dirs}\n"
        f"Total Project Data Size:     {size_mb:.2f} MB (Excluding .git, .next, and node_modules)\n\n"
        "File Distribution by Extension:\n"
        f"{ext_table}\n\n"
        "====================================================================================================\n"
        "                                      TABLE OF CONTENTS\n"
        "====================================================================================================\n"
        "1. EXECUTIVE OVERVIEW & BUSINESS PURPOSE\n"
        "2. TECHNOLOGY STACK & ARCHITECTURAL FOUNDATION\n"
        "3. SYSTEM ARCHITECTURE & DATA FLOW\n"
        "4. NEXT.JS APP ROUTER STRUCTURE & ROUTE MAP\n"
        "5. API ROUTES & BACKEND SPECIFICATION\n"
        "6. CORE DOMAIN MODULES & FEATURES\n"
        "7. PRISMA SCHEMA & DATA MODELS\n"
        "8. DESIGN SYSTEM, AESTHETICS & TAILWIND CSS V4\n"
        "9. COMPLIANCE, LEGAL & GOVERNANCE FRAMEWORK\n"
        f"10. EXHAUSTIVE DIRECTORY & FILE TREE (ALL {total_files} FILES)\n"
        "11. DETAILED FILE-BY-FILE DIRECTORY CATALOGUE & ROLES\n"
        "====================================================================================================\n\n"
    )
    
    body_part1 = """
====================================================================================================
1. EXECUTIVE OVERVIEW & BUSINESS PURPOSE
====================================================================================================
Mishrikotkar Travels Pvt. Ltd. (MTPL) is an established travel agency headquartered in Dharampeth, 
Nagpur, Maharashtra, India. With decades of travel expertise and IATA accreditation, MTPL provides:
  • Curated Domestic & International Holiday Packages (77 verified packages in active catalogue)
  • Corporate & Business Travel Management
  • Central India & National Park Jungle Safari Bookings (Tadoba, Pench, Kanha, Bandhavgarh)
  • Air Ticketing (Domestic & International with GDS/IATA capabilities)
  • Luxury Hotel Reservations & Transfers
  • Visa Facilitation, Passport Assistance & Travel Insurance
  • Foreign Exchange (Forex) Consultation

This web platform is designed as a modern, high-converting digital portal that replaces generic 
brochures with rich, responsive itineraries, transparent pricing disclosures, direct WhatsApp 
planning desking, PDF downloads, and strict adherence to Indian travel regulations.


====================================================================================================
2. TECHNOLOGY STACK & ARCHITECTURAL FOUNDATION
====================================================================================================
Core Framework:
  • Next.js 15+ (App Router): React Server Components (RSC), dynamic metadata, route handlers, 
    streaming server-side rendering, and static site generation for package routes.
  • React 19: Cutting-edge component architecture with concurrent rendering and modern hook patterns.
  • TypeScript 5+: Strict type safety across models, API contracts, validations, and UI components.

Styling & User Experience:
  • Tailwind CSS v4: Zero-runtime utility classes configured via CSS variables and modern directives.
  • Lucide React: Cohesive icon set across UI badges, status indicators, and navigation elements.
  • Google Fonts: Inter (body typography), Outfit / Display typography for premium editorial headlines.

Data Management & Validation:
  • Mongoose ODM: MongoDB document database connection for enquiries, media metadata, and persistence.
  • Zod: Runtime schema validation for inquiry forms, contact desks, and API inputs.
  • Static Verified Manifest: JSON-based authoritative package catalog (packages.ts and manifest) 
    synthesized directly from client-supplied PDF inventories.

Asset Management & Optimization:
  • Next.js Image Optimization (next/image): WebP delivery with responsive srcset generation.
  • Media Route Handler (/api/media/[slug]): Custom streaming endpoint serving cached package visuals.
  • PDF Download Handler (/api/packages/[slug]/download): Direct stream of authentic client PDFs.


====================================================================================================
3. SYSTEM ARCHITECTURE & DATA FLOW
====================================================================================================

+--------------------------------------------------------------------------------------------------+
|                                     CLIENT / BROWSER TIER                                        |
|  [Desktop / Tablet / Mobile Viewports]                                                           |
|       │                                                                                          |
|       ├─ Page Navigation ──────────> Next.js App Router (RSC + Client Islands)                   |
|       ├─ Lead Submission ──────────> Enquiry Modal / Contact Form (Zod client validation)        |
|       ├─ Direct Conversions ───────> WhatsApp Itinerary Desks (+91 9325006600, +91 8381006600)  |
|       └─ Document Requests ────────> Itinerary PDF Downloads (/api/packages/[slug]/download)    |
+───────┼──────────────────────────────────────────────────────────────────────────────────────────+
        │
        ▼
+--------------------------------------------------------------------------------------------------+
|                                 NEXT.JS APPLICATION SERVER TIER                                  |
|                                                                                                  |
|   1. PRESENTATION LAYER (src/app, src/components)                                                |
|      • Root Layout: Global metadata, fonts, header, footer, consent banners                      |
|      • Route Group (website): 14 public pages with consistent branding and navigation             |
|      • Dynamic Routes: /packages/[slug], /destinations/[slug], /services/[slug]                  |
|      • UI Primitives: Buttons, containers, modals, forms, cards, drop-downs                      |
|                                                                                                  |
|   2. DOMAIN & BUSINESS LOGIC LAYER (src/features)                                                |
|      • Packages Domain: 77 verified itineraries, durations, day-by-day stops, inclusions        |
|      • Destinations Domain: Categorized domestic & international regions                         |
|      • Enquiries Domain: Validation, state handling, sanitization, lead processing               |
|      • Testimonials Domain: Verified client experiences & ratings                                |
|                                                                                                  |
|   3. API & ROUTE HANDLERS LAYER (src/app/api)                                                    |
|      • POST /api/enquiries (and /api/enquiry): Server-side validation, anti-spam, DB storage     |
|      • GET /api/media/[slug]: Optimized package media streaming with cache headers               |
|      • GET /api/packages/[slug]/download: File streaming of verified PDF itineraries             |
|      • GET /api/health/db: MongoDB database connection health check                              |
|                                                                                                  |
|   4. DATA & INFRASTRUCTURE LAYER (src/lib, src/config)                                           |
|      • Mongoose Connection Layer: Cached connection pooling, hot-reload safety, sanitized errors |
|      • Security Utilities: Rate limiting, XSS prevention, sanitized text processing              |
|      • Office Images Config: Curated verified corporate headquarters photographs                 |
+───────┼──────────────────────────────────────────────────────────────────────────────────────────+
        │
        ▼
+--------------------------------------------------------------------------------------------------+
|                                  DATA & ASSET STORAGE TIER                                       |
|  • MongoDB Database: Customer inquiries, media asset metadata, contact submissions               |
|  • Local Storage (/storage/media): 155+ optimized WebP destination & package images             |
|  • PDF Archive (/assets/pdf): 77 verified authentic client itinerary brochures                  |
+--------------------------------------------------------------------------------------------------+


====================================================================================================
4. NEXT.JS APP ROUTER STRUCTURE & ROUTE MAP
====================================================================================================
The application utilizes Next.js App Router route grouping (website) to wrap public pages with 
unified navigation, corporate header, and footer without affecting the URL structure.

Public Page Routes:
  • /                              -> Homepage (Hero, Featured Tours, Regions, Services, Reviews)
  • /about                         -> Corporate Heritage established in 2006, Leadership, IATA credentials
  • /packages                      -> Full 77-package interactive catalogue with filters
  • /packages/[slug]               -> Dynamic package detail (Itinerary, inclusions, terms, PDF download)
  • /destinations                  -> Domestic & International destination collections
  • /destinations/[slug]           -> Regional destination packages
  • /services                      -> Full suite of MTPL travel & booking facilitation services
  • /services/[slug]               -> Detailed individual service profile
  • /offers                        -> Seasonal promotional packages & festive discounts
  • /testimonials                  -> Verified client reviews and travel memories
  • /reviews                       -> Customer rating summary & feedback portal
  • /contact                       -> Contact desk, quotation forms, office directions (Nagpur)

Legal & Compliance Routes:
  • /terms-and-conditions          -> Comprehensive Website Terms of Use & Corporate Governance
  • /holiday-package-terms         -> 15-clause Holiday Tour Package Terms, Declaration & Liability
  • /disclaimer                    -> 19-clause MTPL Intermediary & Travel Facilitator Disclaimer
  • /privacy-policy                -> DPDP Act 2023 Compliant Customer Data Protection Policy
  • /cookie-policy                 -> Verified Technical Cookie & Browser Storage Policy
  • /booking-policy                -> Booking, Cancellation, Amendment & Refund Terms

SEO & Technical Routes:
  • /robots.txt                    -> Automated search engine crawler directives
  • /sitemap.xml                   -> Dynamically generated XML sitemap linking all verified routes


====================================================================================================
5. API ROUTES & BACKEND SPECIFICATION
====================================================================================================
1. POST /api/enquiry
   Purpose: Captures holiday quotation requests, corporate queries, and custom trip consultations.
   Input: JSON payload containing fullName, email, phone, destination, travelDates, travellers, notes, declarations
   Validation: Zod schema verifying mobile number (10-15 digits), valid email, and required consent.
   Response: 200 OK with inquiry reference ID, or 400 Bad Request with field errors.

2. GET /api/media/[slug]
   Purpose: High-performance streaming of package hero banners and destination photography.
   Path: Matches package slug to /storage/media/public/{slug}.webp or fallback image.
   Headers: Cache-Control: public, max-age=31536000, immutable.

3. GET /api/packages/[slug]/download
   Purpose: Direct secure streaming of original client-supplied PDF tour itineraries.
   Headers: Content-Type: application/pdf, Content-Disposition: attachment; filename="{pkg}.pdf".


====================================================================================================
6. CORE DOMAIN MODULES & FEATURES
====================================================================================================
1. Packages Engine (src/features/packages)
   • Authoritative Dataset: 77 deduplicated, client-verified travel itineraries.
   • Features: Day-by-day itineraries, meal plans, hotel categories, inclusions, exclusions.
   • Pricing Model: Dual pricing structure:
       - Starting indicative tariffs (e.g., Starting from ₹31,288* / person).
       - Explicit disclaimer that actual cost depends on dates, party size, and flight tariffs.
   • Booking Terms Integration: Every package renders the verbatim 15-clause Terms & Conditions.

2. Inquiries & Consent Module (src/components/enquiries, src/features/enquiries)
   • Multi-channel lead generation: Online forms, package inquiry modals, dedicated contact page, WhatsApp desking.
   • Customer Declarations: All 5 customer declarations (Accuracy, Communication, Privacy, Booking disclaimer, Terms) explicitly validated server-side.
   • Server Stamping: Authoritative server-generated consent timestamp and policy version recorded with each new enquiry.
   • Terms Modal: Modal window rendering the 5 mandatory customer acknowledgements.

3. Office Media & Authenticity (src/config/office-images.ts)
   • Verified Photographs: Genuine photographs of MTPL headquarters at Shri Ganesh Apartments,
     Dharampeth, Nagpur.
   • Editorial Usage: Itinerary planning desk, visa consultancy desk, customer lounge.


====================================================================================================
7. MONGOOSE SCHEMAS & DATA MODELS
====================================================================================================
Database models defined using Mongoose schemas in src/models/ (and corresponding TypeScript interfaces in src/types):
  • Enquiry (src/models/enquiry.ts): fullName, companyName, email, phone, travelType, destination,
    travelDate, returnDate, travellers, budget, message, source, packageSlug, destinationSlug,
    offerSlug, serviceId, consentAccepted (explicit boolean, no default), consentDetails (accuracyConfirmed,
    communicationConsent, privacyAcknowledged, bookingDisclaimerAcknowledged, termsAcknowledged,
    acceptedAt, policyVersion), status (NEW, CONTACTED, IN_PROGRESS, CONVERTED, CLOSED, SPAM).
  • MediaAsset (src/models/media-asset.ts): storageKey, originalFilename, mimeType, sizeBytes,
    category, visibility, altText, createdAt, updatedAt.
  • Package & Destination Models: Phase 1 authoritative datasets in TypeScript; Phase 2 dynamic MongoDB collections.


====================================================================================================
8. DESIGN SYSTEM, AESTHETICS & TAILWIND CSS V4
====================================================================================================
Palette & Styling Philosophy:
  • Primary Brand Green: #073B2D (Deep Forest), #0F5A40 (Rich Emerald), #16A765 (Vibrant Mint)
  • Accents: Gold/Amber (#D97706) for signature tour badges, Slate (#0F172A) for high-contrast text
  • Glassmorphism: Backdrop-blur overlays on hero navigation and image captions
  • Responsive Grid: Adaptive layout supporting 320px mobile viewports through 1920px 4K displays
  • Typography: Premium variable sans-serif hierarchy with balanced line heights and letter spacing


====================================================================================================
9. COMPLIANCE, LEGAL & GOVERNANCE FRAMEWORK
====================================================================================================
All legal documentation has been synthesized directly from MTPL's official executed documents:
  • Terms & Conditions: 15 comprehensive clauses covering booking, payment, suppliers, liability cap.
  • Holiday Tour Package Terms: Full agreement, 15 clauses, Traveller Schedule, and Family Head Declaration.
  • Disclaimer: 19 numbered sections clarifying MTPL's intermediary role under the Consumer Protection Act.
  • Privacy Policy: Full DPDP Act 2023 disclosures for enquiry data, zero advertising cookies.
  • Cookie Policy: Audited statement confirming zero third-party tracking cookies or advertising pixels.


====================================================================================================
10. EXHAUSTIVE DIRECTORY & FILE TREE
====================================================================================================
The complete, unabridged file tree of the repository is presented below:

mtpl-travel-platform/
"""

    tree_text = "\n".join(tree_lines)
    
    catalog = """

====================================================================================================
11. DETAILED FILE-BY-FILE DIRECTORY CATALOGUE & ROLES
====================================================================================================

ROOT CONFIGURATION FILES:
  • package.json                  : Defines project dependencies, scripts (dev, build, start, lint),
                                    and Next.js 15 / React 19 / Tailwind CSS v4 environment.
  • package-lock.json             : Exact lockfile for all npm dependency trees and sub-dependencies.
  • next.config.ts                : Next.js configuration enabling remote image domains, caching,
                                    and security headers.
  • tsconfig.json                 : TypeScript compiler options, path aliases (@/* -> src/*).
  • eslint.config.mjs             : ESLint v9 configuration with Next.js and TypeScript rules.
  • postcss.config.mjs            : PostCSS setup for Tailwind CSS v4 processing.
  • docker-compose.yml            : Container orchestration for local development PostgreSQL database.
  • .env.example                  : Environment variable template (database connection, site URL).
  • .gitignore                    : Git ignore rules (excluding .next, node_modules, .env, build caches).
  • AGENTS.md                     : Workspace AI development instructions and Next.js guidelines.
  • README.md                     : Primary repository introduction and quick-start instructions.

SRC / APP DIRECTORY (Next.js App Router):
  • src/app/layout.tsx            : Global root layout, HTML structure, Inter font loading, global meta.
  • src/app/globals.css           : Global CSS rules, Tailwind v4 directives, custom utility styles.
  • src/app/sitemap.ts            : Dynamic XML sitemap generation for all 77+ packages and static pages.
  • src/app/robots.ts             : Automated robots.txt generator specifying crawl rules and sitemap URL.
  • src/app/icon.png              : High-resolution application favicon.

SRC / APP / (WEBSITE) ROUTE GROUP:
  • src/app/(website)/layout.tsx  : Shared website shell rendering Navbar, Footer, and WhatsApp float.
  • src/app/(website)/template.tsx: Page transition wrapper.
  • src/app/(website)/page.tsx    : Homepage assembling Hero, Featured Packages, Services, Testimonials.
  • src/app/(website)/about/page.tsx: About Us page with corporate history, leadership, office gallery.
  • src/app/(website)/packages/page.tsx: Interactive packages catalogue with search and filter tabs.
  • src/app/(website)/packages/[slug]/page.tsx: Comprehensive package detail page with day-by-day itinerary,
                                    inclusions, exclusions, price advisory, PDF download, and verbatim terms.
  • src/app/(website)/destinations/page.tsx: Overview of domestic & international travel regions.
  • src/app/(website)/destinations/[slug]/page.tsx: Individual destination showcase with connected tours.
  • src/app/(website)/services/page.tsx: Travel services overview (Air tickets, luxury hotels, safaris, visas).
  • src/app/(website)/offers/page.tsx: Special seasonal offers and limited-time package deals.
  • src/app/(website)/testimonials/page.tsx: Client testimonials, ratings, and travel stories.
  • src/app/(website)/reviews/page.tsx: Verified customer feedback and rating portal.
  • src/app/(website)/contact/page.tsx: Comprehensive contact page with quotation inquiry form and map.
  • src/app/(website)/terms-and-conditions/page.tsx: Complete website Terms & Conditions.
  • src/app/(website)/holiday-package-terms/page.tsx: Verbatim Holiday Tour Package Terms & Declaration.
  • src/app/(website)/disclaimer/page.tsx: 19-clause MTPL Intermediary & Travel Facilitator Disclaimer.
  • src/app/(website)/privacy-policy/page.tsx: DPDP Act 2023 compliant Privacy Policy.
  • src/app/(website)/cookie-policy/page.tsx: Technical Cookie Policy based on actual codebase audit.
  • src/app/(website)/booking-policy/page.tsx: General booking, payment, and cancellation policies.

SRC / APP / API (Backend Route Handlers):
  • src/app/api/enquiry/route.ts  : Receives inquiry submissions, validates via Zod, logs to DB.
  • src/app/api/media/[slug]/route.ts: Custom optimized media streaming for package hero images.
  • src/app/api/packages/[slug]/download/route.ts: Secure streaming of verified client itinerary PDFs.

SRC / COMPONENTS (Modular UI Components):
  • src/components/about/         : About page components (heritage narrative, leadership team).
  • src/components/destinations/  : Destination card grids, region filters, explore banners.
  • src/components/enquiries/     : Multi-step inquiry modal, validation error displays, consent modals.
  • src/components/home/          : Hero section, quick search, featured packages, trust stats.
  • src/components/layout/        : Global Navbar, Footer, Mobile Navigation Drawer.
  • src/components/motion/        : Framer-motion animation primitives and transitions.
  • src/components/offers/        : Promotional banners, seasonal deal cards.
  • src/components/packages/      : Package card, filter dropdowns, planning assurance banner,
                                    and HolidayPackageTermsSection (verbatim 15 clauses).
  • src/components/services/      : Service feature cards, safari consultation, visa desk.
  • src/components/shared/        : Breadcrumbs, section headers, badges, call-to-action blocks.
  • src/components/testimonials/  : Testimonial carousel, Google review stars, client cards.
  • src/components/ui/            : Reusable atomic components (Button, Modal, Input, Container, Card).

SRC / FEATURES (Domain Logic & Authoritative Data):
  • src/features/packages/data/packages.ts: Master dataset of 77 client-verified packages with
                                    day-by-day itineraries, prices, validity, inclusions, and photos.
  • src/features/destinations/    : Destination registry, helper functions, and regional grouping.
  • src/features/enquiries/       : Enquiry submission handling, schema validation, status logic.
  • src/features/offers/          : Active seasonal offers and promotional discounts.
  • src/features/testimonials/    : Verified client testimonials and rating data.

SRC / LIB (Utilities & Infrastructure):
  • src/lib/db/                   : Mongoose client singleton connection manager with Next.js hot-reload caching.
  • src/lib/security/             : Input sanitization, rate limiting, and security helpers.
  • src/lib/storage/              : File storage adapters and asset lookup utilities.
  • src/lib/utils/                : General helper utilities (currency formatting, date formatters, cn).
  • src/lib/validations/          : Zod validation schemas for forms, inquiries, and API inputs.

SRC / CONFIG:
  • src/config/site.ts            : Site metadata, official address, telephone numbers, social links.
  • src/config/database.ts        : Database connection settings and environment variables.
  • src/config/office-images.ts   : Authoritative photo gallery metadata for MTPL Nagpur headquarters.

SRC / TYPES:
  • src/types/package.ts          : TypeScript definitions for Package, ItineraryDay, Inclusions.
  • src/types/destination.ts      : Destination model definitions.
  • src/types/enquiry.ts          : Enquiry form payload and database record types.
  • src/types/testimonial.ts      : Testimonial and review types.
  • src/types/offer.ts            : Promotional offer types.
  • src/types/team.ts             : Executive team and staff profile types.

DOCS DIRECTORY (Authoritative Specifications & Audits):
  • Contains 29 comprehensive Markdown audit and specification documents covering:
    Accessibility, AI Development Guidelines, Changelogs, Client Content Requirements,
    Component Specifications, Cookie Policy Data Audit, Database Architecture, Deployment,
    Design System, Enquiry System, Image Asset Inventory, Media Storage, Package PDF Audits,
    Privacy Policy Audits, and Terms & Conditions Reviews.

ASSETS DIRECTORY:
  • assets/Holidays T&C.docx      : Original client-provided Word document for Holiday Tour Terms.
  • assets/MTPL Logo.png          : Primary high-resolution corporate logo.
  • assets/MTPL Favicon.png       : Official corporate favicon.
  • assets/pdf/                   : Authentic client-supplied PDF brochures across 18 regional folders
                                    (Andaman, Assam, Bhutan, Himachal, Karnataka, Kashmir, Kerala,
                                    Maharashtra, MP, Nepal, North East, Rajasthan, Sri Lanka, etc.).
  • assets/Photos/                : Genuine office and team photographs from MTPL Dharampeth.

STORAGE & PUBLIC ASSETS:
  • storage/media/public/         : 155+ optimized WebP hero photographs for all package itineraries.
  • public/assets/                : Publicly served SVGs, icons, office thumbnails, and fallback images.

SCRIPTS DIRECTORY:
  • Python & TypeScript scripts for package catalogue synthesis, price extraction, validity auditing,
    image processing, contact sheet generation, and data validation.

====================================================================================================
                                      END OF ARCHITECTURE FILE
====================================================================================================
"""

    full_content = header + body_part1 + tree_text + catalog
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(full_content)
        
    # Also write a copy to PROJECT_ARCHITECTURE.txt for convenience
    alt_file = os.path.join(ROOT_DIR, "PROJECT_ARCHITECTURE.txt")
    with open(alt_file, "w", encoding="utf-8") as f:
        f.write(full_content)
        
    print(f"Successfully generated complete architecture document with {total_files} files!")
    print(f"Files written to:\n - {OUTPUT_FILE}\n - {alt_file}")

if __name__ == "__main__":
    main()

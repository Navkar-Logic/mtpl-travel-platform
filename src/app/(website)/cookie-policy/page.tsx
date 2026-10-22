import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import {
  Cookie,
  FileText,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Settings,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | Mishrikotkar Travels",
  description:
    "Official Cookie Policy explaining technical storage, browser cookie practices, and user controls across the website of Mishrikotkar Travels Pvt. Ltd. (MTPL).",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.url}/cookie-policy`,
  },
}

const tableOfContents = [
  { id: "section-1", label: "1. What Are Cookies & Storage?" },
  { id: "section-2", label: "2. Scope of This Policy" },
  { id: "section-3", label: "3. What the MTPL Website Actually Uses" },
  { id: "section-4", label: "4. Types & Purposes of Technologies" },
  { id: "section-5", label: "5. First-Party vs. Third-Party Links" },
  { id: "section-6", label: "6. Cookie Duration & Lifespan" },
  { id: "section-7", label: "7. Cookie Management in Your Browser" },
  { id: "section-8", label: "8. Effect of Disabling Cookies" },
  { id: "section-9", label: "9. Consent & User Choices" },
  { id: "section-10", label: "10. Privacy Policy Relationship" },
  { id: "section-11", label: "11. Updates to This Cookie Policy" },
  { id: "section-12", label: "12. Contact Information" },
  { id: "section-13", label: "13. Related Policies & Master Links" },
]

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Restrained Editorial Hero Header */}
      <section 
        className="bg-[#073B2D] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden text-center"
        aria-label="Cookie Policy Header"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-about.jpg"
            alt="Cookie Policy Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#073B2D]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[#073B2D]/25 pointer-events-none" />
        </div>

        <Container className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEF8F3] border border-white/15 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            <Cookie className="w-3.5 h-3.5 text-[#91D7B0]" />
            Browser Transparency &amp; Storage
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
            Cookie Policy
          </h1>
          <p className="text-sm md:text-base text-[#EEF8F3]/85 font-light mt-3 max-w-2xl mx-auto leading-relaxed">
            A clear and factual explanation of how Mishrikotkar Travels Pvt. Ltd. handles cookies, browser storage, and technical markers across our website.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-[#91D7B0] font-medium">
            <span>Last Updated: October 2026</span>
            <span>&bull;</span>
            <span>Mishrikotkar Travels Pvt. Ltd.</span>
          </div>
        </Container>
      </section>

      {/* Main Content Layout */}
      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Quick Navigation Table of Contents (Sticky on Desktop) */}
          <aside className="lg:col-span-4" aria-label="Table of Contents">
            <div className="lg:sticky lg:top-28 bg-[#F7F9F8] p-6 rounded-3xl border border-[#DCE7E1] space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#063D2A] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#16A765]" />
                  Section Navigation
                </h2>
                <span className="text-[11px] text-slate-500 font-medium">13 Sections</span>
              </div>

              <nav className="max-h-[62vh] overflow-y-auto space-y-1.5 pr-1.5 scrollbar-thin text-xs">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 rounded-xl text-slate-600 hover:text-[#063D2A] hover:bg-[#E8F5ED] transition-colors leading-snug font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#DCE7E1] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Authoritative Policies
                </span>
                <Link
                  href="/privacy-policy"
                  className="flex items-center justify-between text-xs font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors py-1"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="flex items-center justify-between text-xs font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors py-1"
                >
                  <span>Terms &amp; Conditions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/booking-policy"
                  className="flex items-center justify-between text-xs font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors py-1"
                >
                  <span>General Booking Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/holiday-package-terms"
                  className="flex items-center justify-between text-xs font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors py-1"
                >
                  <span>Holiday Package Terms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/disclaimer"
                  className="flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1"
                >
                  <span>Website Disclaimer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Direct Support Clarification Box */}
              <div className="pt-4 border-t border-[#DCE7E1] bg-white p-4 rounded-2xl border border-slate-200/80 text-xs space-y-1.5">
                <span className="font-bold text-slate-900 block">Questions Regarding Cookies?</span>
                <p className="text-slate-500">
                  Our customer support team is available to assist with any technical inquiries:
                </p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-bold text-[#16A765] hover:underline block break-all pt-1"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Complete Authoritative Cookie Policy Content */}
          <main className="lg:col-span-8 space-y-12 text-slate-800 leading-relaxed font-normal text-sm md:text-base">
            
            {/* SECTION 1 */}
            <section id="section-1" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  1. What Are Cookies &amp; Similar Storage Technologies?
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Cookies are small text files that websites store on your computer, smartphone, or tablet when you visit a webpage. Cookies are widely utilized across the internet to allow web servers to recognize your browser, remember user preferences between pages, enable security mechanisms, and facilitate smooth digital navigation.
                </p>
                <p>
                  In addition to traditional HTTP cookies, web browsers support related client-side storage technologies:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Local Storage (localStorage):</strong> Storage accessible by client scripts that persists even after your browser window is closed, until explicitly cleared.</li>
                  <li><strong>Session Storage (sessionStorage):</strong> Temporary storage that is automatically deleted when the active browser tab or window is closed.</li>
                  <li><strong>Browser Cache:</strong> Local storage of static assets (such as images, fonts, and PDF itinerary brochures) to speed up subsequent page visits.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 2 */}
            <section id="section-2" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  2. Scope of This Policy
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  This Cookie Policy applies specifically to the official business website of <strong>Mishrikotkar Travels Pvt. Ltd. (MTPL)</strong> accessible at <code className="text-xs bg-slate-100 px-2 py-1 rounded text-[#063D2A] font-semibold">{siteConfig.seo.canonicalUrl}</code>.
                </p>
                <p>
                  It describes the technical browser storage practices employed on our website and clarifies how our infrastructure interacts with your device. This policy does not apply to external websites or third-party platforms linked from our pages (such as WhatsApp, Google Maps, Facebook, or Instagram), each of which maintains its own independent cookie and tracking policies.
                </p>
              </div>
            </section>

            {/* SECTION 3 */}
            <section id="section-3" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  3. What the MTPL Website Actually Uses (Verified Findings)
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Our technical audit of the current MTPL website codebase confirms that our application is engineered with a privacy-first, minimal-storage architecture. Our review of the current implementation identified the following factual findings:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A765]" />
                      Zero Advertising Trackers
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We do not install advertising pixels, retargeting tags, or commercial cookies (such as Meta Pixel or Google Ads trackers).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A765]" />
                      Zero Analytics Telemetry
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Phase 1 public website does not run Google Analytics, Microsoft Clarity, Hotjar, or third-party session recorders.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A765]" />
                      Zero Persistent Storage
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our website does not store tracking tokens, unique user IDs, or enquiry history in your browser&apos;s <code className="text-[11px] bg-slate-200/70 px-1 rounded">localStorage</code> or <code className="text-[11px] bg-slate-200/70 px-1 rounded">sessionStorage</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A765]" />
                      Self-Hosted Typography
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Google Fonts are bundled and served locally from our Next.js application build. No visitor requests are dispatched to external font servers.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-slate-600" />
                    Technical Codebase vs. Production Edge Infrastructure
                  </p>
                  <p>
                    While our application source code does not set any cookies, visitors should be aware that production web hosting networks (such as cloud content delivery networks or DDoS mitigation reverse proxies) may automatically transmit strictly necessary technical headers or operational security tokens (such as temporary bot-verification cookies) to safeguard server stability.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4 */}
            <section id="section-4" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  4. Types and Purposes of Technologies
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  To provide complete transparency regarding the operational categories of browser technologies recognized across the industry, the following classifications apply to our website:
                </p>

                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#EEF8F3] text-[#063D2A] uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status on MTPL Website</th>
                        <th className="py-3 px-4">Purpose &amp; Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-600">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Strictly Necessary &amp; Security</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Operational Only
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          Fundamental for routing web requests, preventing automated denial-of-service spam, and ensuring network delivery. These cannot be disabled through on-site controls.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Performance &amp; Cache</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            HTTP Cache Headers
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          Standard HTTP response headers (<code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded">Cache-Control</code>) instructing your browser to temporarily store images and PDF brochures locally to expedite load times.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Functionality &amp; Preferences</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            In-Memory Only
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          Form values (such as destination or travel type selections) are retained in transient React component memory only while you interact with the page.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Analytics &amp; Performance</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            Not Used
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          We do not track visitor browsing patterns, traffic funnels, or visitor demographics via third-party analytics scripts.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Targeting &amp; Advertising</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            Not Used
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          We do not deploy marketing pixels or share behavioral profiling markers with third-party advertising exchanges.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 5 */}
            <section id="section-5" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  5. First-Party Technologies vs. Third-Party Outbound Links
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  It is important to understand the technical boundary between our website and external third-party services:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-[#EEF8F3] border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#063D2A] block">
                      First-Party Delivery
                    </span>
                    <p>
                      All core website assets (HTML structure, React components, CSS stylesheets, optimized travel imagery, and downloadable package itineraries) are served directly from MTPL&apos;s primary domain. MTPL does not load external scripts from unverified third-party content networks.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-brand" />
                      Third-Party Outbound Links (No Embedded Tracking)
                    </span>
                    <p>
                      Our website contains direct hyperlinks to external platforms:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-600">
                      <li><strong>WhatsApp Consultation:</strong> Links opening <code className="text-xs bg-slate-200/60 px-1 rounded">https://wa.me/917741006600</code>.</li>
                      <li><strong>Google Maps Navigation:</strong> Links opening our office location in Google Maps.</li>
                      <li><strong>Social Media Links:</strong> Outbound links navigating to MTPL&apos;s official Instagram and Facebook profiles.</li>
                    </ul>
                    <p className="mt-2 text-slate-600">
                      These integrations are implemented as standard HTML hyperlinks (<code className="text-xs bg-slate-200/60 px-1 rounded">&lt;a target=&quot;_blank&quot;&gt;</code>). We do <strong>not</strong> embed third-party tracking iframes, embedded social feeds, or external chat widgets onto MTPL&apos;s pages. Consequently, these third parties do not place cookies on your device merely because you browse MTPL&apos;s website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6 */}
            <section id="section-6" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  6. Cookie Duration &amp; Lifespan
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Where technical cookies are deployed by hosting environments or web infrastructure, they operate within two distinct duration categories:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Session Cookies:</strong> Temporary identifiers that exist only while you actively browse the website. They are automatically erased from your device&apos;s memory the moment you close your web browser.</li>
                  <li><strong>Persistent Cookies:</strong> Cookies configured with a defined expiration date. They remain on your device across multiple browser sessions until they reach their expiration timestamp or you delete them manually through browser settings.</li>
                </ul>
                <p className="text-xs text-slate-600">
                  Because MTPL does not set tracking cookies in its application code, our website does not place long-term persistent tracking files on your device. Any edge security markers set by cloud reverse proxies are configured with strictly limited, operational lifespans.
                </p>
              </div>
            </section>

            {/* SECTION 7 */}
            <section id="section-7" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  7. Managing Cookies in Your Browser
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  You retain full autonomy over cookies through your web browser. Virtually all modern desktop and mobile browsers permit you to inspect stored cookies, delete existing cookies, or configure automatic blocking:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Google Chrome</span>
                    <p className="text-slate-600">Settings &rarr; Privacy and security &rarr; Third-party cookies &rarr; Manage cookie permissions.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Apple Safari (iOS / macOS)</span>
                    <p className="text-slate-600">Preferences / Settings &rarr; Privacy &rarr; Manage Website Data / Block All Cookies.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Mozilla Firefox</span>
                    <p className="text-slate-600">Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection &amp; Cookies.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Microsoft Edge</span>
                    <p className="text-slate-600">Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies and site data.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#063D2A] block flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-[#16A765]" />
                    Honest Statement Regarding On-Site Preference Centers
                  </span>
                  <p>
                    Because the MTPL website does not deploy non-essential tracking, analytics, or advertising cookies, we do not impose an artificial on-site cookie preference pop-up. All cookie controls are exercised directly through your chosen browser software.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8 */}
            <section id="section-8" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  8. Effect of Disabling Cookies
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Because our website does not rely on tracking or session-persistence cookies to display travel content, the practical impact of disabling cookies is minimal:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Browsing Itineraries:</strong> You can browse all domestic and international holiday packages, read testimonials, view team credentials, and explore travel services with cookies completely disabled.</li>
                  <li><strong>Submitting Enquiries:</strong> You can submit the online travel planning form normally, as our form transmits structured JSON data directly to our secure server endpoint without relying on cookie tokens.</li>
                  <li><strong>Brochure Downloads:</strong> Static PDF itinerary downloads operate via standard HTTP document streaming and do not require cookies.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 9 */}
            <section id="section-9" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  9. Consent &amp; User Choices
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Under relevant data protection guidelines—including the principles of India&apos;s <em>Digital Personal Data Protection Act, 2023 (DPDPA)</em>—consent is required for non-essential tracking and profiling technologies.
                </p>
                <p>
                  Because MTPL does not load third-party marketing tags, analytics trackers, or commercial profiling cookies, we do not display an intrusive consent banner on your screen. By continuing to navigate our website, you acknowledge the standard, technical operation of our web pages.
                </p>
                <p className="text-xs text-slate-600">
                  <em>Future Evolution:</em> If MTPL decides in future development phases to introduce performance analytics or commercial advertising pixels, a compliant consent management mechanism will be integrated and presented to visitors prior to the activation of those technologies.
                </p>
              </div>
            </section>

            {/* SECTION 10 */}
            <section id="section-10" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  10. Relationship to Privacy Policy
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  This Cookie Policy focuses strictly on browser storage, HTTP caching, and client-side technical markers.
                </p>
                <p>
                  For complete information on how personal information submitted through our inquiry form (such as your name, phone number, email address, and travel plans) is collected, stored in our secure database, processed, shared with travel suppliers, and protected under Indian law, please consult our authoritative{" "}
                  <Link href="/privacy-policy" className="text-[#16A765] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* SECTION 11 */}
            <section id="section-11" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  11. Updates to This Cookie Policy
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL may revise this Cookie Policy periodically to reflect changes in our web technology, hosting infrastructure, or applicable regulatory standards in India.
                </p>
                <p>
                  Whenever changes are published, the &quot;Last Updated&quot; date at the top of this document will be amended. Revisions become effective immediately upon posting. We encourage travelers to review this page periodically to remain informed about our technical transparency standards.
                </p>
              </div>
            </section>

            {/* SECTION 12 */}
            <section id="section-12" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  12. Contact Information
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  If you have questions, observations, or feedback regarding our Cookie Policy or browser storage practices, please contact Mishrikotkar Travels Pvt. Ltd.:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-2">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#16A765]" />
                      Head Office Address
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Mishrikotkar Travels Pvt. Ltd.<br />
                      101, Shri Ganesh Apartments, Dharampeth,<br />
                      Nagpur – 440010, Maharashtra, India
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-2">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#16A765]" />
                      Direct Telephone Lines
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Primary: <a href={`tel:${siteConfig.contact.phones.primary.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-[#16A765]">{siteConfig.contact.phones.primary}</a><br />
                      Alternate: <a href={`tel:${siteConfig.contact.phones.alternate.replace(/\s+/g, '')}`} className="font-medium text-slate-900 hover:text-[#16A765]">{siteConfig.contact.phones.alternate}</a><br />
                      Hours: {siteConfig.contact.businessHours} (Mon – Sat)
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F7F9F8] border border-[#DCE7E1] space-y-2 sm:col-span-2">
                    <span className="font-bold text-[#063D2A] text-xs uppercase tracking-wider block flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#16A765]" />
                      Official Inquiries Email
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-[#16A765] hover:underline text-sm">{siteConfig.contact.email}</a><br />
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        Corporate Identity: GSTIN {siteConfig.credentials.gst} &bull; IATA Accredited: {siteConfig.credentials.iataNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13 */}
            <section id="section-13" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  13. Related Policies &amp; Master Links
                </h2>
              </div>
              <p className="text-slate-600 text-sm">
                Explore our complete suite of client governance and transparency documents:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Link
                  href="/privacy-policy"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Privacy Policy</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    How personal inquiry data, passenger communications, and database records are managed.
                  </p>
                </Link>

                <Link
                  href="/terms-and-conditions"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Terms &amp; Conditions</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Comprehensive terms governing website usage, enquiries, pricing, and MTPL intermediary facilitation.
                  </p>
                </Link>

                <Link
                  href="/booking-policy"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>General Booking Policy</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Authoritative terms governing air tickets, hotels, jungle safaris, and refund workflows.
                  </p>
                </Link>

                <Link
                  href="/holiday-package-terms"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Holiday Tour Package Terms</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Package itinerary conditions, client declarations, and limitation of liability.
                  </p>
                </Link>

                <Link
                  href="/disclaimer"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5 sm:col-span-2"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Website Disclaimer</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Important statutory notices regarding dynamic tariffs, flight schedules, and third-party supplier limits.
                  </p>
                </Link>
              </div>
            </section>

          </main>
        </div>
      </Container>
    </div>
  )
}

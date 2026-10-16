import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import {
  ShieldCheck,
  Lock,
  FileText,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Mishrikotkar Travels",
  description:
    "Official Privacy Policy describing how personal information is collected, used, stored, and protected across the website and enquiry channels of Mishrikotkar Travels Pvt. Ltd. (MTPL).",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
}

const tableOfContents = [
  { id: "section-a", label: "A. Introduction & Purpose" },
  { id: "section-b", label: "B. Scope of This Policy" },
  { id: "section-c", label: "C. Information We Collect" },
  { id: "section-d", label: "D. How We Collect Information" },
  { id: "section-e", label: "E. How We Use Information" },
  { id: "section-f", label: "F. Legal Basis & User Choice" },
  { id: "section-g", label: "G. Sharing & Disclosure" },
  { id: "section-h", label: "H. WhatsApp & External Services" },
  { id: "section-i", label: "I. Cookies & Similar Technologies" },
  { id: "section-j", label: "J. Data Storage & Retention" },
  { id: "section-k", label: "K. Data Security Measures" },
  { id: "section-l", label: "L. User Rights & Privacy Requests" },
  { id: "section-m", label: "M. Children's Information" },
  { id: "section-n", label: "N. International Data Transfers" },
  { id: "section-o", label: "O. Changes to This Policy" },
  { id: "section-p", label: "P. Contact & Grievance Information" },
  { id: "section-q", label: "Q. Related Policies & Master Links" },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Restrained Editorial Hero Header */}
      <section 
        className="bg-[#073B2D] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden text-center"
        aria-label="Privacy Policy Header"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-about.jpg"
            alt="Privacy Policy Background"
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
            <Lock className="w-3.5 h-3.5 text-[#91D7B0]" />
            Data Protection &amp; Transparency
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-[#EEF8F3]/85 font-light mt-3 max-w-2xl mx-auto leading-relaxed">
            How Mishrikotkar Travels Pvt. Ltd. collects, uses, stores, safeguards, and respects your personal data across our website and enquiry channels.
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
                <span className="text-[11px] text-slate-500 font-medium">17 Sections</span>
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
                  href="/terms-and-conditions"
                  className="flex items-center justify-between text-xs font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors py-1"
                >
                  <span>Terms &amp; Conditions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/cookie-policy"
                  className="flex items-center justify-between text-xs font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors py-1"
                >
                  <span>Cookie Policy</span>
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

              {/* Direct Privacy Inquiry Box */}
              <div className="pt-4 border-t border-[#DCE7E1] bg-white p-4 rounded-2xl border border-slate-200/80 text-xs space-y-1.5">
                <span className="font-bold text-slate-900 block">Data Protection Support:</span>
                <p className="text-slate-500">
                  Questions regarding personal data handling or privacy requests can be directed to:
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

          {/* Right Column: Complete Authoritative Privacy Policy Content */}
          <main className="lg:col-span-8 space-y-12 text-slate-800 leading-relaxed font-normal text-sm md:text-base">
            
            {/* SECTION A */}
            <section id="section-a" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  A. Introduction &amp; Purpose
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  This Privacy Policy describes how <strong>Mishrikotkar Travels Pvt. Ltd.</strong> (referred to as <strong>&quot;MTPL&quot;</strong>, <strong>&quot;the Company&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>) collects, uses, stores, shares, and protects personal information when you access or interact with our official business website at <code className="text-xs bg-slate-100 px-2 py-1 rounded text-[#063D2A] font-semibold">{siteConfig.seo.canonicalUrl}</code>, submit travel planning inquiries, contact our customer service personnel, or request travel facilitation.
                </p>
                <p>
                  MTPL is a private limited travel management company incorporated in India with its registered head office at <strong>101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010, Maharashtra, India</strong>. MTPL holds IATA accreditation (No. 14344864) and is registered under the Goods and Services Tax Act (GSTIN: 27AAJCM1228J1ZE).
                </p>
                <p>
                  We are committed to processing personal data in an ethical, transparent, and lawful manner appropriate to our operations in India, in alignment with the principles established under the <em>Digital Personal Data Protection Act, 2023 (DPDPA)</em>, the <em>Information Technology Act, 2000</em>, and associated data privacy rules.
                </p>
              </div>
            </section>

            {/* SECTION B */}
            <section id="section-b" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  B. Scope of This Policy
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  This Privacy Policy applies specifically to personal data collected through:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>The online inquiry and trip planning form situated at <Link href="/contact#enquiry-form" className="text-[#16A765] font-semibold hover:underline">/contact#enquiry-form</Link>, including package-specific and service-specific referrals.</li>
                  <li>Visitor-initiated voice telephone calls placed to MTPL official numbers ({siteConfig.contact.phones.primary}, {siteConfig.contact.phones.alternate}).</li>
                  <li>Inquiries and messages transmitted directly by email to <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{siteConfig.contact.email}</code>.</li>
                  <li>Visitor-initiated WhatsApp chats originating from the MTPL website link buttons.</li>
                  <li>Technical server request data generated during routine browsing of this Website.</li>
                </ul>
                <div className="p-4 rounded-2xl bg-[#EEF8F3] border border-[#DCE7E1] text-xs text-[#063D2A] space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#16A765]" />
                    Distinction From Independent Third-Party Services
                  </p>
                  <p>
                    This policy governs MTPL&apos;s direct practices only. It does <strong>not</strong> govern the independent privacy policies or data collection practices of third-party service providers, including airlines, independent hotel chains, international consulates/embassies, local safari operators, payment processors, WhatsApp (Meta Platforms, Inc.), Google Maps, or external social media platforms. When your inquiry progresses to confirmed bookings, such third parties process passenger data under their respective independent privacy governance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION C */}
            <section id="section-c" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  C. Information We Collect
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL collects only information that is relevant and necessary to review your travel request and communicate with you. The categories of information collected through our verified Phase 1 web implementation comprise:
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    1. Contact and Trip Planning Details (Web Enquiry Form)
                  </h3>
                  <p>
                    When submitting an inquiry via our website, you provide:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Full Name (Mandatory):</strong> Required (minimum 2 characters, maximum 100 characters) to address you personally and identify your travel file.</li>
                    <li><strong>Email Address (Mandatory):</strong> Required (valid email format, maximum 100 characters) to transmit travel quotations, detailed itineraries, and replies.</li>
                    <li><strong>Phone Number (Mandatory):</strong> Required (minimum 8 digits, maximum 20 characters) for telephone consultations, trip clarifications, or urgent travel updates.</li>
                    <li><strong>Travel Type (Optional):</strong> Your categorization of the journey (Domestic Travel, International Travel, Corporate / Business Travel, Holidays &amp; Visa Services, Group/Custom Tour, or Other).</li>
                    <li><strong>Trip Planning Message (Mandatory):</strong> Required (minimum 10 characters, maximum 2000 characters) to describe your preferred destinations, travel dates, passenger group details, or specific holiday requirements.</li>
                    <li><strong>Contextual Referral Tags (Automatic):</strong> If you click an inquiry button on a specific package (e.g. Kashmir, Dubai, Kerala), destination, or corporate service, the relevant package name or referral slug is automatically appended to help our consultants understand your exact interest.</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    2. Technical and Operational Information
                  </h3>
                  <p>
                    When you access the MTPL website, our web server and hosting infrastructure automatically record standard HTTP request data:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Internet Protocol (IP) address and approximate geographical region.</li>
                    <li>Browser type, browser version, operating system, and device screen dimensions.</li>
                    <li>Date, exact timestamp, referring webpage, and uniform resource locator (URL) requested.</li>
                    <li>Static asset cache requests to facilitate smooth Next.js image loading and package PDF downloads.</li>
                  </ul>
                </div>

                {/* Clear Disclaimers of What Is NOT Collected */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-slate-600" />
                    Data Explicitly NOT Collected on the Public Phase 1 Website:
                  </span>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>No Passport or Identity Document Scans:</strong> Our public website form does not ask for or accept passport uploads, Aadhaar cards, PAN cards, or visa documentation. Such documents are collected only through secure offline channels after you formally proceed with booking facilitation.</li>
                    <li><strong>No Online Payment Card Data:</strong> The Phase 1 website does not process credit cards, debit cards, CVV codes, UPI PINs, or net-banking credentials. No payment gateway is integrated into the public website.</li>
                    <li><strong>No Customer Account Passwords:</strong> The public website does not feature a user registration, login, or member profile portal.</li>
                    <li><strong>No Employment Applications or CVs:</strong> The Phase 1 website does not host a careers application form or résumé upload feature.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION D */}
            <section id="section-d" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  D. How We Collect Information
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL collects personal data strictly through legitimate, voluntary, and direct methods:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Direct Form Submissions:</strong> When you complete and submit the travel inquiry form on our website.</li>
                  <li><strong>Visitor-Initiated Voice &amp; Email Communications:</strong> When you voluntarily call our customer care numbers or send an email to our support inbox.</li>
                  <li><strong>Visitor-Initiated WhatsApp Conversations:</strong> When you click the WhatsApp link to chat directly with an MTPL travel representative.</li>
                  <li><strong>Automated Server Infrastructure:</strong> Standard, transient HTTP request logging conducted automatically by our web hosting infrastructure for network security, diagnostics, and firewall management.</li>
                </ul>
                <p>
                  <strong>No Covert or Broker Sourcing:</strong> MTPL does <strong>not</strong> purchase personal information from data brokers, scrape public social networking profiles, or acquire consumer contact lists from third-party advertising vendors.
                </p>
              </div>
            </section>

            {/* SECTION E */}
            <section id="section-e" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  E. How We Use Information
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Personal data collected through this website is utilized exclusively for genuine, travel-related business purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Responding to Enquiries:</strong> Reviewing your travel preferences and answering questions regarding flights, accommodations, visa guidelines, safari permits, or holiday packages.</li>
                  <li><strong>Formulating Quotations:</strong> Calculating transparent, customized travel cost estimates and designing personalized travel itineraries.</li>
                  <li><strong>Direct Consultation:</strong> Contacting you by phone, email, or WhatsApp to clarify schedule preferences, passenger requirements, and booking milestones.</li>
                  <li><strong>Website Security &amp; Anti-Spam:</strong> Detecting and intercepting automated bot submissions via our invisible honeypot mechanism to prevent server degradation.</li>
                  <li><strong>Statutory &amp; Accounting Compliance:</strong> Maintaining accurate commercial records required by Indian tax, commercial, and accounting laws (including GST and corporate governance).</li>
                </ul>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">What MTPL Does NOT Do With Your Data:</p>
                  <p>
                    MTPL does not sell, rent, trade, or monetize your contact details. We do not engage in automated consumer profiling, behavioral cross-site advertising, or algorithmic decision-making. Your contact details are not shared with unrelated third parties for direct marketing.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION F */}
            <section id="section-f" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  F. Legal Basis and User Choice
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Under applicable Indian jurisprudence—including the <em>Digital Personal Data Protection Act, 2023 (DPDPA)</em> and the <em>Information Technology Act, 2000</em>—our processing of your personal data is grounded on:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Voluntary Provision for Specified Purpose:</strong> You voluntarily furnish your name, email, phone number, and trip plans specifically to enable MTPL to review your travel request and communicate with you.</li>
                  <li><strong>Steps Prior to Contractual Facilitation:</strong> Processing necessary to prepare quotations, verify supplier availability, and design itineraries prior to formal travel contract confirmation.</li>
                  <li><strong>Legitimate Uses &amp; Statutory Compliance:</strong> Ensuring network security, preventing fraud or spam, and fulfilling mandatory commercial reporting obligations under Indian law.</li>
                </ul>
                <p>
                  <strong>User Choice &amp; Opt-Out:</strong> You are under no statutory obligation to provide personal information on our website. If you do not wish to share information online, you may browse our package listings and visit our head office in Dharampeth, Nagpur in person. If you submit an enquiry and subsequently decide not to pursue travel arrangements, you may notify us at any time at <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{siteConfig.contact.email}</code>, and our consultants will cease all follow-up communications.
                </p>
              </div>
            </section>

            {/* SECTION G */}
            <section id="section-g" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  G. Sharing and Disclosure
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL treats all customer inquiries with strict confidentiality. Personal data is shared only under specific, legitimate operational conditions:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Authorized Personnel:</strong> Internal MTPL directors, travel consultants, ticketing executives, and tour managers who require access to design, quote, or fulfill your trip.</li>
                  <li><strong>Database &amp; Technology Infrastructure Providers:</strong> Technical service providers that maintain our secure MongoDB database and cloud server infrastructure under strict confidentiality obligations.</li>
                  <li><strong>Travel Suppliers (Upon Booking Confirmation):</strong> When an inquiry progresses to an active travel booking, passenger details must necessarily be transmitted to third-party airlines (via GDS/CRS systems), hotels, local transport operators, wildlife safari authorities, and foreign consulates/visa outsourcing centers to issue valid tickets, vouchers, and entry permits.</li>
                  <li><strong>Legal &amp; Regulatory Authorities:</strong> We may disclose information if required to do so by a competent court of law, statutory tax authorities (under GST or Income Tax Acts), or Indian law enforcement agencies pursuant to valid legal process.</li>
                </ul>
                <p className="text-xs text-slate-600 italic">
                  Note: MTPL does not disclose personal contact data to external marketing agencies or third-party lead brokers.
                </p>
              </div>
            </section>

            {/* SECTION H */}
            <section id="section-h" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  H. WhatsApp &amp; External Services
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Our website features interactive buttons enabling visitors to connect directly with MTPL consultants via WhatsApp or explore external services:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-brand" />
                      WhatsApp Messaging Integration
                    </span>
                    <p>
                      Clicking our WhatsApp link redirects your browser or device to the WhatsApp application, which is independently owned and operated by Meta Platforms, Inc. Communications inside WhatsApp are governed by WhatsApp&apos;s own Privacy Policy and Terms of Service. MTPL does not control Meta&apos;s independent telemetry or platform-level processing.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand" />
                      Google Maps &amp; Office Navigation
                    </span>
                    <p>
                      Links to view MTPL&apos;s physical office address redirect to Google Maps, an external service operated by Google LLC. Your interaction with Google Maps is governed by Google&apos;s Privacy Policy.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-brand" />
                      External Social Media Links
                    </span>
                    <p>
                      Our website links to official MTPL pages on Facebook and Instagram. Visiting those pages subject you to the privacy terms and cookies of the respective platforms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION I */}
            <section id="section-i" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  I. Cookies &amp; Similar Technologies
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  During Phase 1 of our business website, MTPL maintains a restrained and transparent approach to cookies:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Strictly Necessary Technical Cookies:</strong> Temporary technical cookies and session storage used exclusively for fundamental routing, form state persistence, Next.js page transitions, and server security.</li>
                  <li><strong>No Third-Party Advertising Pixels:</strong> We do not load third-party ad networks, tracking pixels, or cross-site commercial cookies on this website.</li>
                  <li><strong>Self-Hosted Fonts:</strong> Typography is bundled and served locally from our Next.js application build via <code className="text-xs bg-slate-100 px-1 rounded text-slate-800">next/font/google</code>, ensuring that no visitor IP addresses are transmitted to Google font servers during browsing.</li>
                </ul>
                <p>
                  For detailed information regarding technical storage and guidance on managing cookies via your browser settings, please review our separate{" "}
                  <Link href="/cookie-policy" className="text-[#16A765] font-semibold hover:underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* SECTION J */}
            <section id="section-j" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  J. Data Storage &amp; Retention
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Personal data collected through website inquiry submissions is stored in our protected MongoDB database (`enquiries` collection) hosted in secure server environments with restricted access:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Retention Principle:</strong> Information is retained for as long as necessary to achieve the specific travel planning purpose for which it was collected, or to maintain continuity for ongoing customer service.</li>
                  <li><strong>Statutory Accounting Mandates:</strong> Where an enquiry progresses to a confirmed commercial booking, flight ticketing, or hotel reservation, relevant customer records (such as invoices, passenger manifests, and payment receipts) are retained for the statutory period mandated by Indian tax and commercial legislation (generally 5 to 8 financial years under GST and Income Tax laws).</li>
                  <li><strong>Inquiry Lifecycle:</strong> Unconverted inquiries and general messages are periodically reviewed and purged when they are no longer operationally active. MTPL is currently formalizing granular retention schedules across its CRM workflows.</li>
                </ul>
              </div>
            </section>

            {/* SECTION K */}
            <section id="section-k" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  K. Data Security Measures
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL employs comprehensive technical and procedural security measures designed to safeguard your personal data:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Server-Side Input Sanitization:</strong> All form submissions are parsed and validated server-side through strict Zod schemas with length limits, format verification, and string sanitization before reaching the database.</li>
                  <li><strong>Server-Side Environment Protection:</strong> Database credentials, connection strings, and server configurations are isolated in server environment variables and never exposed to the client-side browser bundle.</li>
                  <li><strong>Encrypted Web Transit:</strong> Website sessions are protected using industry-standard Hypertext Transfer Protocol Secure (HTTPS) with TLS encryption.</li>
                  <li><strong>Spam &amp; Honeypot Defense:</strong> Hidden form honeypot fields intercept malicious bot transmissions, mitigating denial-of-service and automated form spam risks.</li>
                  <li><strong>Safe Error Handling:</strong> Internal database errors are intercepted and logged server-side without exposing database architecture or raw stack traces to the public web interface.</li>
                </ul>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Realistic Assessment of Internet Transmission
                  </p>
                  <p>
                    While MTPL implements diligent security safeguards, no method of transmission over the Internet or electronic storage is completely impenetrable. Consequently, MTPL cannot guarantee absolute security against malicious zero-day exploits or unauthorized third-party interceptions.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION L */}
            <section id="section-l" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  L. User Rights &amp; Privacy Requests
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  In accordance with applicable Indian data protection principles, visitors whose personal data has been collected by MTPL possess specific rights:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Right to Inquire &amp; Access:</strong> You may request confirmation of whether MTPL processes personal data relating to you, and request a summary of the data held.</li>
                  <li><strong>Right to Rectification:</strong> If your contact number, email address, or name was submitted incorrectly, you may request that MTPL update or rectify the record.</li>
                  <li><strong>Right to Withdraw Consent / Discontinue Communication:</strong> You may request that MTPL cease follow-up communications or delete your inquiry file, provided that retention is not mandated by ongoing travel arrangements or statutory tax laws.</li>
                  <li><strong>Grievance Redressal:</strong> You have the right to register concerns or complaints regarding our data handling practices.</li>
                </ul>
                <div className="p-4 rounded-2xl bg-[#EEF8F3] border border-[#DCE7E1] text-xs text-[#063D2A] space-y-1.5">
                  <span className="font-bold block">How to Submit a Privacy Request:</span>
                  <p>
                    To exercise any of these rights, please send a written request to <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-[#16A765] underline">{siteConfig.contact.email}</a> or write to our registered head office in Dharampeth, Nagpur. We will verify your identity and review your request in accordance with applicable legal requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION M */}
            <section id="section-m" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  M. Children&apos;s Information
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  The MTPL website is a general audience commercial platform intended for adult travelers (individuals aged 18 years and above) who are legally capable of entering into binding contracts under the <em>Indian Contract Act, 1872</em>.
                </p>
                <p>
                  We do not knowingly collect personal data directly from children under 18 years of age through our website inquiry forms. When a family tour package or airline reservation includes minor children, all passenger details must be provided directly by the child&apos;s parent or lawful legal guardian. If we discover that personal information of a minor was submitted through our web form without verifiable parental consent, we will promptly delete that information upon notification.
                </p>
              </div>
            </section>

            {/* SECTION N */}
            <section id="section-n" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  N. International Data Transfers
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL curates both domestic Indian tours and international travel itineraries across global destinations (such as Dubai, Thailand, Singapore, Bali, Europe, and the Middle East).
                </p>
                <p>
                  If you request an international holiday package, international flight ticketing, or overseas hotel reservation, MTPL must necessarily transmit relevant passenger information (such as passenger names, contact numbers, and travel schedules) to airlines, overseas destination management companies (DMCs), and hotels located in the respective foreign destination countries to secure your reservations. By requesting an international travel arrangement, you acknowledge this necessary operational transfer.
                </p>
              </div>
            </section>

            {/* SECTION O */}
            <section id="section-o" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  O. Changes to This Policy
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL reserves the right to amend, update, or revise this Privacy Policy periodically to reflect changes in our website features, operational practices, technical infrastructure, or applicable legal standards in India.
                </p>
                <p>
                  Whenever this Privacy Policy is updated, the &quot;Last Updated&quot; date displayed at the top of this page will be revised accordingly. Any revised policy shall become effective immediately upon its posting on this website. We encourage you to review this page periodically to stay informed about how MTPL safeguards your personal data.
                </p>
              </div>
            </section>

            {/* SECTION P */}
            <section id="section-p" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  P. Contact &amp; Grievance Information
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  If you have questions, feedback, or concerns regarding this Privacy Policy, or if you wish to exercise your data rights, please contact Mishrikotkar Travels Pvt. Ltd. through our verified corporate channels:
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
                      Privacy &amp; Inquiries Email
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

            {/* SECTION Q */}
            <section id="section-q" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  Q. Related Policies &amp; Master Links
                </h2>
              </div>
              <p className="text-slate-600 text-sm">
                This Privacy Policy forms an integral part of MTPL&apos;s comprehensive website and client governance framework. Please review our companion policies:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                  href="/cookie-policy"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Cookie Policy</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Detailed disclosures on technical cookies, local cache markers, and user browser preferences.
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

import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import {
  ShieldCheck,
  FileText,
  Compass,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Scale,
  Building2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Terms & Conditions | Mishrikotkar Travels",
  description:
    "Official Terms and Conditions governing website usage, enquiries, itineraries, and travel facilitation services with Mishrikotkar Travels Pvt. Ltd. (MTPL).",
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`,
  },
}

const tableOfContents = [
  { id: "section-a", label: "A. Introduction & Acceptance" },
  { id: "section-b", label: "B. About MTPL & Intermediary Role" },
  { id: "section-c", label: "C. Website Information & Accuracy" },
  { id: "section-d", label: "D. Enquiries & Booking Confirmation" },
  { id: "section-e", label: "E. Pricing, Taxes & Service Charges" },
  { id: "section-f", label: "F. Cancellation & Refund Policy" },
  { id: "section-g", label: "G. Holiday Packages & Itineraries" },
  { id: "section-h", label: "H. Third-Party Travel Providers" },
  { id: "section-i", label: "I. Visa, Passport, Forex & Insurance" },
  { id: "section-j", label: "J. Customer Responsibilities" },
  { id: "section-k", label: "K. Force Majeure & External Events" },
  { id: "section-l", label: "L. External Links & Third-Party Sites" },
  { id: "section-m", label: "M. Intellectual Property & Website Use" },
  { id: "section-n", label: "N. Privacy & Cookie Governance" },
  { id: "section-o", label: "O. Limitation of Liability" },
  { id: "section-p", label: "P. Prospective Changes to Terms" },
  { id: "section-q", label: "Q. Governing Law & Jurisdiction" },
  { id: "section-r", label: "R. Contact Information" },
  { id: "section-s", label: "S. Related Policies & Master Links" },
]

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Restrained Legal Hero Header */}
      <section 
        className="bg-[#073B2D] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden text-center"
        aria-label="Terms and Conditions Header"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-about.jpg"
            alt="Terms and Conditions Background"
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
            <Scale className="w-3.5 h-3.5 text-[#91D7B0]" />
            Website &amp; Service Governance
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm md:text-base text-[#EEF8F3]/85 font-light mt-3 max-w-2xl mx-auto leading-relaxed">
            The legal terms, scope of service, and guidelines governing access to our website, inquiry submissions, and travel coordination with MTPL.
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
                <span className="text-[11px] text-slate-500 font-medium">19 Sections</span>
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
            </div>
          </aside>

          {/* Right Column: Full Legal Sections */}
          <main className="lg:col-span-8 space-y-14 text-slate-700 leading-relaxed font-normal text-sm md:text-base">
            
            {/* Introductory Notice Card */}
            <div className="bg-[#E8F5ED] p-6 md:p-8 rounded-3xl border border-[#D0E7D9] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16A765]">
                <ShieldCheck className="w-4 h-4" />
                Core Scope &amp; Legal Differentiation
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#123D2E] font-sans">
                Notice: Distinction Between Website Use and Confirmed Bookings
              </h3>
              <p className="text-sm text-[#265344] leading-relaxed">
                This document sets forth the terms governing your general access to and browsing of the Mishrikotkar Travels Pvt. Ltd. (&quot;MTPL&quot;) website, as well as digital inquiries submitted through our web forms or WhatsApp channels. Submitting an enquiry or receiving an indicative itinerary does <strong>not</strong> create a confirmed booking. Actual travel reservations are concluded only after formal client approval, required payment, and the issuance of verified tickets or vouchers under our service-specific booking contracts.
              </p>
            </div>

            {/* SECTION A */}
            <section id="section-a" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  A. Introduction and Acceptance
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  These Website Terms &amp; Conditions (&quot;Terms&quot;) apply to the website located at <strong>mishrikotkartravels.com</strong> and <strong>mtpl.online</strong> (collectively, the &quot;Website&quot;), operated by <strong>Mishrikotkar Travels Pvt. Ltd.</strong> (&quot;MTPL&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a private limited company incorporated under the laws of India, having its corporate head office at 101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010, Maharashtra, India.
                </p>
                <p>
                  By accessing, viewing, or interacting with this Website, downloading package itineraries, or transmitting inquiries via our contact forms, telephone lines, or WhatsApp connections, you acknowledge that you have read and agree to comply with these Terms and all applicable statutory regulations of India. If you do not agree with these Website Terms, you should discontinue using the Website.
                </p>
                <p>
                  <strong>Scope Limitation:</strong> Merely browsing this Website or sending an exploratory message does not automatically bind you to financial booking contracts. Contractual obligations relating to travel services arise strictly when you approve a formal quotation, execute the required advance payment, and receive written confirmation from MTPL in accordance with Section D below.
                </p>
              </div>
            </section>

            {/* SECTION B */}
            <section id="section-b" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  B. About MTPL and Its Services
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL is an established travel consultation and booking facilitation enterprise (established in 2006, IATA Accredited Agent No. <strong>14344864</strong>, GSTIN: <strong>27AAJCM1228J1ZE</strong>). As reflected in our authoritative operating policies, MTPL offers professional assistance across:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Domestic &amp; International Air Ticketing:</strong> Routing consultation, fare selection, ancillary requests, ticket reissue, and cancellation guidance.</li>
                  <li><strong>Hotels &amp; Luxury Stays:</strong> Reservations across verified hotels, luxury resorts, boutique villas, and business accommodations worldwide.</li>
                  <li><strong>Holiday Tour Packages:</strong> Tailor-made FIT (Free Independent Traveller) and GIT (Group Inclusive Tour) itineraries, including sightseeing excursions, private transfers, and destination services.</li>
                  <li><strong>Jungle Safaris &amp; Wildlife Tourism:</strong> Coordination of forest permits, safari vehicles (gypsies/canters), and certified guides across Central Indian reserves (e.g., Tadoba, Pench, Kanha, Bandhavgarh) and other wildlife destinations.</li>
                  <li><strong>Visa Facilitation:</strong> Document preparation advisory, application review, and submission assistance for diplomatic consulates and official visa application centres.</li>
                  <li><strong>Passport Documentation Guidance:</strong> Assistance with Passport Seva online scheduling and documentation preparation.</li>
                  <li><strong>Foreign Exchange Coordination:</strong> Facilitating traveller forex requirements through Reserve Bank of India (RBI) authorized dealers and money changers in compliance with FEMA regulations.</li>
                  <li><strong>Travel Insurance Coordination:</strong> Arranging comprehensive medical and trip cancellation insurance issued by licensed insurance underwriters.</li>
                </ul>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <strong>Facilitation Disclosure:</strong> Unless specifically agreed in writing, MTPL acts solely as an intermediary between travellers and independent third-party operators (such as airlines, hotel properties, transport fleets, and government departments). MTPL does not own or operate aircraft, commercial hotels, or wildlife reserves.
                </div>
              </div>
            </section>

            {/* SECTION C */}
            <section id="section-c" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  C. Website Information and Accuracy
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  The information presented on this Website—including package descriptions, itineraries, highlights, destination guides, photographs, and indicative prices—is published in good faith for general information, service discovery, and planning assistance.
                </p>
                <p>
                  Because the travel industry is inherently dynamic, airfares, room availability, safari quotas, currency exchange rates, statutory taxes, and entry regulations change frequently without advance notice. While MTPL makes reasonable professional efforts to keep Website content accurate and updated:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>No warranty or guarantee is made that Website content will always be error-free, exhaustive, or up to the minute.</li>
                  <li>Photographs, amenities, and hotel star ratings are supplied by suppliers and represent general artistic or indicative impressions that may vary by season or property renovation.</li>
                  <li>Customers must verify all material particulars (exact inclusions, dates, pricing, visa validity, and hotel categories) directly with MTPL consultants prior to committing funds.</li>
                </ul>
              </div>
            </section>

            {/* SECTION D */}
            <section id="section-d" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  D. Enquiries, Quotations, and Booking Confirmation
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  In accordance with MTPL&apos;s authoritative General Booking Policy, the client booking workflow is governed by the following stages:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Enquiry Stage:</strong> An enquiry submitted via web forms, email, telephone, or WhatsApp represents a non-binding request for consultation. It does not block inventory, reserve flight seats, or hold hotel rooms.
                  </li>
                  <li>
                    <strong>Quotation Stage:</strong> Any itinerary proposal or quotation provided by MTPL is indicative and subject to real-time seat, room, and permit availability at the time of final booking. Tariffs and taxes may fluctuate until ticketing and invoicing.
                  </li>
                  <li>
                    <strong>Booking Confirmation Stage:</strong> A booking is considered confirmed <em>only</em> after:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>The agreed booking deposit or full payment required by MTPL and suppliers has been received in cleared funds; and</li>
                      <li>MTPL or the respective supplier issues a formal booking confirmation, flight ticket, PNR, hotel voucher, or official permit reference.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Electronic Authorizations:</strong> A clear written electronic reply sent from the client&apos;s registered WhatsApp number or email (e.g., &quot;OK&quot;, &quot;CONFIRM&quot;, &quot;GO AHEAD&quot;) may be treated as authorization to proceed with ticketing and commitment of funds, subject to applicable law.
                  </li>
                  <li>
                    <strong>Immediate Client Verification:</strong> Upon receipt of confirmation, tickets, or vouchers, clients are obligated to inspect names (exact passport spelling), flight timings, baggage rules, and hotel dates immediately, reporting any discrepancies to MTPL without delay.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION E */}
            <section id="section-e" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  E. Pricing, Taxes, and Service Charges
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  All prices published on the Website are indicative starting rates based on standard seasonal occupancy and past supplier tariffs. The finalized price for any service is confirmed only on the written quotation or invoice issued directly by MTPL.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Service &amp; Consultancy Charges:</strong> MTPL professional consultation, itinerary development, processing, and handling charges are distinct from third-party airline or hotel tariffs. Once the consultancy or booking service has been performed, MTPL service charges are non-refundable to the extent permitted by law.
                  </li>
                  <li>
                    <strong>Dynamic Tax &amp; Surcharge Revisions:</strong> Increases in airline fuel surcharges, statutory GST, airport departure taxes, tourist levies, or supplier tariffs enacted after quotation but prior to travel are payable by the client where not specifically included.
                  </li>
                  <li>
                    <strong>Foreign Currency Conversion:</strong> Foreign currency components converted to INR remain subject to currency exchange rate variations and banking transaction fees until final settlement.
                  </li>
                  <li>
                    <strong>Locally Payable Charges:</strong> Mandatory hotel security deposits, city tourism taxes, minibar, telephone, and resort amenity fees payable on-site are the sole responsibility of the client unless explicitly bundled in writing.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION F */}
            <section id="section-f" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  F. Cancellation, Amendments, and Refunds
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Cancellation, amendment, and refund eligibility is governed entirely by the rules and fare structures of the underlying third-party suppliers (airlines, hotels, transport operators, and forest authorities). MTPL does not enforce arbitrary cancellation penalties but strictly reflects supplier conditions:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Non-Refundable Commitments:</strong> Promotional airfares, advance-purchase hotel stays, peak-season safari permits, and visa application fees may be 100% non-refundable and non-changeable from the instant of confirmation.
                  </li>
                  <li>
                    <strong>Refund Settlement:</strong> Where an airline, hotel, or operator authorizes and actually remits a refund to MTPL, MTPL will pass on the recoverable amount after deducting supplier penalties, non-refundable taxes, bank gateway fees, and MTPL earned service charges.
                  </li>
                  <li>
                    <strong>Refund Timelines:</strong> Refund disbursement timelines depend entirely on external airline, hotel, and banking settlement cycles and cannot be guaranteed by MTPL.
                  </li>
                  <li>
                    <strong>Unused Travel Components:</strong> No refund or credit is due for voluntarily missed flights, unused hotel nights, unconsumed meals, or untaken sightseeing tours.
                  </li>
                  <li>
                    <strong>Credit Shells &amp; Supplier Vouchers:</strong> Where an airline or supplier issues a travel credit voucher or credit shell in lieu of cash, MTPL&apos;s obligation is limited to passing through and assisting with that specific voucher under supplier rules.
                  </li>
                </ul>

                <div className="mt-4 p-4 bg-[#F7F9F8] rounded-2xl border border-[#DCE7E1] flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    For complete, detailed terms on cancellation and refund administration:
                  </span>
                  <Link
                    href="/booking-policy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A765] hover:underline"
                  >
                    <span>Read General Booking Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION G */}
            <section id="section-g" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  G. Holiday Packages and Travel Itineraries
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Holiday packages, whether domestic or international, represent coordinated itineraries combining multi-vendor services. In accordance with MTPL&apos;s Holiday Tour Package Terms:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Operational Flexibility:</strong> Sightseeing sequence, route order, and transfer timings may be rearranged during travel due to adverse weather, road closures, traffic congestion, administrative orders, or supplier operational needs. MTPL will strive to offer comparable alternatives where feasible.
                  </li>
                  <li>
                    <strong>Accommodation &amp; Rooms:</strong> Bedding preferences (e.g. king bed vs. twin singles), room floor, scenic view, early check-in, and late check-out remain requests subject to hotel discretion upon arrival, unless confirmed as guaranteed in writing.
                  </li>
                  <li>
                    <strong>Inclusions Verification:</strong> Package inclusions, exclusions, and complimentary amenities must be cross-verified against the finalized quotation document and travel vouchers.
                  </li>
                  <li>
                    <strong>Voluntary Activities:</strong> Participation in adventure excursions, water sports, desert safaris, or paragliding is undertaken at the traveller&apos;s voluntary choice and personal risk under the independent operator&apos;s waivers.
                  </li>
                </ul>

                <div className="mt-4 p-4 bg-[#F7F9F8] rounded-2xl border border-[#DCE7E1] flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    Review specific tour terms, client declarations, and travel waivers:
                  </span>
                  <Link
                    href="/holiday-package-terms"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A765] hover:underline"
                  >
                    <span>Read Holiday Tour Package Terms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION H */}
            <section id="section-h" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  H. Third-Party Travel Providers (Airlines, Hotels, Safaris, Transporters)
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL acts as an intermediary coordinating arrangements supplied by independent carriers, hoteliers, destination management companies (DMCs), and safari authorities:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#16A765]" />
                      Airlines
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Flight timings, aircraft types, seat assignments, baggage limits, delays, and cancellations are controlled solely by the operating carrier. Airlines may modify schedules without prior notice.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#16A765]" />
                      Hotels &amp; Resorts
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Hotel standards, room dimensions, cleanliness, and facilities are managed directly by property administration. MTPL relies on supplier descriptions and cannot independently warrant subjective quality.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#16A765]" />
                      Jungle Safaris
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Permits are issued strictly by State Forest Departments. Gates, zones, gypsies, and guides are designated by authorities. Wildlife and tiger sightings can <strong>never</strong> be guaranteed.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#16A765]" />
                      Independent Transporters
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Vehicle pickups are subject to local traffic and weather. Luggage remains the traveller&apos;s responsibility; MTPL is not a bailee of baggage and is not liable for transport delays outside our control.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 pt-1">
                  While MTPL is not liable for third-party operational deficiencies beyond our control, we commit to exercising reasonable professional care and will assist clients in communicating with suppliers to seek practical remedies.
                </p>
              </div>
            </section>

            {/* SECTION I */}
            <section id="section-i" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  I. Visa, Passport, Forex, and Travel Insurance Assistance
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL provides dedicated assistance across essential cross-border travel requirements, subject to clear statutory boundaries:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Visa Facilitation:</strong> MTPL acts solely as a documentation facilitator. The decision to approve, reject, or delay a visa application, as well as the granted validity, number of entries, and permitted duration of stay, rests solely within the sovereign discretion of the concerned embassy, consulate, or immigration authority. Visa refusal does not create any liability upon MTPL for airfare or hotel losses.
                  </li>
                  <li>
                    <strong>Passport Assistance:</strong> MTPL assists with online form completion and appointment scheduling. Passport issuance, Tatkaal clearance, and police verification are governed exclusively by the Ministry of External Affairs / Passport Seva Kendras.
                  </li>
                  <li>
                    <strong>Foreign Exchange (Forex):</strong> MTPL coordinates foreign currency services strictly through RBI-authorized banks and licensed money changers under FEMA regulations. Currency exchange rates fluctuate until executed.
                  </li>
                  <li>
                    <strong>Travel Insurance:</strong> Insurance contracts are between the traveller and the insurance underwriter. Policy benefits, exclusions, deductibles, and claim settlements are governed solely by the underwriter&apos;s policy schedule. MTPL does not underwrite risk or guarantee claim settlement.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION J */}
            <section id="section-j" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  J. Customer Responsibilities and Travel Documentation
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Clients and travelling parties are responsible for exercising diligence throughout the planning and travel phases:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Accurate Passenger Details:</strong> Provide exact names as spelled in passports or government photo IDs, correct dates of birth, contact details, and nationality. Expenses resulting from incorrect information supplied by the client (such as ticket reissues or visa re-applications) are borne by the client.
                  </li>
                  <li>
                    <strong>Travel Document Validity:</strong> Ensure possession of an undamaged passport valid for at least six (6) months beyond travel dates, valid entry visas, transit visas, transit health documents, and return air tickets.
                  </li>
                  <li>
                    <strong>Health &amp; Dietary Disclosures:</strong> Disclose mobility restrictions, medical requirements, pregnancy limitations, and dietary allergies in advance so that reasonable requests can be communicated to airlines and hotels.
                  </li>
                  <li>
                    <strong>Compliance with Local Laws:</strong> Respect destination customs, local regulations, security guidelines, and hotel/airline conduct rules.
                  </li>
                  <li>
                    <strong>Safeguarding Identity Data:</strong> Do not submit sensitive identity information (such as passport copies or bank account details) through general website forms. Such documents should be provided only via secure direct communication during formal booking.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION K */}
            <section id="section-k" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  K. Force Majeure and Events Beyond Reasonable Control
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL shall not be liable for failure, delay, disruption, or financial loss caused by circumstances beyond reasonable control, including but not limited to natural disasters, earthquakes, severe weather, cyclones, floods, epidemics, pandemics, wars, civil commotion, strikes, technical transport breakdowns, government lockdowns, border closures, or airspace restrictions.
                </p>
                <p>
                  In the event of such disruptions, MTPL will provide reasonable assistance in pursuing available alternatives, flight re-routings, or supplier claims. However, additional expenses incurred for extended hotel stays, alternate tickets, or subsistence remain the responsibility of the client or travel insurance.
                </p>
              </div>
            </section>

            {/* SECTION L */}
            <section id="section-l" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  L. External Links and Third-Party Digital Resources
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  This Website may contain hyperlinks pointing to external websites, such as social media platforms, airlines, hotel properties, tourism authorities, or government portals. These links are provided solely for your convenience and service discovery.
                </p>
                <p>
                  MTPL does not operate, control, or monitor external digital platforms. Accessing third-party websites is at your own risk and subject to the terms and privacy practices of those respective third parties.
                </p>
              </div>
            </section>

            {/* SECTION M */}
            <section id="section-m" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  M. Intellectual Property and Permitted Website Use
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  All digital assets displayed on this Website—including the MTPL brand logo, trademarks, curated tour itineraries, written content, photography, graphics, UI design, and underlying code—are the intellectual property of Mishrikotkar Travels Pvt. Ltd. or its licensors.
                </p>
                <p>
                  <strong>Permitted Personal Use:</strong> You are granted a limited, revocable, non-exclusive license to view website pages and download package itinerary PDFs solely for personal, non-commercial holiday planning.
                </p>
                <p>
                  <strong>Prohibitions:</strong> You may not scrape, reproduce, republish, distribute, reverse engineer, or commercially exploit any website content, itineraries, or code without express prior written consent from MTPL.
                </p>
              </div>
            </section>

            {/* SECTION N */}
            <section id="section-n" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  N. Privacy, Data Protection, and Cookies
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  Your privacy is important to MTPL. Information submitted through our online inquiry forms, telephone consultations, or WhatsApp channels (such as names, phone numbers, email addresses, and travel preferences) is processed strictly to provide travel consultations and fulfill bookings.
                </p>
                <p>
                  Our data handling, security safeguards, and cookie practices are governed by our separate:
                </p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A765] bg-[#E8F5ED] px-4 py-2 rounded-xl border border-[#D0E7D9] hover:bg-[#D4E8DC] transition-colors"
                  >
                    <span>Read Privacy Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123D2E] bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    <span>Read Cookie Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION O */}
            <section id="section-o" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  O. Limitation of Liability and Mandatory Consumer Rights
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  To the fullest extent permitted under applicable Indian law, MTPL&apos;s responsibility for website usage is limited to operating the digital platform with reasonable care and skill:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>No Indirect or Consequential Damages:</strong> MTPL shall not be liable for indirect, incidental, special, punitive, or consequential losses, including loss of profits, loss of business opportunity, or emotional distress arising from website downtime, supplier service failures, or flight disruptions.
                  </li>
                  <li>
                    <strong>Mandatory Statutory Rights:</strong> Nothing in these Terms shall limit or exclude any statutory liability or consumer protection right that cannot lawfully be limited or excluded under the Consumer Protection Act, 2019 or other applicable Indian statutes.
                  </li>
                  <li>
                    <strong>Booking Contracts:</strong> Specific contractual liability limitations governing confirmed holiday packages are set forth in our separate <Link href="/holiday-package-terms" className="text-[#16A765] underline font-semibold">Holiday Tour Package Terms</Link>.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION P */}
            <section id="section-p" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  P. Prospective Changes to Website Terms
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  MTPL reserves the right to revise or update these Website Terms &amp; Conditions periodically to reflect regulatory updates, technological improvements, or modifications in our business operations.
                </p>
                <p>
                  Any revision applies prospectively from the date posted on the Website. The revised terms will not retrospectively alter the agreed terms of a travel booking that was confirmed prior to the update date.
                </p>
              </div>
            </section>

            {/* SECTION Q */}
            <section id="section-q" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  Q. Governing Law and Jurisdiction
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  These Website Terms &amp; Conditions, and any dispute or controversy arising out of your access to or use of this Website, shall be governed by and construed in accordance with the laws of the Republic of India.
                </p>
                <p>
                  Subject to mandatory statutory consumer forum jurisdictions that cannot be waived by law, any legal action, dispute, or proceeding arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts and tribunals situated at <strong>Nagpur, Maharashtra, India</strong>.
                </p>
              </div>
            </section>

            {/* SECTION R */}
            <section id="section-r" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  R. Verified Company &amp; Contact Information
                </h2>
              </div>
              <div className="space-y-3 text-slate-700">
                <p>
                  For any questions, legal notices, or clarifications regarding these Terms &amp; Conditions or your website inquiries, please communicate directly with our corporate office:
                </p>

                <div className="bg-[#F7F9F8] p-6 rounded-3xl border border-[#DCE7E1] space-y-3">
                  <div className="font-bold text-slate-900 text-base font-sans">
                    {siteConfig.companyName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#16A765] mt-0.5 flex-shrink-0" />
                      <span>{siteConfig.contact.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#16A765] flex-shrink-0" />
                      <a href={`tel:${siteConfig.contact.phones.primary.replace(/\s/g, "")}`} className="hover:text-[#16A765] font-semibold">
                        {siteConfig.contact.phones.primary}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#16A765] flex-shrink-0" />
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#16A765] font-semibold">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#16A765] flex-shrink-0" />
                      <span>Mon – Sat: {siteConfig.contact.businessHours}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#DCE7E1] flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                    <span>IATA Accredited Agent: <strong>{siteConfig.credentials.iataNumber}</strong></span>
                    <span>&bull;</span>
                    <span>GSTIN: <strong>{siteConfig.credentials.gst}</strong></span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION S */}
            <section id="section-s" className="space-y-4 scroll-mt-28 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-6 bg-[#16A765] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
                  S. Related Policies &amp; Master Governance Links
                </h2>
              </div>
              <p className="text-slate-700">
                These Website Terms &amp; Conditions operate alongside our complete suite of client governance documents:
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
                    How personal inquiry data, cookies, and communications are safeguarded.
                  </p>
                </Link>

                <Link
                  href="/disclaimer"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Website Disclaimer</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Important statutory notices regarding dynamic tariffs and supplier operational limits.
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
                    Comprehensive terms governing ticketing, hotels, visas, safaris, and refund workflows.
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
                  href="/cookie-policy"
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A765] shadow-xs hover:shadow-md transition-all space-y-1.5 sm:col-span-2"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-sm group-hover:text-[#16A765] transition-colors">
                    <span>Cookie Policy</span>
                    <ArrowRight className="w-4 h-4 text-[#16A765] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Transparency regarding technical cookies and performance session storage on this Website.
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

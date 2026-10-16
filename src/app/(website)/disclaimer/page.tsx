import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import {
  ShieldAlert,
  FileText,
  MapPin,
  Phone,
  Mail,
  Scale,
  ArrowRight,
  Plane,
  Building,
  Trees,
  FileCheck,
  Coins,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Website Disclaimer | Mishrikotkar Travels",
  description:
    "Official Website Disclaimer for Mishrikotkar Travels Pvt. Ltd. (MTPL) regarding travel facilitation, airline and hotel policies, pricing, visas, safaris, and third-party services.",
  alternates: {
    canonical: `${siteConfig.url}/disclaimer`,
  },
}

const tableOfContents = [
  { id: "section-1", label: "1. MTPL Acts as a Travel Facilitator" },
  { id: "section-2", label: "2. Prices & Availability" },
  { id: "section-3", label: "3. Third-Party Services" },
  { id: "section-4", label: "4. Air Tickets" },
  { id: "section-5", label: "5. Hotels, Holidays & Luxury Stays" },
  { id: "section-6", label: "6. Jungle Safaris" },
  { id: "section-7", label: "7. Visa Assistance" },
  { id: "section-8", label: "8. Passport Assistance" },
  { id: "section-9", label: "9. Forex Assistance" },
  { id: "section-10", label: "10. Travel Insurance" },
  { id: "section-11", label: "11. Travel Documents & Entry Requirements" },
  { id: "section-12", label: "12. Customer Responsibility" },
  { id: "section-13", label: "13. Force Majeure" },
  { id: "section-14", label: "14. Website Information" },
  { id: "section-15", label: "15. External Websites & Links" },
  { id: "section-16", label: "16. Limitation of Liability" },
  { id: "section-17", label: "17. Terms & Conditions" },
  { id: "section-18", label: "18. Governing Law & Jurisdiction" },
  { id: "section-19", label: "19. Acceptance" },
]

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Editorial Hero Header */}
      <section
        className="bg-[#073B2D] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden text-center"
        aria-label="Website Disclaimer Header"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-about.jpg"
            alt="Website Disclaimer Background"
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
            <ShieldAlert className="w-3.5 h-3.5 text-[#91D7B0]" />
            Legal Notice &amp; Clarifications
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
            Website Disclaimer
          </h1>
          <p className="text-sm md:text-base text-[#EEF8F3]/85 font-light mt-3 max-w-2xl mx-auto leading-relaxed">
            Important information and legal disclosures regarding travel facilitation, indicative pricing, third-party operators, and booking assistance.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#91D7B0] font-medium">
            <span>Mishrikotkar Travels Pvt. Ltd. (MTPL)</span>
            <span>&bull;</span>
            <span>Dharampeth, Nagpur - 440010, Maharashtra, India</span>
          </div>
        </Container>
      </section>

      {/* Main Content Layout */}
      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Quick Navigation Table of Contents (Sticky on Desktop) */}
          <aside className="lg:col-span-4" aria-label="Table of Contents">
            <div className="lg:sticky lg:top-28 bg-[#F7F9F8] p-6 rounded-3xl border border-[#DCE7E1] space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#073B2D] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brand" />
                  Table of Contents
                </span>
                <span className="text-xs bg-white text-slate-500 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                  19 Sections
                </span>
              </div>

              <nav className="max-h-[50vh] overflow-y-auto pr-1 space-y-1 text-xs">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-brand hover:bg-white transition-all font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Related Policies Box */}
              <div className="pt-4 border-t border-[#DCE7E1] space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Related Policies
                </p>
                <div className="space-y-1.5 text-xs font-medium">
                  <Link
                    href="/terms-and-conditions"
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:bg-white hover:text-brand transition-colors border border-transparent hover:border-[#DCE7E1]"
                  >
                    <span>Terms &amp; Conditions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:bg-white hover:text-brand transition-colors border border-transparent hover:border-[#DCE7E1]"
                  >
                    <span>Privacy Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:bg-white hover:text-brand transition-colors border border-transparent hover:border-[#DCE7E1]"
                  >
                    <span>Cookie Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/booking-policy"
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:bg-white hover:text-brand transition-colors border border-transparent hover:border-[#DCE7E1]"
                  >
                    <span>Booking Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/holiday-package-terms"
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:bg-white hover:text-brand transition-colors border border-transparent hover:border-[#DCE7E1]"
                  >
                    <span>Holiday Package Terms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Verified Company Credentials Card */}
              <div className="pt-4 border-t border-[#DCE7E1] space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                  <span>Verified Credentials</span>
                </div>
                <div className="space-y-1 pl-5 text-[11px] text-slate-500">
                  <p>IATA Accredited: <span className="font-semibold text-slate-800">{siteConfig.credentials.iataNumber}</span></p>
                  <p>GSTIN: <span className="font-semibold text-slate-800">{siteConfig.credentials.gst}</span></p>
                  <p>CIN: <span className="font-semibold text-slate-800">U63040MH2006PTC160533</span></p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Complete Official Disclaimer Content */}
          <main className="lg:col-span-8 space-y-10 text-slate-700">
            {/* Disclaimer Preamble Banner */}
            <div className="bg-[#F7F9F8] rounded-3xl p-6 sm:p-8 border border-[#DCE7E1] shadow-xs">
              <div className="border-b border-[#DCE7E1] pb-4 mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Official Legal Notice
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans mt-1">
                  WEBSITE DISCLAIMER
                </h2>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  Mishrikotkar Travels Pvt. Ltd. (MTPL)
                </p>
                <p className="text-xs text-slate-500">
                  Dharampeth, Nagpur - 440010, Maharashtra, India
                </p>
              </div>

              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <p>
                  The information, travel products and services displayed on this website are provided by Mishrikotkar Travels Pvt. Ltd. (&apos;MTPL&apos;, &apos;we&apos;, &apos;us&apos;, &apos;our&apos;) for general information, enquiry and booking assistance purposes.
                </p>
                <p className="font-medium text-slate-900">
                  By accessing this website, submitting an enquiry or booking any service through MTPL, you acknowledge and agree to the following:
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section id="section-1" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  MTPL Acts as a Travel Facilitator
                </h3>
              </div>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL provides travel-related booking, consultation and facilitation services including, but not limited to:
                </p>
                <ul className="space-y-2 my-3 pl-2 sm:pl-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Domestic and international air tickets</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Domestic and international hotel bookings</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Holiday packages</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Luxury stays</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Jungle safaris</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Visa assistance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Passport assistance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Foreign exchange assistance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Travel insurance assistance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Transfers, sightseeing, activities and other travel-related services</span>
                  </li>
                </ul>
                <p>
                  Unless specifically stated otherwise, MTPL acts as an intermediary/facilitator between the customer and independent third-party service providers such as airlines, hotels, resorts, transport companies, destination management companies, forest/safari authorities, embassies, consulates, visa application centres, government authorities, insurance companies, banks, authorised foreign exchange dealers and other suppliers. The actual services are provided and controlled by such third parties.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Prices &amp; Availability
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  All airfares, hotel rates, package prices, foreign exchange rates, taxes, availability, safari permits and other charges displayed or communicated through the website are subject to change without prior notice.
                </p>
                <p>
                  A quotation or enquiry response does not constitute a confirmed booking.
                </p>
                <p>
                  A booking shall be considered confirmed only after the required payment is received and the relevant ticket, voucher, confirmation, permit or booking reference has been issued.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  3
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Third-Party Services
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL does not own or directly control airlines, hotels, resorts, transport operators, DMCs, safari operators, visa centres or other third-party suppliers.
                </p>
                <p>
                  Accordingly, MTPL cannot guarantee their performance, service quality, punctuality, safety, availability or continued operation.
                </p>
                <p>
                  To the fullest extent permitted by applicable law, MTPL shall not be responsible for acts, omissions, delays, cancellations, overbooking, service deficiency, operational changes, strikes, closures, insolvency or other failures of third-party service providers.
                </p>
                <p>
                  MTPL will, however, reasonably assist customers in communicating with the concerned service provider wherever required.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  4
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Air Tickets</span>
                  <Plane className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  Airline schedules, fares, baggage allowances, aircraft, terminals, seat assignments, meals, check-in requirements and other services are governed by the respective airline.
                </p>
                <p>
                  Flight timings and schedules may be changed by airlines without prior notice.
                </p>
                <p>
                  MTPL shall not be responsible for airline cancellations, delays, missed connections, denied boarding, baggage loss/delay or other airline operational matters.
                </p>
                <p>
                  Any refund, cancellation or rebooking shall be subject to the applicable airline fare rules.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  5
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Hotels, Holidays &amp; Luxury Stays</span>
                  <Building className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  Hotel photographs, descriptions, facilities, ratings and other information displayed on the website are based on information made available by the respective supplier or hotel and are generally indicative.
                </p>
                <p>
                  Room allocation, floor, view, bedding configuration, interconnecting rooms, early check-in, late check-out and other special requests remain subject to hotel availability and confirmation.
                </p>
                <p>
                  Sightseeing, transfers or itinerary sequences may be altered due to weather, traffic, operational requirements, local restrictions or circumstances beyond reasonable control.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section-6" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  6
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Jungle Safaris</span>
                  <Trees className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  Jungle safari bookings are subject to availability and the rules of the concerned Forest Department or wildlife authority.
                </p>
                <p>
                  Safari zones, gates, vehicles, guides, routes and timings may be assigned or changed by the competent authorities.
                </p>
                <p>
                  Wildlife sightings, including tiger sightings, can never be guaranteed.
                </p>
                <p>
                  Permit cancellation, amendment and refund shall be governed solely by the applicable Forest Department rules.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  7
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Visa Assistance</span>
                  <FileCheck className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL acts only as a visa facilitator.
                </p>
                <p>
                  The granting, refusal, processing time, validity, number of entries, duration of stay and other conditions of a visa are determined solely by the concerned Embassy, Consulate, Immigration Authority or Visa Application Centre.
                </p>
                <p>
                  MTPL has no authority or influence over a visa decision.
                </p>
                <p>
                  Visa refusal or delay shall not create any liability upon MTPL for losses relating to air tickets, hotels, holidays or other travel arrangements.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  8
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Passport Assistance
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL provides only assistance with passport applications, documentation and related procedures. Passport issuance, appointment availability, police verification, Tatkaal eligibility, processing time and final approval remain under the control of the competent Government authorities.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="section-9" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  9
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Forex Assistance</span>
                  <Coins className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL may facilitate foreign exchange requirements through authorised banks, authorised dealers or money changers. Foreign exchange transactions remain subject to applicable FEMA/RBI regulations, KYC requirements, availability and the rate quoted by the authorised provider at the time of transaction.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="section-10" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  10
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Travel Insurance</span>
                  <ShieldCheck className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  Where travel insurance is arranged or facilitated through MTPL, the insurance contract remains directly between the traveller and the concerned insurance company.
                </p>
                <p>
                  Policy coverage, exclusions, claim eligibility, claim settlement and compensation are determined solely by the insurance company in accordance with the policy terms.
                </p>
                <p>
                  MTPL does not guarantee approval or settlement of any insurance claim.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="section-11" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  11
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Travel Documents &amp; Entry Requirements
                </h3>
              </div>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  It is the traveller&apos;s responsibility to ensure possession of valid:
                </p>
                <ul className="space-y-2 my-3 pl-2 sm:pl-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Passport</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Visa / transit visa</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Travel permits</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Immigration documents</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Vaccination or health documents</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Onward/return tickets</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Sufficient funds</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Any other documentation required by the destination or transit country</span>
                  </li>
                </ul>
                <p>
                  Possession of a valid visa does not guarantee entry into a country. Final admission remains at the discretion of the concerned immigration authorities.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section id="section-12" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  12
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Customer Responsibility
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  Customers are responsible for providing complete and accurate names, passport details, dates of birth, travel dates and other information required for their booking.
                </p>
                <p>
                  Customers should carefully verify all tickets, vouchers, hotel confirmations, itineraries and other travel documents immediately after receiving them.
                </p>
                <p>
                  Any discrepancy should be reported to MTPL without delay.
                </p>
                <p>
                  MTPL shall not be responsible for losses arising from incorrect or incomplete information provided or approved by the customer.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="section-13" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  13
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Force Majeure</span>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL shall not be liable for delay, cancellation, disruption or loss caused by circumstances beyond reasonable control, including but not limited to natural disasters, extreme weather, floods, earthquakes, epidemic or pandemic, war, terrorism, political unrest, strikes, government restrictions, border closures, airspace restrictions, technical failures, transport disruption or supplier failures.
                </p>
                <p>
                  Where reasonably possible, MTPL will assist customers with available alternatives, subject to additional costs and supplier rules.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section id="section-14" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  14
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Website Information
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  MTPL makes reasonable efforts to keep information on this website accurate and updated.
                </p>
                <p>
                  However, travel information, entry requirements, schedules, rates, supplier policies and government regulations may change without notice.
                </p>
                <p>
                  MTPL does not warrant that all information appearing on this website will always be complete, accurate or current.
                </p>
                <p>
                  Customers should reconfirm material information before making travel decisions or payments.
                </p>
              </div>
            </section>

            {/* Section 15 */}
            <section id="section-15" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  15
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>External Websites &amp; Links</span>
                  <ExternalLink className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  This website may contain links to third-party websites. Such links are provided for convenience only. MTPL does not control and is not responsible for the content, security, accuracy, privacy practices or services offered by third-party websites.
                </p>
              </div>
            </section>

            {/* Section 16 */}
            <section id="section-16" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  16
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Limitation of Liability
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  To the fullest extent permitted by applicable law, MTPL&apos;s responsibility is limited to providing reasonable travel booking and facilitation services based on the instructions received from the customer.
                </p>
                <p>
                  MTPL shall not be liable for indirect, incidental or consequential losses arising from circumstances outside MTPL&apos;s reasonable control or from the acts or omissions of third-party service providers.
                </p>
                <p>
                  Nothing contained in this disclaimer is intended to exclude or restrict any liability or consumer right that cannot legally be excluded under applicable Indian law.
                </p>
              </div>
            </section>

            {/* Section 17 */}
            <section id="section-17" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  17
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  Terms &amp; Conditions
                </h3>
              </div>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  Every booking made through MTPL is additionally subject to:
                </p>
                <ul className="space-y-2 my-3 pl-2 sm:pl-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>MTPL General Booking Policy &amp; Terms of Service</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Service-specific terms communicated with the quotation or booking</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Airline fare rules</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Hotel/supplier cancellation policies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Visa and government authority requirements</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span>Other applicable supplier conditions</span>
                  </li>
                </ul>
                <p>
                  In case of any inconsistency, the specific written booking conditions applicable to the concerned service shall prevail.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/terms-and-conditions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                  >
                    <span>Read MTPL Terms &amp; Conditions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-slate-300">&bull;</span>
                  <Link
                    href="/booking-policy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                  >
                    <span>Read Booking Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 18 */}
            <section id="section-18" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  18
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Governing Law &amp; Jurisdiction</span>
                  <Scale className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  This website and the services offered by MTPL shall be governed by the laws of India.
                </p>
                <p>
                  Subject to any mandatory jurisdiction provided under applicable law, disputes shall be subject to the jurisdiction of the competent courts/tribunals at Nagpur, Maharashtra, India.
                </p>
              </div>
            </section>

            {/* Section 19 */}
            <section id="section-19" className="scroll-mt-32 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#91D7B0] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-base flex-shrink-0">
                  19
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <span>Acceptance</span>
                  <CheckCircle2 className="w-5 h-5 text-brand" />
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 pl-0 sm:pl-13">
                <p>
                  By using this website, submitting an enquiry, making a payment or confirming a booking through MTPL, you acknowledge that you have read and understood this Disclaimer and agree to the applicable booking terms and supplier conditions.
                </p>
              </div>
            </section>

            {/* Concluding Registered Entity & Contact Information Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#073B2D] to-[#0D5C46] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#91D7B0]">
                    Registered Travel Organization
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans mt-1">
                    Mishrikotkar Travels Pvt. Ltd. (MTPL)
                  </h3>
                  <p className="text-sm text-[#EEF8F3]/80 mt-1">
                    Dharampeth, Nagpur - 440010, Maharashtra, India
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/15 text-sm text-[#EEF8F3]/90">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mishrikotkar+Travels+Dharampeth+Nagpur+440010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                  >
                    <MapPin className="w-5 h-5 text-[#91D7B0] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#91D7B0] block font-semibold">Registered Office</span>
                      <span>Dharampeth, Nagpur – 440010, Maharashtra, India</span>
                    </div>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phones.primary.replace(/\s+/g, "")}`}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                  >
                    <Phone className="w-5 h-5 text-[#91D7B0] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#91D7B0] block font-semibold">Customer Care</span>
                      <span>{siteConfig.contact.phones.primary} / {siteConfig.contact.phones.alternate}</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                  >
                    <Mail className="w-5 h-5 text-[#91D7B0] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#91D7B0] block font-semibold">Email Enquiries</span>
                      <span>{siteConfig.contact.email}</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-[#91D7B0] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-[#91D7B0] block font-semibold">Accreditations</span>
                      <span>IATA Code: {siteConfig.credentials.iataNumber} | GST: {siteConfig.credentials.gst}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#EEF8F3]/60 flex flex-wrap items-center justify-between gap-3">
                  <span>&copy; {new Date().getFullYear()} Mishrikotkar Travels Pvt. Ltd. All rights reserved.</span>
                  <div className="flex gap-4">
                    <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                      Terms &amp; Conditions
                    </Link>
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Container>
    </div>
  )
}

import * as React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { FileText, ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "General Booking Policy & Terms of Service | Mishrikotkar Travels",
  description: "Comprehensive booking terms and service policy for air ticketing, hotels, safaris, and travel assistance by MTPL.",
  alternates: {
    canonical: `${siteConfig.url}/booking-policy`,
  },
}

export default function BookingPolicyPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Editorial Hero Header */}
      <div className="bg-[#073B2D] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/header-about.jpg"
            alt="General Booking Policy Background"
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
            <FileText className="w-3.5 h-3.5 text-[#91D7B0]" />
            Authoritative Booking Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
            General Booking Policy &amp; Terms of Service
          </h1>
          <p className="text-sm md:text-base text-[#EEF8F3]/85 font-light mt-3 max-w-2xl mx-auto">
            Governing air tickets, hotels, holidays, jungle safaris, luxury stays, visa guidance, and allied travel assistance.
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-10 text-slate-700 leading-relaxed font-normal text-sm md:text-base">
          <div>
            <Link 
              href="/terms-and-conditions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#16A765] hover:text-[#0F5A40] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website Terms &amp; Conditions
            </Link>
            
            <div className="bg-[#E8F5ED] p-6 rounded-2xl border border-[#D0E7D9] mb-8">
              <h3 className="text-base font-bold text-[#123D2E] mb-2 font-sans">
                Notice of Intermediary Role
              </h3>
              <p className="text-sm text-[#265344] leading-relaxed">
                Mishrikotkar Travels Pvt. Ltd. (MTPL) primarily acts as a booking facilitator and intermediary for third-party travel and allied services. Actual performance of flights, accommodation, transport, wildlife safaris, visa issuance decisions, passport approvals, foreign exchange conversion, and insurance underwriting is strictly controlled by the respective independent service providers or competent statutory authorities.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              1. Scope of Services
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Domestic and international air ticketing, including fare selection, ancillary requests, reissues, cancellation assistance, and refund facilitation.</li>
              <li>Domestic and international hotel and resort bookings, including luxury stays, villas, service apartments, and special-request accommodations.</li>
              <li>Domestic and international holiday packages, FIT/GIT arrangements, sightseeing tours, transfers, cruises, rail bookings, and destination services.</li>
              <li>Jungle safari and wildlife bookings, including entry permits, safari gypsies/canters, authorized guides, and associated ground transfers.</li>
              <li>Visa facilitation and documentation guidance, passport application assistance, forex assistance through authorized channels, and travel insurance facilitation.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              2. Role of MTPL and Third-Party Suppliers
            </h2>
            <p>
              Unless expressly stated otherwise in writing, MTPL does not own, operate, or control airlines, hotels, resorts, destination management companies (DMCs), transporters, safari authorities, consulates, visa application centres, government departments, insurers, banks, or authorized money changers. Each service is governed by the supplier&apos;s own fare rules, cancellation policies, check-in requirements, and operational decisions. MTPL exercises reasonable professional care in selecting and communicating bookings but cannot guarantee third-party performance, punctuality, safety, or solvency.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              3. Quotations, Availability and Booking Confirmation
            </h2>
            <p>
              All quotations, whether communicated via email, WhatsApp, or formal proposal, are indicative and subject to real-time seat, room, and permit availability at the time of actual booking. A quotation or preliminary message does not block inventory unless MTPL expressly confirms that a provisional hold has been established. A booking is treated as confirmed only after the agreed payment is received in cleared funds and MTPL or the relevant supplier issues a formal confirmation, ticket, voucher, PNR, or official permit.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              4. Client Details, Names and Documents
            </h2>
            <p>
              Clients must provide complete and accurate passenger names exactly as they appear on passports or government-issued photo IDs, along with accurate dates of birth, nationality, and contact details. Clients are obligated to verify all tickets, vouchers, room categories, and itinerary details immediately upon receipt. Any name correction, ticket reissue, or re-booking cost arising from inaccurate details provided or approved by the client shall be borne entirely by the client.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              5. Payments, Taxes, Service Charges and Currency
            </h2>
            <p>
              Payments must be remitted by the deadlines specified by MTPL to prevent automated supplier cancellation or fare hikes. MTPL professional consultation, planning, and handling charges are separate from third-party supplier charges and, once the service is rendered, are non-refundable to the extent permitted by law. Foreign-currency tariffs converted to INR remain subject to currency exchange fluctuations until final settlement. Mandatory destination levies such as hotel city taxes or resort fees payable locally remain the client&apos;s responsibility.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              6. Cancellations, Amendments, No-Show and Refunds
            </h2>
            <p>
              Cancellation and amendment eligibility is strictly governed by the underlying supplier rules. Non-refundable bookings remain non-refundable. Where a supplier approves and remits a refund, MTPL will pass on the recoverable amount after deducting supplier cancellation charges, non-refundable taxes, banking/gateway costs, and earned MTPL service charges. No refund is granted for no-shows, missed flights, or voluntarily unused travel components.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              7. Jungle Safari and Wildlife Bookings
            </h2>
            <p>
              Safari bookings are governed by the respective State Forest Department rules. Safari permits are non-transferable and strictly name-sensitive. Wildlife sightings, including tiger sightings, can never be guaranteed. Forest authorities reserve the right to alter zones, gates, timings, or cancel safaris for administrative or wildlife protection reasons.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              8. Visa and Passport Facilitation
            </h2>
            <p>
              MTPL operates strictly as a facilitation service. The granting, refusal, duration, and processing time of visas remain within the sovereign discretion of the concerned embassy or immigration authority. Visa application fees and MTPL facilitation charges are non-refundable once documentation has been submitted.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              9. Force Majeure and Limitation of Liability
            </h2>
            <p>
              MTPL shall not be liable for failure, delay, or disruption caused by events beyond reasonable control, including natural disasters, extreme weather, strikes, government directives, border closures, or technical transport failures. To the fullest extent permitted by law, MTPL&apos;s responsibility is limited to exercising reasonable care in booking facilitation and does not extend to indirect or consequential losses.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">
              10. Governing Law and Jurisdiction
            </h2>
            <p>
              This policy is governed by the laws of India. Subject to mandatory consumer protection laws, disputes shall be subject to the jurisdiction of the competent courts in Nagpur, Maharashtra, India.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
            <Link 
              href="/holiday-package-terms"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#16A765] hover:underline"
            >
              <span>View Holiday Tour Package Terms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/disclaimer"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:underline"
            >
              <span>View Website Disclaimer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

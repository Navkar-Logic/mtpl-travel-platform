"use client"

import * as React from "react"
import Link from "next/link"
import {
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Search,
  Scale,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  Users,
} from "lucide-react"

export interface TermsSection {
  id: number
  title: string
  items: {
    label: string
    content: string
  }[]
}

export const HOLIDAY_PACKAGE_TERMS_DATA: TermsSection[] = [
  {
    id: 1,
    title: "1. Booking, Pricing & Payment",
    items: [
      {
        label: "Booking confirmation",
        content:
          "A quotation is indicative until the relevant supplier confirms availability and MTPL receives the amount required for booking. Airfares, hotel rates, taxes, exchange rates and availability may change without notice until ticketing/confirmation.",
      },
      {
        label: "Payment",
        content:
          "The Client must pay amounts by the deadlines communicated by MTPL. Failure or delay may result in automatic cancellation, price increase, loss of availability or supplier penalties, for which MTPL is not responsible.",
      },
      {
        label: "Price revisions",
        content:
          "Any increase in airline taxes, fuel surcharge, statutory tax, foreign exchange rate, resort/city tax, supplier tariff or government levy imposed after quotation but before or during travel shall be payable by the Client unless expressly included in writing.",
      },
      {
        label: "Service charges",
        content:
          "MTPL consultation, planning, processing and service charges are separate from supplier charges and, once the relevant work has been performed, are non-refundable to the extent permitted by applicable law.",
      },
    ],
  },
  {
    id: 2,
    title: "2. Cancellation, Amendment, Refund & Unused Services",
    items: [
      {
        label: "Supplier rules prevail",
        content:
          "Cancellation/amendment/refund eligibility is governed by the fare rules and terms of the relevant supplier. Some services may be fully non-refundable/non-changeable from the moment of confirmation.",
      },
      {
        label: "Refunds",
        content:
          "Where a supplier approves and actually remits a refund, MTPL will pass on the recoverable amount after deduction of supplier penalties, non-refundable taxes/fees, bank/payment charges and MTPL charges already earned or separately agreed. Refund timelines depend on suppliers/banks and are not controlled by MTPL.",
      },
      {
        label: "Unused services",
        content:
          "No refund is due merely because a traveller voluntarily does not use, misses, shortens or abandons any confirmed hotel night, transfer, meal, sightseeing, ticket, excursion or other service. Any supplier-approved exception will be passed through as above.",
      },
      {
        label: "Name/date/route changes",
        content:
          "Changes are subject to supplier permission, availability, fare difference and charges. MTPL cannot guarantee that any requested change will be possible.",
      },
    ],
  },
  {
    id: 3,
    title: "3. Hotels, Rooms, Meals & Special Requests",
    items: [
      {
        label: "Hotel standards",
        content:
          "Star/category standards, room sizes, amenities, photographs, views and facilities differ by country and property. MTPL relies on supplier/property descriptions and does not independently warrant a particular classification or subjective standard.",
      },
      {
        label: "Room allocation",
        content:
          "Specific room number, floor, view, bedding configuration, interconnecting rooms, early check-in, late check-out and upgrades are requests only unless expressly confirmed in writing by the hotel/supplier.",
      },
      {
        label: "Local charges",
        content:
          "Security deposits, tourism/city/resort taxes, minibar, telephone, laundry, parking, damage deposits and other incidentals payable locally are the Client’s responsibility unless specifically included.",
      },
      {
        label: "Meals/dietary needs",
        content:
          "Vegetarian, Jain, allergy-related or other meal requests are conveyed in good faith but remain subject to supplier capability. Travellers with severe allergies or dietary restrictions must independently verify suitability directly with the service provider.",
      },
    ],
  },
  {
    id: 4,
    title: "4. Transport, Flights, Transfers & Baggage",
    items: [
      {
        label: "Airline control",
        content:
          "Flight schedules, aircraft, seats, baggage rules, meals, check-in requirements, delays, cancellations, denied boarding and operational decisions are controlled by the airline, not MTPL. Airline remedies are subject to the carrier’s rules and applicable law.",
      },
      {
        label: "Connections",
        content:
          "Unless MTPL expressly confirms a protected through-ticket, separate tickets/services may not protect onward connections. Any cost arising from a missed connection due to delay, immigration, baggage collection or other causes is borne by the traveller except where recoverable from the responsible supplier.",
      },
      {
        label: "Transfers",
        content:
          "Pickup timings are approximate and may change due to traffic, weather, flight timing, local restrictions or shared-transfer routing. No-show, late reporting or incorrect pickup details supplied by the Client may result in loss of service and additional cost.",
      },
      {
        label: "Baggage",
        content:
          "Baggage remains under the traveller/carrier’s responsibility. MTPL is not a bailee or insurer of baggage and is not liable for delay, loss, theft or damage caused by airlines, hotels, transporters or other third parties.",
      },
    ],
  },
  {
    id: 5,
    title: "5. Passports, Visas, Immigration & Entry Requirements",
    items: [
      {
        label: "Traveller responsibility",
        content:
          "Each traveller must hold a valid passport, visa, permits, return/onward ticket, sufficient funds, vaccination/health documents and any other entry/transit requirements applicable to nationality, age, routing and destination.",
      },
      {
        label: "Visa facilitation only",
        content:
          "If MTPL assists with a visa, MTPL acts only as a facilitator. Grant/refusal, validity, processing time, additional-document requests and immigration decisions are solely with the relevant authority. Visa refusal/delay does not automatically create a right to refund other booked travel services.",
      },
      {
        label: "Immigration discretion",
        content:
          "Possession of a visa does not guarantee entry. Border/immigration authorities may refuse entry, shorten stay, detain or deport a traveller. Costs arising from such action are the traveller’s responsibility unless legally recoverable from the responsible party.",
      },
    ],
  },
  {
    id: 6,
    title: "6. Itinerary, Sightseeing & Local Operations",
    items: [
      {
        label: "Operational changes",
        content:
          "Timings, sequence, routes, attractions, guides, vehicles and hotels may be altered due to weather, closures, traffic, safety, local regulations, strikes, supplier operations or other circumstances. Comparable alternatives may be offered where reasonably possible.",
      },
      {
        label: "Attraction closures",
        content:
          "Opening days/hours can change and attractions may close without notice. MTPL does not guarantee that every listed attraction will be accessible where closure is outside MTPL’s control.",
      },
      {
        label: "Optional activities",
        content:
          "Adventure sports, water activities, rides, safaris, skiing, paragliding and other optional activities are undertaken voluntarily and subject to operator rules, age/fitness requirements, waivers, weather and availability. The traveller assumes the inherent risks of participation.",
      },
    ],
  },
  {
    id: 7,
    title: "7. Health, Safety, Conduct & Local Laws",
    items: [
      {
        label: "Fitness to travel",
        content:
          "Travellers are responsible for assessing their physical fitness, mobility, pregnancy-related restrictions, medication and medical needs, and for obtaining medical advice where appropriate. MTPL does not provide medical advice or medical supervision.",
      },
      {
        label: "Insurance",
        content:
          "Comprehensive travel insurance covering medical expenses, evacuation/repatriation, cancellation, curtailment, baggage and personal liability is strongly recommended and may be mandatory for certain destinations. Unless expressly included, insurance is not part of the package.",
      },
      {
        label: "Conduct/local laws",
        content:
          "Travellers must comply with destination laws, customs, hotel/airline rules and reasonable instructions of suppliers. Fines, damages, removal from a service, arrest or loss caused by a traveller’s conduct are the traveller’s responsibility.",
      },
    ],
  },
  {
    id: 8,
    title: "8. Independent Suppliers & Third-Party Responsibility",
    items: [
      {
        label: "Intermediary role",
        content:
          "Hotels, airlines, transporters, DMCs, guides, cruise lines, attractions, online booking platforms and other providers are independent contractors and are not employees or agents under MTPL’s operational control.",
      },
      {
        label: "Third-party acts",
        content:
          "To the fullest extent permitted by applicable law, MTPL is not liable for acts, omissions, insolvency, service failures, accidents, overbooking, strikes, negligence or misconduct of independent suppliers, except to the extent liability is directly caused by MTPL’s own proven breach of a legal duty that cannot lawfully be excluded.",
      },
      {
        label: "Supplier terms",
        content:
          "The Client is also bound by applicable supplier fare rules, hotel policies, ticket conditions, waivers and terms. MTPL may provide copies/links where available, but supplier terms may change independently.",
      },
    ],
  },
  {
    id: 9,
    title: "9. Force Majeure & Events Beyond Control",
    items: [
      {
        label: "Force majeure",
        content:
          "MTPL is not responsible for failure, delay or additional cost caused by events beyond reasonable control, including natural disaster, extreme weather, epidemic/pandemic, war, terrorism, civil unrest, government action, border closure, visa/immigration action, strike, transport disruption, technical failure, fire, flood or similar events.",
      },
      {
        label: "Additional costs",
        content:
          "Accommodation, meals, rerouting, new tickets, extended stay or other expenses arising from such events are payable by the Client unless covered by insurance or recovered from the relevant supplier. MTPL will reasonably assist with re-arrangements on a chargeable basis where applicable.",
      },
    ],
  },
  {
    id: 10,
    title: "10. Client Information, Communication & Booking Approval",
    items: [
      {
        label: "Accuracy",
        content:
          "The Client must verify names exactly as per passport/ID, dates, routing, rooming, inclusions and all booking details before approval. Costs caused by incorrect/incomplete information supplied or approved by the Client are the Client’s responsibility.",
      },
      {
        label: "Special needs",
        content:
          "Mobility assistance, wheelchair, infant, medical, dietary or other special requirements must be disclosed in advance. MTPL will relay requests but cannot guarantee fulfilment unless the supplier confirms them.",
      },
      {
        label: "Electronic approvals",
        content:
          "Instructions/approvals sent from the Client’s registered email, WhatsApp number or other usual communication channel may be relied upon by MTPL for booking and payment action. “OK”, “GO AHEAD”, “CONFIRM” or equivalent clear approval may be treated as acceptance of the quoted services and applicable terms.",
      },
    ],
  },
  {
    id: 11,
    title: "11. Financial Loss, Chargebacks & Consequential Loss",
    items: [
      {
        label: "Non-refundable commitments",
        content:
          "The Client acknowledges that MTPL may, upon approval, immediately commit funds to non-refundable or penalty-bearing services. A later change of mind does not reverse supplier commitments.",
      },
      {
        label: "Chargebacks",
        content:
          "The Client shall not initiate an unjustified payment dispute/chargeback for services properly booked in accordance with the Client’s approval. This does not restrict any statutory right to dispute genuinely unauthorised or deficient transactions.",
      },
      {
        label: "Consequential loss",
        content:
          "To the fullest extent permitted by law, MTPL is not liable for indirect, special or consequential loss such as loss of business, income, opportunity, enjoyment or independently booked arrangements arising from supplier disruption or events outside MTPL’s control.",
      },
    ],
  },
  {
    id: 12,
    title: "12. Limitation of MTPL Liability & Indemnity",
    items: [
      {
        label: "Liability cap",
        content:
          "Where MTPL is legally found liable for a direct loss arising solely from MTPL’s own proven breach, and where such liability may lawfully be limited, MTPL’s aggregate liability shall not exceed the service/consultancy charges actually paid to MTPL for the affected booking, excluding amounts collected and passed to third-party suppliers. This limitation does not apply where applicable law prohibits limitation.",
      },
      {
        label: "Client indemnity",
        content:
          "The Client agrees, to the extent permitted by law, to indemnify and hold MTPL, its directors and employees harmless from third-party claims, penalties, losses and expenses arising from false/incomplete information supplied by a traveller, breach of law or supplier rules by a traveller, damage caused by a traveller, or unauthorised acts/instructions attributable to the Client/travelling party.",
      },
    ],
  },
  {
    id: 13,
    title: "13. Complaints & Assistance During Travel",
    items: [
      {
        label: "Immediate reporting",
        content:
          "Any service issue should be reported immediately to the hotel/operator and MTPL while the traveller is at destination so that a reasonable opportunity is available to assist or seek rectification. Failure to report promptly may affect the ability to obtain a supplier remedy.",
      },
      {
        label: "Evidence",
        content:
          "The Client should retain photographs, receipts, written correspondence and supplier reports relating to any claim. MTPL will assist in forwarding genuine claims but cannot guarantee the supplier’s decision or compensation.",
      },
    ],
  },
  {
    id: 14,
    title: "14. Governing Law, Dispute Resolution & Severability",
    items: [
      {
        label: "Governing law/jurisdiction",
        content:
          "This Agreement is governed by the laws of India. Subject to any mandatory consumer forum or statutory jurisdiction that cannot be excluded, courts at Nagpur, Maharashtra shall have jurisdiction.",
      },
      {
        label: "Arbitration",
        content:
          "Where legally permissible and mutually applicable, disputes not resolved amicably may be referred to a sole arbitrator appointed by mutual consent under the Arbitration and Conciliation Act, 1996 (as amended). The seat and venue shall be Nagpur and proceedings shall be in English.",
      },
      {
        label: "Severability",
        content:
          "If any provision is held invalid or unenforceable, the remaining provisions will continue in effect. Nothing in this document excludes rights or liabilities that cannot lawfully be excluded under applicable law.",
      },
    ],
  },
  {
    id: 15,
    title: "15. Entire Understanding & Acceptance",
    items: [
      {
        label: "Booking-specific terms",
        content:
          "The final quotation/itinerary/invoice, ticket or voucher and any written special condition issued for the booking form part of this Agreement. If a booking-specific supplier condition conflicts with a general term here, the supplier condition will govern that particular service to the extent applicable.",
      },
      {
        label: "No oral variation",
        content:
          "Any material promise, waiver or variation must be confirmed in writing by MTPL. Informal statements by third parties or assumptions not recorded in the quotation/confirmation do not bind MTPL.",
      },
    ],
  },
]

interface HolidayPackageTermsSectionProps {
  packageName?: string
  destination?: string
}

export function HolidayPackageTermsSection({
  packageName,
  destination,
}: HolidayPackageTermsSectionProps) {
  // By default, open first 3 clauses for rich visibility, rest collapsible
  const [openSections, setOpenSections] = React.useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  })
  const [searchQuery, setSearchQuery] = React.useState("")

  const toggleSection = (id: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {}
    HOLIDAY_PACKAGE_TERMS_DATA.forEach((sec) => {
      allOpen[sec.id] = true
    })
    setOpenSections(allOpen)
  }

  const collapseAll = () => {
    setOpenSections({})
  }

  // Filter sections if search query is provided
  const filteredSections = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return HOLIDAY_PACKAGE_TERMS_DATA
    return HOLIDAY_PACKAGE_TERMS_DATA.filter((sec) => {
      if (sec.title.toLowerCase().includes(q)) return true
      return sec.items.some(
        (it) =>
          it.label.toLowerCase().includes(q) || it.content.toLowerCase().includes(q)
      )
    })
  }, [searchQuery])

  return (
    <section
      id="package-terms"
      aria-labelledby="package-terms-heading"
      className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-8"
    >
      {/* Header Block */}
      <div className="space-y-3 pb-6 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-bold tracking-wider uppercase">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            Booking Governance &amp; Legal Terms
          </div>
          <Link
            href="/holiday-package-terms"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark transition-colors"
          >
            Open in Dedicated Page
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <h2
          id="package-terms-heading"
          className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight"
        >
          HOLIDAY TOUR PACKAGE TERMS, CLIENT DECLARATION &amp; LIMITATION OF LIABILITY
        </h2>

        <p className="text-xs md:text-sm text-slate-500 font-medium">
          Please read carefully before confirming your booking.
          {packageName && destination && (
            <span className="block mt-1 text-slate-700 font-semibold">
              Applicable to: {packageName} ({destination})
            </span>
          )}
        </p>
      </div>

      {/* Agreement & Scope Box */}
      <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm md:text-base">
          <FileText className="w-4 h-4 text-brand flex-shrink-0" />
          <span>Agreement &amp; Scope</span>
        </div>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
          These Terms &amp; Conditions govern holiday/tour services arranged or facilitated by Mishrikotkar Travels Pvt. Ltd. (&quot;MTPL&quot;, &quot;Company&quot;, &quot;we/us&quot;) for the client and all travellers covered by the booking (&quot;Client/Traveller&quot;). MTPL primarily acts as a travel facilitator/intermediary and coordinates services supplied by independent airlines, hotels, transporters, destination management companies, cruise lines, sightseeing operators, visa centres and other third-party providers. By paying any amount, authorising a booking, signing this document, or accepting it electronically, the Client confirms acceptance of these terms for the entire travelling party, subject to applicable law.
        </p>
      </div>

      {/* Interactive Controls: Search & Expand/Collapse */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clause (e.g. refund, visa, flights)..."
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Clauses List */}
      <div className="space-y-3.5">
        {filteredSections.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No clauses found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredSections.map((sec) => {
            const isOpen = !!openSections[sec.id] || searchQuery.trim().length > 0
            return (
              <div
                key={sec.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left bg-slate-50/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm md:text-base text-slate-900 font-sans">
                    {sec.title}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 shadow-2xs">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 md:p-6 bg-white space-y-4 border-t border-slate-100">
                    {sec.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                        <div className="text-xs md:text-sm leading-relaxed text-slate-700">
                          <strong className="font-semibold text-slate-900">
                            {item.label}:
                          </strong>{" "}
                          <span>{item.content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Traveller / Family Details Schedule */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm md:text-base">
            <Users className="w-4 h-4 text-brand flex-shrink-0" />
            <span>TRAVELLER / FAMILY DETAILS SCHEDULE</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200">
            Official Booking Schedule
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Standard execution schedule applicable to all travellers covered under this booking:
        </p>
        <div className="overflow-x-auto rounded-xl border-2 border-slate-300 bg-white shadow-2xs custom-table-scrollbar">
          <table className="w-full border-collapse text-left text-xs text-slate-700">
            <thead className="bg-slate-100 border-b-2 border-slate-300 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3 w-16 text-center border-r border-slate-300">Sr. No.</th>
                <th className="py-3 px-4 border-r border-slate-300">Traveller Name (as per Passport/ID)</th>
                <th className="py-3 px-4 border-r border-slate-300">Passport / ID No.</th>
                <th className="py-3 px-4">Relationship to Signatory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[1, 2, 3, 4, 5].map((num) => (
                <tr key={num} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 text-center text-slate-500 font-mono font-bold bg-slate-50/60 border-r border-slate-200">{num}</td>
                  <td className="py-2.5 px-4 text-slate-400 italic border-r border-slate-200">As recorded on booking voucher / ticket</td>
                  <td className="py-2.5 px-4 text-slate-400 italic border-r border-slate-200">As verified for immigration / airline</td>
                  <td className="py-2.5 px-4 text-slate-400 italic">Self / Spouse / Child / Dependent / Co-traveller</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Family Head / Primary Client Authority & Declaration Block */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-sm md:text-base">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <span>FAMILY HEAD / PRIMARY CLIENT AUTHORITY &amp; DECLARATION</span>
        </div>

        <div className="space-y-3 text-xs md:text-sm text-amber-950/90 leading-relaxed">
          <p>
            I, the undersigned, confirm that I have read and understood these Terms &amp; Conditions and accept them for myself. I further confirm that I am the Primary Client / Family Head / authorised representative for the travellers listed above. I have communicated these terms to all adult travellers and am authorised by them to accept the booking and these terms on their behalf; for minor travellers, I sign as parent/legal guardian or authorised responsible adult. Accordingly, this acceptance is intended to bind all listed travellers to the extent permitted by applicable law. I accept responsibility for ensuring that all travellers comply with the requirements stated herein.
          </p>
          <p>
            I understand that MTPL is a facilitator for third-party travel services and cannot guarantee or control the performance or decisions of airlines, hotels, visa/immigration authorities, transporters, attractions or other independent suppliers. I voluntarily authorise MTPL to proceed with the booking on this basis and accept the financial consequences of non-refundable/penalty-bearing services approved by me, subject always to applicable law.
          </p>
        </div>

        {/* Execution & Signing Particulars */}
        <div className="pt-4 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs text-amber-950">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
            <span className="text-amber-800 font-bold block mb-0.5">Signing Capacity:</span>
            <span>For self and on behalf of all travellers/family members listed above</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
            <span className="text-amber-800 font-bold block mb-0.5">Place &amp; Jurisdiction:</span>
            <span>Nagpur, Maharashtra, India</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 sm:col-span-2 lg:col-span-1">
            <span className="text-amber-800 font-bold block mb-0.5">Booking / File Reference:</span>
            <span>Recorded on individual invoice &amp; voucher confirmation</span>
          </div>
        </div>
      </div>

      {/* Electronic Acceptance Notice & Registered Office Details */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 font-semibold">Electronic Acceptance:</strong>{" "}
            If this document is sent electronically, a clear written reply such as &ldquo;OK&rdquo;, &ldquo;GO AHEAD&rdquo;, &ldquo;CONFIRM&rdquo; or equivalent may be retained as evidence of acceptance, subject to applicable law.
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-normal">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
            <span>Mishrikotkar Travels Pvt. Ltd. | 101, Shri Ganesh Apartments, Dharampeth, Nagpur - 440010, Maharashtra, India</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@mishrikotkartravels.com"
              className="inline-flex items-center gap-1 hover:text-brand transition-colors"
            >
              <Mail className="w-3 h-3 text-brand" />
              support@mishrikotkartravels.com
            </a>
            <a
              href="tel:+919325006600"
              className="inline-flex items-center gap-1 hover:text-brand transition-colors"
            >
              <Phone className="w-3 h-3 text-brand" />
              +91 9325006600
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

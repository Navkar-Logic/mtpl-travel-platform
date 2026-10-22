"use client"

import * as React from "react"
import {
  ArrowRightLeft,
  Building2,
  Calendar,
  CreditCard,
  Hotel,
  Info,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  Check,
  Tag,
} from "lucide-react"

export type AccommodationData = {
  headers: string[]
  rows: string[][]
}

export type PackageCostTable = {
  title?: string
  currency?: string
  headers: string[]
  rows: string[][]
}

export type PackageTableData = {
  accommodations: AccommodationData | null
  costTables: PackageCostTable[]
}

interface PackageTablesProps {
  tables: PackageTableData | null
  packageName?: string
}

/**
 * Returns distinct, modern badge pill for category headers (Category A, B, C, Deluxe, etc.)
 */
function renderCategoryHeader(header: string, isHighlighted = false) {
  const normalized = header.toLowerCase()

  if (normalized.includes("category a") || normalized.includes("deluxe") || normalized.includes("luxury")) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-2xs ${
          isHighlighted
            ? "bg-emerald-600 text-white ring-2 ring-emerald-400/50"
            : "bg-emerald-50 text-emerald-900 border border-emerald-200/90 hover:bg-emerald-100/80"
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isHighlighted ? "text-emerald-100" : "text-emerald-600"}`} />
        <span>{header}</span>
        <span className="text-[10px] font-semibold opacity-80 uppercase tracking-wider ml-0.5">Luxury</span>
      </span>
    )
  }

  if (normalized.includes("category b") || normalized.includes("superior") || normalized.includes("deluxe")) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-2xs ${
          isHighlighted
            ? "bg-sky-600 text-white ring-2 ring-sky-400/50"
            : "bg-sky-50 text-sky-900 border border-sky-200/90 hover:bg-sky-100/80"
        }`}
      >
        <Star className={`w-3.5 h-3.5 shrink-0 ${isHighlighted ? "text-sky-100" : "text-sky-600"}`} />
        <span>{header}</span>
        <span className="text-[10px] font-semibold opacity-80 uppercase tracking-wider ml-0.5">Deluxe</span>
      </span>
    )
  }

  if (normalized.includes("category c") || normalized.includes("budget") || normalized.includes("standard") || normalized.includes("economy")) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-2xs ${
          isHighlighted
            ? "bg-amber-600 text-white ring-2 ring-amber-400/50"
            : "bg-amber-50 text-amber-900 border border-amber-200/90 hover:bg-amber-100/80"
        }`}
      >
        <Shield className={`w-3.5 h-3.5 shrink-0 ${isHighlighted ? "text-amber-100" : "text-amber-600"}`} />
        <span>{header}</span>
        <span className="text-[10px] font-semibold opacity-80 uppercase tracking-wider ml-0.5">Standard</span>
      </span>
    )
  }

  if (normalized.includes("category d") || normalized.includes("premium")) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-2xs ${
          isHighlighted
            ? "bg-purple-600 text-white ring-2 ring-purple-400/50"
            : "bg-purple-50 text-purple-900 border border-purple-200/90 hover:bg-purple-100/80"
        }`}
      >
        <Star className={`w-3.5 h-3.5 shrink-0 ${isHighlighted ? "text-purple-100" : "text-purple-600"}`} />
        <span>{header}</span>
      </span>
    )
  }

  return <span className="font-bold text-slate-800 text-xs">{header}</span>
}

/**
 * Format occupancy row label with appropriate icon badge
 */
function formatOccupancyLabel(label: string) {
  const lower = label.toLowerCase()

  if (lower.includes("2 pax") || lower.includes("2pax")) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
          2P
        </span>
        <div>
          <span className="font-bold text-slate-900 text-xs md:text-sm block">{label}</span>
          <span className="text-[10px] text-slate-400 block font-normal">Twin / Double Occupancy</span>
        </div>
      </div>
    )
  }

  if (lower.includes("4 pax") || lower.includes("4pax")) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">
          4P
        </span>
        <div>
          <span className="font-bold text-slate-900 text-xs md:text-sm block">{label}</span>
          <span className="text-[10px] text-slate-400 block font-normal">Small Family / Group Sharing</span>
        </div>
      </div>
    )
  }

  if (lower.includes("6 pax") || lower.includes("6pax")) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0">
          6P
        </span>
        <div>
          <span className="font-bold text-slate-900 text-xs md:text-sm block">{label}</span>
          <span className="text-[10px] text-slate-400 block font-normal">Large Group Travel</span>
        </div>
      </div>
    )
  }

  if (lower.includes("extra") || lower.includes("bed")) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs shrink-0">
          🛏️
        </span>
        <div>
          <span className="font-semibold text-slate-800 text-xs md:text-sm block">{label}</span>
        </div>
      </div>
    )
  }

  if (lower.includes("child")) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs shrink-0">
          👶
        </span>
        <div>
          <span className="font-semibold text-slate-800 text-xs md:text-sm block">{label}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
      <span className="font-semibold text-slate-900 text-xs md:text-sm">{label}</span>
    </div>
  )
}

/**
 * Format price cell with USD or INR
 */
function formatCellPrice(cell: string, isUSD: boolean): string {
  if (!cell) return cell
  const numVal = parseInt(cell.replace(/[^0-9]/g, ""), 10)
  if (isNaN(numVal)) return cell

  if (isUSD) {
    return `USD ${numVal.toLocaleString("en-US")}`
  }

  return `₹${numVal.toLocaleString("en-IN")}`
}

export function PackageTables({ tables, packageName }: PackageTablesProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  if (!tables) return null

  const { accommodations, costTables } = tables
  const hasAccommodations = accommodations && accommodations.rows && accommodations.rows.length > 0
  const hasCosts = costTables && costTables.length > 0 && costTables.some((t) => t.rows && t.rows.length > 0)

  if (!hasAccommodations && !hasCosts) return null

  // Detect if package is denominated in USD (e.g. Sri Lanka and other USD international tours)
  const isUSD =
    Boolean(
      costTables?.some(
        (t) =>
          t.currency?.toUpperCase() === "USD" ||
          t.title?.toUpperCase().includes("USD") ||
          t.headers?.some((h) => h?.toUpperCase().includes("USD"))
      )
    ) ||
    Boolean(
      costTables?.some((t) =>
        t.rows?.some((r) =>
          r.some(
            (c) =>
              c &&
              (c.includes("$") ||
                c.toUpperCase().includes("USD") ||
                c.toUpperCase().includes("IN USD"))
          )
        )
      )
    ) ||
    (packageName ? /sri\s*lanka/i.test(packageName) : false)

  const minThreshold = isUSD ? 50 : 1000

  // Find lowest price specifically for 2 Pax / 2 Persons, as well as overall group
  let lowest2PaxPrice = Infinity
  let lowestOverallPrice = Infinity

  if (hasCosts) {
    costTables.forEach((table) => {
      table.rows.forEach((row) => {
        const rowLabel = (row[0] || "").toLowerCase()
        if (rowLabel.includes("child") || rowLabel.includes("without bed") || rowLabel.includes("extra")) return
        const is2Pax =
          rowLabel.includes("2 pax") ||
          rowLabel.includes("2pax") ||
          rowLabel.includes("double") ||
          rowLabel.includes("twin")

        for (let i = 1; i < row.length; i++) {
          const num = parseInt((row[i] || "").replace(/[^0-9]/g, ""), 10)
          if (!isNaN(num) && num >= minThreshold) {
            if (is2Pax && num < lowest2PaxPrice) {
              lowest2PaxPrice = num
            }
            if (num < lowestOverallPrice) {
              lowestOverallPrice = num
            }
          }
        }
      })
    })
  }

  // Extract distinct category headers if available
  const categoryHeaders: string[] = []
  if (hasAccommodations) {
    accommodations.headers.forEach((h) => {
      const lower = h.toLowerCase()
      if (lower.includes("category") || lower.includes("deluxe") || lower.includes("standard") || lower.includes("luxury")) {
        categoryHeaders.push(h)
      }
    })
  }

  return (
    <div id="package-tariff-tables" className="space-y-10 scroll-mt-28">
      {/* 1. ACCOMMODATION OPTIONS TABLE */}
      {hasAccommodations && (
        <section
          aria-labelledby="accommodation-heading"
          className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-6"
        >
          {/* Subtle Corner Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/70 shadow-2xs">
                <Hotel className="w-3.5 h-3.5 text-brand" />
                Hotel Stays &amp; Accommodations
              </div>
              <h2 id="accommodation-heading" className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                Handpicked Accommodations
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-light mt-1">
                Verified partner properties curated across distinct comfort and luxury categories.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/90 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>100% Verified MTPL Partner Hotels</span>
            </div>
          </div>

          {/* Category Guide Pills */}
          {categoryHeaders.length > 0 && (
            <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mr-2">
                <Tag className="w-3.5 h-3.5 text-brand" /> Category Tiers:
              </span>
              {categoryHeaders.map((cat, idx) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCategory(isSelected ? null : cat)}
                    className="focus:outline-hidden cursor-pointer"
                  >
                    {renderCategoryHeader(cat, isSelected)}
                  </button>
                )
              })}
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-brand font-semibold underline hover:text-brand-dark ml-2 cursor-pointer"
                >
                  Clear highlight
                </button>
              )}
            </div>
          )}

          {/* Mobile Swipe Cue */}
          <div className="sm:hidden flex items-center justify-between text-xs text-slate-500 font-medium pb-1">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <ArrowRightLeft className="w-3.5 h-3.5 text-brand" />
              Swipe horizontally to view all hotel categories
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto -mx-2 px-2 pb-2 custom-table-scrollbar">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                <table className="min-w-full border-collapse text-left text-xs md:text-sm">
                  {/* Table Header */}
                  <thead className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-b border-slate-200">
                    <tr>
                      {accommodations.headers.map((header, idx) => {
                        const isCity = header.toLowerCase().includes("city")
                        const isNights = header.toLowerCase().includes("night")
                        const isMeal = header.toLowerCase().includes("meal")
                        const isFirst = idx === 0
                        const isLast = idx === accommodations.headers.length - 1
                        const isHighlighted = selectedCategory === header

                        return (
                          <th
                            key={idx}
                            scope="col"
                            className={`py-4 px-4 font-bold text-slate-800 tracking-wider uppercase text-[11px] md:text-xs transition-colors ${
                              !isLast ? "border-r border-slate-200" : ""
                            } ${isFirst ? "min-w-[120px] md:w-[140px] bg-slate-100/80" : ""} ${
                              isNights ? "w-[90px] md:w-[100px] text-center" : ""
                            } ${isMeal ? "w-[120px] md:w-[130px] text-center" : isFirst ? "" : "min-w-[170px] md:min-w-[190px]"} ${
                              isHighlighted ? "bg-emerald-50/70" : ""
                            }`}
                          >
                            <span className={`flex items-center gap-1.5 ${isNights || isMeal ? "justify-center" : ""}`}>
                              {isCity && <Building2 className="w-3.5 h-3.5 text-brand" />}
                              {isNights && <Calendar className="w-3.5 h-3.5 text-brand" />}
                              {isMeal && <UtensilsCrossed className="w-3.5 h-3.5 text-brand" />}
                              {!isCity && !isNights && !isMeal ? renderCategoryHeader(header, isHighlighted) : header}
                            </span>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {accommodations.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`transition-colors hover:bg-emerald-50/30 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                        }`}
                      >
                        {row.map((cell, cIdx) => {
                          const colHeader = accommodations.headers[cIdx] || ""
                          const lowerHeader = colHeader.toLowerCase()
                          const isCity = lowerHeader.includes("city")
                          const isNights = lowerHeader.includes("night")
                          const isMeal = lowerHeader.includes("meal")
                          const isFirst = cIdx === 0
                          const isLast = cIdx === row.length - 1
                          const isHighlighted = selectedCategory === colHeader

                          // Clean hotel string: replace "/ Similar" or "/ similar" with " (or similar)"
                          const cleanText = cell.replace(/\s*\/\s*similar/gi, " (or similar)")
                          const hotels = cleanText.includes("/") ? cleanText.split(/\s*\/\s*/) : [cleanText]

                          return (
                            <td
                              key={cIdx}
                              className={`py-4 px-4 text-slate-700 align-middle transition-colors ${
                                !isLast ? "border-r border-slate-100" : ""
                              } ${isFirst ? "bg-slate-50/70 font-bold border-r border-slate-200" : ""} ${
                                isNights ? "text-center font-bold" : ""
                              } ${isMeal ? "text-center" : ""} ${isHighlighted ? "bg-emerald-50/40" : ""}`}
                            >
                              {isCity ? (
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-5 bg-brand rounded-full shrink-0" />
                                  <span className="font-bold text-slate-900 font-sans text-xs md:text-sm">
                                    {cell}
                                  </span>
                                </div>
                              ) : isNights ? (
                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
                                  {cell} {cell === "1" ? "Night" : "Nights"}
                                </span>
                              ) : isMeal ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                                  <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-700" />
                                  {cell}
                                </span>
                              ) : (
                                <div className="space-y-1.5 text-xs text-slate-800 font-medium">
                                  {hotels.map((hotel, hIdx) => (
                                    <div key={hIdx} className="flex items-start gap-1.5 leading-snug">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                      <span className="text-slate-800">{hotel.trim()}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 italic leading-relaxed">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p>
              * All hotel accommodations are subject to availability at the time of booking confirmation. If any listed property is unavailable, an equivalent or upgraded hotel in the same category tier will be provided.
            </p>
          </div>
        </section>
      )}

      {/* 2. PACKAGE COST OPTIONS TABLE */}
      {hasCosts && (
        <section
          aria-labelledby="cost-heading"
          className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-6"
        >
          {/* Subtle Corner Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-bl-full pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/70 shadow-2xs">
                <CreditCard className="w-3.5 h-3.5 text-brand" />
                Verified Tariff Matrix
              </div>
              <h2 id="cost-heading" className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                Package Cost &amp; Tariff Breakdown
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-light mt-1">
                {isUSD
                  ? "Rates per person quoted in US Dollars (USD) across occupancy tiers and hotel categories."
                  : "Rates per person quoted in Indian Rupees (INR) across occupancy tiers and hotel categories."}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs self-start sm:self-auto">
              <Check className="w-4 h-4 text-brand" />
              <span>Verified Supplier Rate Matrix</span>
            </div>
          </div>

          {/* Tables Loop */}
          <div className="space-y-8">
            {costTables.map((costTable, tIdx) => {
              if (!costTable.rows || costTable.rows.length === 0) return null

              return (
                <div key={tIdx} className="space-y-3">
                  {costTable.title && (
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-4 bg-brand rounded-full inline-block" />
                        <h3 className="font-bold text-sm md:text-base text-slate-900 font-sans">
                          {costTable.title}
                        </h3>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 uppercase tracking-wider">
                          {costTable.currency || (isUSD ? "USD" : "INR")}
                        </span>
                      </div>

                      {/* Mobile Swipe Indicator */}
                      <span className="sm:hidden text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3 text-brand" /> Swipe
                      </span>
                    </div>
                  )}

                  {/* Responsive Cost Table with Proper Borders & Modern Highlights */}
                  <div className="overflow-x-auto -mx-2 px-2 pb-2 custom-table-scrollbar">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                        <table className="min-w-full border-collapse text-left text-xs md:text-sm">
                          {/* Table Header */}
                          <thead className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-b border-slate-200">
                            <tr>
                              {costTable.headers.map((header, hIdx) => {
                                const isFirstCol = hIdx === 0
                                const isLastCol = hIdx === costTable.headers.length - 1
                                const isHighlighted = selectedCategory === header

                                return (
                                  <th
                                    key={hIdx}
                                    scope="col"
                                    className={`py-4 px-4 font-bold text-slate-800 tracking-wider uppercase text-[11px] md:text-xs transition-colors ${
                                      !isLastCol ? "border-r border-slate-200" : ""
                                    } ${
                                      isFirstCol
                                        ? "min-w-[200px] bg-slate-100/80 border-r border-slate-200"
                                        : "min-w-[150px] text-right"
                                    } ${isHighlighted ? "bg-emerald-50/70" : ""}`}
                                  >
                                    <span className={`flex items-center gap-1.5 ${!isFirstCol ? "justify-end" : ""}`}>
                                      {isFirstCol ? (
                                        <>
                                          <Users className="w-3.5 h-3.5 text-brand" />
                                          <span>{header}</span>
                                        </>
                                      ) : (
                                        renderCategoryHeader(header, isHighlighted)
                                      )}
                                    </span>
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>

                          {/* Table Body */}
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {costTable.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={`transition-colors hover:bg-emerald-50/30 ${
                                  rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                                }`}
                              >
                                {row.map((cell, cIdx) => {
                                  const colHeader = costTable.headers[cIdx] || ""
                                  const isFirstCol = cIdx === 0
                                  const isLastCol = cIdx === row.length - 1
                                  const isHighlighted = selectedCategory === colHeader

                                  const numVal = parseInt(cell.replace(/[^0-9]/g, ""), 10)
                                  const isPrice =
                                    !isFirstCol &&
                                    (cell.startsWith("₹") ||
                                      cell.startsWith("$") ||
                                      cell.toUpperCase().includes("USD") ||
                                      (!isNaN(numVal) && numVal >= minThreshold))

                                  const rowLabel = (row[0] || "").toLowerCase()
                                  const is2PaxRow =
                                    rowLabel.includes("2 pax") ||
                                    rowLabel.includes("2pax") ||
                                    rowLabel.includes("double") ||
                                    rowLabel.includes("twin")

                                  const is2PaxLowestPrice = isPrice && is2PaxRow && numVal === lowest2PaxPrice
                                  const isGroupLowestPrice = isPrice && !is2PaxRow && numVal === lowestOverallPrice

                                  return (
                                    <td
                                      key={cIdx}
                                      className={`py-4 px-4 transition-colors ${
                                        !isLastCol ? "border-r border-slate-100" : ""
                                      } ${
                                        isFirstCol
                                          ? "font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200 text-xs md:text-sm"
                                          : "text-right"
                                      } ${isHighlighted ? "bg-emerald-50/40" : ""} ${
                                        is2PaxLowestPrice ? "bg-emerald-50/90 ring-1 ring-inset ring-emerald-300" : ""
                                      } ${isGroupLowestPrice ? "bg-sky-50/60" : ""}`}
                                    >
                                      {isFirstCol ? (
                                        formatOccupancyLabel(cell)
                                      ) : isPrice ? (
                                        <div className="space-y-0.5">
                                          {is2PaxLowestPrice && (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider shadow-2xs">
                                              <Star className="w-2.5 h-2.5 text-emerald-700" /> 2-Pax Base Rate
                                            </span>
                                          )}
                                          {isGroupLowestPrice && (
                                            <span className="inline-block text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">
                                              Group Rate
                                            </span>
                                          )}
                                          <span
                                            className={`font-bold font-display text-sm md:text-base tracking-tight block ${
                                              is2PaxLowestPrice
                                                ? "text-emerald-900 text-base md:text-lg"
                                                : isGroupLowestPrice
                                                ? "text-sky-900"
                                                : "text-slate-900"
                                            }`}
                                          >
                                            {formatCellPrice(cell, isUSD)}
                                          </span>
                                          <span className="text-[10px] text-slate-400 font-normal block leading-tight">
                                            per person
                                          </span>
                                        </div>
                                      ) : (
                                        <span className="text-slate-600 font-medium text-xs">
                                          {cell}
                                        </span>
                                      )}
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pricing Advisory Footnote */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 flex items-start gap-3 text-xs text-slate-600 leading-relaxed shadow-2xs">
            <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-800">
                Tariff Transparency Note:
              </p>
              <p>
                Rates shown represent published supplier rates from the official package tariff schedule. Final quotations reflect specific travel dates, room availability, and custom vehicle requirements. Peak season surcharges may apply during Diwali, Christmas, New Year, and long holiday weekends.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

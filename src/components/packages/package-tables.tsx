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
 * Helper to determine if a header string represents a category tier
 */
function isCategoryHeader(header: string): boolean {
  if (!header) return false
  const lower = header.toLowerCase()
  return (
    lower.includes("category") ||
    lower.includes("deluxe") ||
    lower.includes("standard") ||
    lower.includes("luxury") ||
    lower.includes("superior") ||
    lower.includes("budget") ||
    lower.includes("premium") ||
    lower.includes("star") ||
    lower.includes("option #")
  )
}

/**
 * Returns distinct, modern, compact badge pill for category headers
 */
function renderCategoryHeader(header: string, isHighlighted = false) {
  const normalized = header.toLowerCase()

  if (normalized.includes("category a") || normalized.includes("luxury")) {
    return (
      <div className="flex flex-col items-center sm:items-start gap-0.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-md font-bold text-[10px] md:text-[10.5px] tracking-wide transition-all shadow-2xs ${
            isHighlighted
              ? "bg-emerald-600 text-white ring-2 ring-emerald-400/50 shadow-xs"
              : "bg-emerald-50 text-emerald-900 border border-emerald-200/90"
          }`}
        >
          <Sparkles className={`w-3 h-3 shrink-0 ${isHighlighted ? "text-emerald-100" : "text-emerald-600"}`} />
          <span className="truncate">{header}</span>
        </span>
        <span
          className={`text-[8.5px] md:text-[9px] font-semibold uppercase tracking-wider px-0.5 ${
            isHighlighted ? "text-emerald-800 font-bold" : "text-emerald-700/70"
          }`}
        >
          Luxury
        </span>
      </div>
    )
  }

  if (normalized.includes("category b") || normalized.includes("deluxe") || normalized.includes("superior")) {
    return (
      <div className="flex flex-col items-center sm:items-start gap-0.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-md font-bold text-[10px] md:text-[10.5px] tracking-wide transition-all shadow-2xs ${
            isHighlighted
              ? "bg-sky-600 text-white ring-2 ring-sky-400/50 shadow-xs"
              : "bg-sky-50 text-sky-900 border border-sky-200/90"
          }`}
        >
          <Star className={`w-3 h-3 shrink-0 ${isHighlighted ? "text-sky-100" : "text-sky-600"}`} />
          <span className="truncate">{header}</span>
        </span>
        <span
          className={`text-[8.5px] md:text-[9px] font-semibold uppercase tracking-wider px-0.5 ${
            isHighlighted ? "text-sky-800 font-bold" : "text-sky-700/70"
          }`}
        >
          Deluxe
        </span>
      </div>
    )
  }

  if (
    normalized.includes("category c") ||
    normalized.includes("budget") ||
    normalized.includes("standard") ||
    normalized.includes("economy")
  ) {
    return (
      <div className="flex flex-col items-center sm:items-start gap-0.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-md font-bold text-[10px] md:text-[10.5px] tracking-wide transition-all shadow-2xs ${
            isHighlighted
              ? "bg-amber-600 text-white ring-2 ring-amber-400/50 shadow-xs"
              : "bg-amber-50 text-amber-900 border border-amber-200/90"
          }`}
        >
          <Shield className={`w-3 h-3 shrink-0 ${isHighlighted ? "text-amber-100" : "text-amber-600"}`} />
          <span className="truncate">{header}</span>
        </span>
        <span
          className={`text-[8.5px] md:text-[9px] font-semibold uppercase tracking-wider px-0.5 ${
            isHighlighted ? "text-amber-800 font-bold" : "text-amber-700/70"
          }`}
        >
          Standard
        </span>
      </div>
    )
  }

  if (normalized.includes("category d") || normalized.includes("premium")) {
    return (
      <div className="flex flex-col items-center sm:items-start gap-0.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-md font-bold text-[10px] md:text-[10.5px] tracking-wide transition-all shadow-2xs ${
            isHighlighted
              ? "bg-purple-600 text-white ring-2 ring-purple-400/50 shadow-xs"
              : "bg-purple-50 text-purple-900 border border-purple-200/90"
          }`}
        >
          <Star className={`w-3 h-3 shrink-0 ${isHighlighted ? "text-purple-100" : "text-purple-600"}`} />
          <span className="truncate">{header}</span>
        </span>
        <span
          className={`text-[8.5px] md:text-[9px] font-semibold uppercase tracking-wider px-0.5 ${
            isHighlighted ? "text-purple-800 font-bold" : "text-purple-700/70"
          }`}
        >
          Premium
        </span>
      </div>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[10px] md:text-[11px] transition-all ${
        isHighlighted
          ? "bg-emerald-600 text-white shadow-xs"
          : "text-slate-800"
      }`}
    >
      <span className="truncate">{header}</span>
    </span>
  )
}

/**
 * Format occupancy row label with compact icon badge and smaller typography
 */
function formatOccupancyLabel(label: string) {
  const lower = label.toLowerCase()

  if (lower.includes("2 pax") || lower.includes("2pax")) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">
          2P
        </span>
        <div className="min-w-0">
          <span className="font-bold text-slate-900 text-[11px] md:text-xs block leading-tight truncate sm:whitespace-normal">
            {label}
          </span>
          <span className="text-[9px] text-slate-400 font-normal leading-tight hidden sm:block mt-0.5">
            Twin / Double Occupancy
          </span>
        </div>
      </div>
    )
  }

  if (lower.includes("4 pax") || lower.includes("4pax")) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[10px] shrink-0">
          4P
        </span>
        <div className="min-w-0">
          <span className="font-bold text-slate-900 text-[11px] md:text-xs block leading-tight truncate sm:whitespace-normal">
            {label}
          </span>
          <span className="text-[9px] text-slate-400 font-normal leading-tight hidden sm:block mt-0.5">
            Family / Group Sharing
          </span>
        </div>
      </div>
    )
  }

  if (lower.includes("6 pax") || lower.includes("6pax")) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-[10px] shrink-0">
          6P
        </span>
        <div className="min-w-0">
          <span className="font-bold text-slate-900 text-[11px] md:text-xs block leading-tight truncate sm:whitespace-normal">
            {label}
          </span>
          <span className="text-[9px] text-slate-400 font-normal leading-tight hidden sm:block mt-0.5">
            Large Group Travel
          </span>
        </div>
      </div>
    )
  }

  if (lower.includes("extra") || lower.includes("bed")) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] shrink-0">
          🛏️
        </span>
        <div className="min-w-0">
          <span className="font-semibold text-slate-800 text-[11px] md:text-xs block leading-tight">
            {label}
          </span>
        </div>
      </div>
    )
  }

  if (lower.includes("child")) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] shrink-0">
          👶
        </span>
        <div className="min-w-0">
          <span className="font-semibold text-slate-800 text-[11px] md:text-xs block leading-tight">
            {label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
      <span className="font-semibold text-slate-900 text-[11px] md:text-xs leading-tight">{label}</span>
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
  // Selected category from pills or category headers (e.g. "Category A", "Category B")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  // Pinned column in accommodation table (by click)
  const [pinnedAccCol, setPinnedAccCol] = React.useState<number | null>(null)

  // Pinned column in cost tables (by click)
  const [pinnedCostCol, setPinnedCostCol] = React.useState<{ tableIdx: number; colIdx: number } | null>(null)

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
  const seenHeaders = new Set<string>()

  if (hasAccommodations) {
    accommodations.headers.forEach((h) => {
      if (isCategoryHeader(h) && !seenHeaders.has(h.toLowerCase())) {
        seenHeaders.add(h.toLowerCase())
        categoryHeaders.push(h)
      }
    })
  }

  if (hasCosts) {
    costTables.forEach((t) => {
      t.headers.forEach((h, hIdx) => {
        if (hIdx > 0 && isCategoryHeader(h) && !seenHeaders.has(h.toLowerCase())) {
          seenHeaders.add(h.toLowerCase())
          categoryHeaders.push(h)
        }
      })
    })
  }

  // Header matching helper for category correlation across tables
  const isCategoryMatch = (h1?: string | null, h2?: string | null) => {
    if (!h1 || !h2) return false
    const s1 = h1.toLowerCase().trim()
    const s2 = h2.toLowerCase().trim()
    return s1 === s2 || s1.includes(s2) || s2.includes(s1)
  }

  // Check if accommodation column is highlighted (only via click/pin, no hover)
  const isAccColHighlighted = (colIdx: number, header: string) => {
    if (pinnedAccCol === colIdx) return true
    if (selectedCategory && isCategoryMatch(header, selectedCategory)) return true
    if (pinnedCostCol !== null) {
      const costTable = costTables[pinnedCostCol.tableIdx]
      const costHeader = costTable?.headers[pinnedCostCol.colIdx]
      if (costHeader && isCategoryHeader(costHeader) && isCategoryMatch(header, costHeader)) {
        return true
      }
    }
    return false
  }

  // Check if cost table column is highlighted (only via click/pin, no hover)
  const isCostColHighlighted = (tableIdx: number, colIdx: number, header: string) => {
    if (pinnedCostCol?.tableIdx === tableIdx && pinnedCostCol?.colIdx === colIdx) return true
    if (selectedCategory && isCategoryMatch(header, selectedCategory)) return true
    if (pinnedAccCol !== null && accommodations) {
      const accHeader = accommodations.headers[pinnedAccCol]
      if (accHeader && isCategoryHeader(accHeader) && isCategoryMatch(header, accHeader)) {
        return true
      }
    }
    return false
  }

  // Handle clicking column header in accommodation table
  const handleAccColClick = (idx: number, header: string) => {
    if (isCategoryHeader(header)) {
      setSelectedCategory((prev) => (prev === header ? null : header))
      setPinnedAccCol(null)
    } else {
      setPinnedAccCol((prev) => (prev === idx ? null : idx))
    }
  }

  // Handle clicking column header in cost table
  const handleCostColClick = (tableIdx: number, colIdx: number, header: string) => {
    if (isCategoryHeader(header)) {
      setSelectedCategory((prev) => (prev === header ? null : header))
      setPinnedCostCol(null)
    } else {
      setPinnedCostCol((prev) =>
        prev?.tableIdx === tableIdx && prev?.colIdx === colIdx ? null : { tableIdx, colIdx }
      )
    }
  }

  const isAnyPinnedOrSelected = Boolean(
    selectedCategory || pinnedAccCol !== null || pinnedCostCol !== null
  )

  const clearAllHighlights = () => {
    setSelectedCategory(null)
    setPinnedAccCol(null)
    setPinnedCostCol(null)
  }

  return (
    <div id="package-tariff-tables" className="space-y-8 scroll-mt-28">
      {/* 1. ACCOMMODATION OPTIONS TABLE */}
      {hasAccommodations && (
        <section
          aria-labelledby="accommodation-heading"
          className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-4"
        >
          {/* Subtle Corner Background Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-emerald-200/70 shadow-2xs">
                <Hotel className="w-3 h-3 text-brand" />
                Hotel Stays &amp; Accommodations
              </div>
              <h2
                id="accommodation-heading"
                className="text-lg md:text-xl font-bold font-sans text-slate-900 tracking-tight"
              >
                Handpicked Accommodations
              </h2>
              <p className="text-slate-500 text-[11px] md:text-xs font-light mt-0.5">
                Verified partner properties curated across distinct comfort and luxury categories.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {categoryHeaders.length > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium mr-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" /> Click column or tier to highlight
                </span>
              )}
              <div className="flex items-center gap-1.5 text-[10.5px] md:text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                <span>100% Verified MTPL Partner Hotels</span>
              </div>
            </div>
          </div>

          {/* Category Guide Pills */}
          {categoryHeaders.length > 0 && (
            <div className="bg-slate-50/80 p-2.5 md:p-3 rounded-xl border border-slate-200/80 flex flex-wrap items-center gap-1.5 md:gap-2">
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 mr-1">
                <Tag className="w-3 h-3 text-brand" /> Category Tiers:
              </span>
              {categoryHeaders.map((cat, idx) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCategory(isSelected ? null : cat)}
                    className="focus:outline-hidden cursor-pointer"
                    title={`Click to highlight ${cat} across both tables`}
                  >
                    {renderCategoryHeader(cat, isSelected)}
                  </button>
                )
              })}
              {isAnyPinnedOrSelected && (
                <button
                  type="button"
                  onClick={clearAllHighlights}
                  className="text-[11px] text-brand hover:text-brand-dark font-semibold underline ml-1.5 cursor-pointer transition-colors"
                >
                  Clear highlight
                </button>
              )}
            </div>
          )}

          {/* Mobile Swipe Cue */}
          <div className="sm:hidden flex items-center justify-between text-[11px] text-slate-500 font-medium pb-0.5">
            <span className="inline-flex items-center gap-1 text-slate-500">
              <ArrowRightLeft className="w-3 h-3 text-brand" />
              Swipe horizontally to view all hotel categories
            </span>
          </div>

          {/* Table Container - Fits 100% on desktop without horizontal scroll */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs bg-white custom-table-scrollbar">
            <table className="w-full border-collapse text-left text-[11px] md:text-xs">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  {accommodations.headers.map((header, idx) => {
                    const lower = header.toLowerCase()
                    const isCity = lower.includes("city")
                    const isNights = lower.includes("night")
                    const isMeal = lower.includes("meal")
                    const isFirst = idx === 0
                    const isLast = idx === accommodations.headers.length - 1
                    const isHighlighted = isAccColHighlighted(idx, header)

                    return (
                      <th
                        key={idx}
                        scope="col"
                        onClick={() => handleAccColClick(idx, header)}
                        title="Click to highlight this column"
                        className={`py-2 px-2 md:py-2.5 md:px-3 font-bold tracking-wider uppercase text-[10px] md:text-[11px] select-none cursor-pointer ${
                          !isLast ? "border-r border-slate-200" : ""
                        } ${
                          isFirst
                            ? "w-[16%] min-w-[75px] md:min-w-[85px]"
                            : isNights
                            ? "w-[10%] min-w-[50px] md:min-w-[60px] text-center"
                            : isMeal
                            ? "w-[12%] min-w-[65px] md:min-w-[75px] text-center"
                            : "min-w-[95px] md:min-w-[110px]"
                        } ${
                          isHighlighted
                            ? "bg-emerald-100/90 text-emerald-950 border-x border-emerald-300/80 shadow-xs ring-1 ring-inset ring-emerald-400/30"
                            : "text-slate-700"
                        }`}
                      >
                        <span
                          className={`flex items-center gap-1 ${
                            isNights || isMeal ? "justify-center" : ""
                          }`}
                        >
                          {isCity && <Building2 className="w-3 h-3 text-brand shrink-0" />}
                          {isNights && <Calendar className="w-3 h-3 text-brand shrink-0" />}
                          {isMeal && <UtensilsCrossed className="w-3 h-3 text-brand shrink-0" />}
                          {!isCity && !isNights && !isMeal
                            ? renderCategoryHeader(header, isHighlighted)
                            : header}
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
                    className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                  >
                    {row.map((cell, cIdx) => {
                      const colHeader = accommodations.headers[cIdx] || ""
                      const lowerHeader = colHeader.toLowerCase()
                      const isCity = lowerHeader.includes("city")
                      const isNights = lowerHeader.includes("night")
                      const isMeal = lowerHeader.includes("meal")
                      const isFirst = cIdx === 0
                      const isLast = cIdx === row.length - 1
                      const isHighlighted = isAccColHighlighted(cIdx, colHeader)

                      // Clean hotel string: replace "/ Similar" or "/ similar" with " (or similar)"
                      const cleanText = cell.replace(/\s*\/\s*similar/gi, " (or similar)")
                      const hotels = cleanText.includes("/") ? cleanText.split(/\s*\/\s*/) : [cleanText]

                      return (
                        <td
                          key={cIdx}
                          className={`py-2 px-2 md:py-2.5 md:px-3 align-middle ${
                            !isLast ? "border-r border-slate-100" : ""
                          } ${
                            isFirst
                              ? isHighlighted
                                ? "bg-emerald-50/90 font-bold border-r border-emerald-300 text-slate-950"
                                : "bg-slate-50/70 font-bold border-r border-slate-200 text-slate-900"
                              : ""
                          } ${isNights ? "text-center font-bold" : ""} ${
                            isMeal ? "text-center" : ""
                          } ${
                            !isFirst && isHighlighted
                              ? "bg-emerald-50/75 border-x border-emerald-300/70 shadow-2xs"
                              : !isFirst
                              ? "text-slate-700"
                              : ""
                          }`}
                        >
                          {isCity ? (
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <span className="w-1.5 h-3.5 bg-brand rounded-full shrink-0" />
                              <span className="font-bold text-slate-900 font-sans text-[11px] md:text-xs leading-tight">
                                {cell}
                              </span>
                            </div>
                          ) : isNights ? (
                            <span
                              className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] md:text-[10.5px] font-bold shadow-2xs ${
                                isHighlighted
                                  ? "bg-emerald-200/80 text-emerald-950 border border-emerald-300"
                                  : "bg-slate-100 text-slate-800 border border-slate-200"
                              }`}
                            >
                              {cell} {cell === "1" ? "Nt" : "Nts"}
                            </span>
                          ) : isMeal ? (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] md:text-[10.5px] font-semibold shadow-2xs ${
                                isHighlighted
                                  ? "bg-emerald-200/80 text-emerald-950 border border-emerald-300"
                                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              }`}
                            >
                              <UtensilsCrossed className="w-3 h-3 text-emerald-700 shrink-0" />
                              <span className="truncate max-w-[80px]">{cell}</span>
                            </span>
                          ) : (
                            <div className="space-y-1 text-[10.5px] md:text-[11px] font-medium leading-tight">
                              {hotels.map((hotel, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-1.5 leading-snug">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${
                                      isHighlighted ? "bg-emerald-700" : "bg-emerald-600"
                                    }`}
                                  />
                                  <span
                                    className={`break-words ${
                                      isHighlighted
                                        ? "text-slate-950 font-semibold"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {hotel.trim()}
                                  </span>
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

          {/* Footnote */}
          <div className="flex items-start gap-1.5 pt-0.5 text-[10.5px] md:text-[11px] text-slate-500 italic leading-relaxed">
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
          className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-4"
        >
          {/* Subtle Corner Background Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand/5 rounded-bl-full pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-emerald-200/70 shadow-2xs">
                <CreditCard className="w-3 h-3 text-brand" />
                Verified Tariff Matrix
              </div>
              <h2
                id="cost-heading"
                className="text-lg md:text-xl font-bold font-sans text-slate-900 tracking-tight"
              >
                Package Cost &amp; Tariff Breakdown
              </h2>
              <p className="text-slate-500 text-[11px] md:text-xs font-light mt-0.5">
                {isUSD
                  ? "Rates per person quoted in US Dollars (USD) across occupancy tiers and hotel categories."
                  : "Rates per person quoted in Indian Rupees (INR) across occupancy tiers and hotel categories."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 text-[10.5px] md:text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-brand" />
                <span>Verified Supplier Rates</span>
              </div>
            </div>
          </div>

          {/* Tables Loop */}
          <div className="space-y-6">
            {costTables.map((costTable, tIdx) => {
              if (!costTable.rows || costTable.rows.length === 0) return null

              return (
                <div key={tIdx} className="space-y-2.5">
                  {costTable.title && (
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-brand rounded-full inline-block" />
                        <h3 className="font-bold text-xs md:text-sm text-slate-900 font-sans">
                          {costTable.title}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 uppercase tracking-wider">
                          {costTable.currency || (isUSD ? "USD" : "INR")}
                        </span>
                      </div>

                      {/* Mobile Swipe Indicator */}
                      <span className="sm:hidden text-[10.5px] text-slate-400 font-medium flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3 text-brand" /> Swipe
                      </span>
                    </div>
                  )}

                  {/* Responsive Cost Table - Fits 100% on desktop without horizontal scroll */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs bg-white custom-table-scrollbar">
                    <table className="w-full border-collapse text-left text-[11px] md:text-xs">
                      {/* Table Header */}
                      <thead className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-b border-slate-200">
                        <tr>
                          {costTable.headers.map((header, hIdx) => {
                            const isFirstCol = hIdx === 0
                            const isLastCol = hIdx === costTable.headers.length - 1
                            const isHighlighted = isCostColHighlighted(tIdx, hIdx, header)

                            return (
                              <th
                                key={hIdx}
                                scope="col"
                                onClick={() => handleCostColClick(tIdx, hIdx, header)}
                                title="Click to highlight this column"
                                className={`py-2 px-2 md:py-2.5 md:px-3 font-bold tracking-wider uppercase text-[10px] md:text-[11px] select-none cursor-pointer ${
                                  !isLastCol ? "border-r border-slate-200" : ""
                                } ${
                                  isFirstCol
                                    ? "w-[26%] min-w-[110px] md:min-w-[125px]"
                                    : "min-w-[85px] md:min-w-[95px] text-right"
                                } ${
                                  isHighlighted
                                    ? "bg-emerald-100/90 text-emerald-950 border-x border-emerald-300/80 shadow-xs ring-1 ring-inset ring-emerald-400/30"
                                    : "text-slate-700"
                                }`}
                              >
                                <span
                                  className={`flex items-center gap-1.5 ${
                                    !isFirstCol ? "justify-end" : ""
                                  }`}
                                >
                                  {isFirstCol ? (
                                    <>
                                      <Users className="w-3 h-3 text-brand shrink-0" />
                                      <span className="truncate">{header}</span>
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
                            className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                          >
                            {row.map((cell, cIdx) => {
                              const colHeader = costTable.headers[cIdx] || ""
                              const isFirstCol = cIdx === 0
                              const isLastCol = cIdx === row.length - 1
                              const isHighlighted = isCostColHighlighted(tIdx, cIdx, colHeader)

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

                              const is2PaxLowestPrice =
                                isPrice && is2PaxRow && numVal === lowest2PaxPrice
                              const isGroupLowestPrice =
                                isPrice && !is2PaxRow && numVal === lowestOverallPrice

                              return (
                                <td
                                  key={cIdx}
                                  className={`py-2 px-2 md:py-2.5 md:px-3 ${
                                    !isLastCol ? "border-r border-slate-100" : ""
                                  } ${
                                    isFirstCol
                                      ? isHighlighted
                                        ? "font-semibold text-slate-950 bg-emerald-50/90 border-r border-emerald-300 text-[11px] md:text-xs"
                                        : "font-semibold text-slate-900 bg-slate-50/70 border-r border-slate-200 text-[11px] md:text-xs"
                                      : "text-right"
                                  } ${
                                    !isFirstCol && isHighlighted
                                      ? "bg-emerald-50/75 border-x border-emerald-300/70 shadow-2xs"
                                      : ""
                                  } ${
                                    !isHighlighted && is2PaxLowestPrice
                                      ? "bg-emerald-50/90 ring-1 ring-inset ring-emerald-300"
                                      : ""
                                  } ${
                                    !isHighlighted && isGroupLowestPrice ? "bg-sky-50/60" : ""
                                  }`}
                                >
                                  {isFirstCol ? (
                                    formatOccupancyLabel(cell)
                                  ) : isPrice ? (
                                    <div className="space-y-0.5">
                                      {is2PaxLowestPrice && (
                                        <span
                                          className={`inline-flex items-center gap-1 text-[8.5px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-0.5 uppercase tracking-wider shadow-2xs ${
                                            isHighlighted
                                              ? "bg-emerald-200 text-emerald-950 border border-emerald-300"
                                              : "bg-emerald-100 text-emerald-900"
                                          }`}
                                        >
                                          <Star className="w-2.5 h-2.5 text-emerald-700 shrink-0" />
                                          <span>Base Rate</span>
                                        </span>
                                      )}
                                      {isGroupLowestPrice && (
                                        <span className="inline-block text-[8.5px] md:text-[9px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded-full mb-0.5 uppercase tracking-wider">
                                          Group Rate
                                        </span>
                                      )}
                                      <span
                                        className={`font-bold font-display tracking-tight block ${
                                          isHighlighted
                                            ? "text-emerald-950 font-extrabold text-xs md:text-sm"
                                            : is2PaxLowestPrice
                                            ? "text-emerald-900 text-xs md:text-[13px] font-bold"
                                            : isGroupLowestPrice
                                            ? "text-sky-900 text-xs md:text-[13px]"
                                            : "text-slate-900 text-[11px] md:text-xs"
                                        }`}
                                      >
                                        {formatCellPrice(cell, isUSD)}
                                      </span>
                                      <span
                                        className={`text-[9px] block leading-none ${
                                          isHighlighted
                                            ? "text-emerald-700/90 font-medium"
                                            : "text-slate-400 font-normal"
                                        }`}
                                      >
                                        per person
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-slate-600 font-medium text-[11px]">
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
              )
            })}
          </div>

          {/* Pricing Advisory Footnote */}
          <div className="bg-slate-50/80 rounded-xl p-3 md:p-3.5 border border-slate-200/90 flex items-start gap-2.5 text-[10.5px] md:text-[11px] text-slate-600 leading-relaxed shadow-2xs">
            <Info className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
            <div className="space-y-0.5">
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

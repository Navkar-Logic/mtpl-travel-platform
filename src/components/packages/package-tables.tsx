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
 * Returns distinct styling badges for category headers (Category A, B, C, Deluxe, etc.)
 */
function renderCategoryHeader(header: string) {
  const normalized = header.toLowerCase()

  if (normalized.includes("category a") || normalized.includes("deluxe")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs tracking-wide">
        <Sparkles className="w-3 h-3 text-emerald-700 shrink-0" />
        {header}
      </span>
    )
  }

  if (normalized.includes("category b") || normalized.includes("superior") || normalized.includes("standard")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-100 text-sky-900 border border-sky-300 font-bold text-xs tracking-wide">
        <Star className="w-3 h-3 text-sky-700 shrink-0" />
        {header}
      </span>
    )
  }

  if (normalized.includes("category c") || normalized.includes("budget") || normalized.includes("economy")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs tracking-wide">
        <Shield className="w-3 h-3 text-amber-700 shrink-0" />
        {header}
      </span>
    )
  }

  if (normalized.includes("category d") || normalized.includes("premium")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-100 text-purple-900 border border-purple-300 font-bold text-xs tracking-wide">
        <Star className="w-3 h-3 text-purple-700 shrink-0" />
        {header}
      </span>
    )
  }

  return <span>{header}</span>
}

export function PackageTables({ tables, packageName }: PackageTablesProps) {
  if (!tables) return null

  const { accommodations, costTables } = tables
  const hasAccommodations = accommodations && accommodations.rows && accommodations.rows.length > 0
  const hasCosts = costTables && costTables.length > 0 && costTables.some(t => t.rows && t.rows.length > 0)

  if (!hasAccommodations && !hasCosts) return null

  return (
    <div className="space-y-12">
      {/* 1. ACCOMMODATION OPTIONS TABLE */}
      {hasAccommodations && (
        <section aria-labelledby="accommodation-heading" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/70">
                <Hotel className="w-3.5 h-3.5 text-brand" />
                Hotel Stays
              </div>
              <h2 id="accommodation-heading" className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                Accommodation Options
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-light mt-1">
                Handpicked hotels curated for this tour across verified category tiers.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-medium bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Verified MTPL Partner Hotels</span>
            </div>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="sm:hidden flex items-center justify-between gap-2 text-xs text-slate-500 font-medium pb-1">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <ArrowRightLeft className="w-3.5 h-3.5 text-brand" />
              Swipe horizontally to view all hotel categories
            </span>
          </div>

          {/* Responsive Table Container with Proper Frame & Borders */}
          <div className="overflow-x-auto -mx-2 px-2 pb-2 custom-table-scrollbar">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-2xl border-2 border-slate-300 shadow-sm bg-white">
                <table className="min-w-full border-collapse text-left text-xs md:text-sm">
                  {/* Table Header */}
                  <thead className="bg-slate-100/95 border-b-2 border-slate-300">
                    <tr>
                      {accommodations.headers.map((header, idx) => {
                        const isCity = header.toLowerCase().includes("city")
                        const isNights = header.toLowerCase().includes("night")
                        const isMeal = header.toLowerCase().includes("meal")
                        const isFirst = idx === 0
                        const isLast = idx === accommodations.headers.length - 1

                        return (
                          <th
                            key={idx}
                            scope="col"
                            className={`py-3.5 px-3 md:px-4 font-bold text-slate-800 tracking-wider uppercase text-[11px] md:text-xs ${
                              !isLast ? "border-r border-slate-300" : ""
                            } ${isFirst ? "border-r-2 border-slate-300 min-w-[110px] md:w-[125px] bg-slate-100" : ""} ${
                              isNights ? "w-[85px] md:w-[90px] text-center" : ""
                            } ${isMeal ? "w-[100px] md:w-[110px] text-center" : isFirst ? "" : "min-w-[155px] md:min-w-[170px]"}`}
                          >
                            <span className={`flex items-center gap-1.5 ${isNights || isMeal ? "justify-center" : ""}`}>
                              {isCity && <Building2 className="w-3.5 h-3.5 text-brand" />}
                              {isNights && <Calendar className="w-3.5 h-3.5 text-brand" />}
                              {isMeal && <UtensilsCrossed className="w-3.5 h-3.5 text-brand" />}
                              {!isCity && !isNights && !isMeal ? renderCategoryHeader(header) : header}
                            </span>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {accommodations.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`transition-colors hover:bg-emerald-50/40 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                        }`}
                      >
                        {row.map((cell, cIdx) => {
                          const colHeader = accommodations.headers[cIdx]?.toLowerCase() || ""
                          const isCity = colHeader.includes("city")
                          const isNights = colHeader.includes("night")
                          const isMeal = colHeader.includes("meal")
                          const isFirst = cIdx === 0
                          const isLast = cIdx === row.length - 1

                          // Clean hotel string: replace "/ Similar" or "/ similar" with " (or similar)" so it doesn't become a standalone bullet
                          const cleanText = cell.replace(/\s*\/\s*similar/gi, " (or similar)")
                          const hotels = cleanText.includes("/") ? cleanText.split(/\s*\/\s*/) : [cleanText]

                          return (
                            <td
                              key={cIdx}
                              className={`py-3.5 px-3 md:px-4 text-slate-700 align-middle ${
                                !isLast ? "border-r border-slate-200" : ""
                              } ${isFirst ? "bg-slate-50/90 font-bold border-r-2 border-slate-300" : ""} ${
                                isNights ? "text-center font-bold" : ""
                              } ${isMeal ? "text-center" : ""}`}
                            >
                              {isCity ? (
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-4 bg-brand rounded-full shrink-0" />
                                  <span className="font-bold text-slate-900 font-sans text-xs md:text-sm">
                                    {cell}
                                  </span>
                                </div>
                              ) : isNights ? (
                                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs">
                                  {cell} {cell === "1" ? "Night" : "Nights"}
                                </span>
                              ) : isMeal ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                                  <UtensilsCrossed className="w-3 h-3 text-emerald-700" />
                                  {cell}
                                </span>
                              ) : (
                                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                                  {hotels.map((hotel, hIdx) => (
                                    <div key={hIdx} className="flex items-start gap-1.5 leading-snug">
                                      {hotels.length > 1 && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                      )}
                                      <span>{hotel}</span>
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
              * All hotel accommodations are subject to availability at the time of final confirmation. In case of non-availability, an equivalent hotel in the same or upgraded category will be provided.
            </p>
          </div>
        </section>
      )}

      {/* 2. PACKAGE COST OPTIONS TABLE */}
      {hasCosts && (
        <section aria-labelledby="cost-heading" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/70">
                <CreditCard className="w-3.5 h-3.5 text-brand" />
                Tariff Breakdown
              </div>
              <h2 id="cost-heading" className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                Package Cost
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-light mt-1">
                Rates per person based on occupancy tiers and hotel category selection.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/70 shadow-2xs self-start sm:self-auto">
              <span>Indicative Base Tariffs</span>
            </div>
          </div>

          {/* Tables Loop */}
          <div className="space-y-6">
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
                        {costTable.currency && (
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 uppercase tracking-wider">
                            {costTable.currency}
                          </span>
                        )}
                      </div>

                      {/* Mobile Swipe Indicator */}
                      <span className="sm:hidden text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3 text-brand" /> Swipe
                      </span>
                    </div>
                  )}

                  {/* Responsive Cost Table with Proper Borders */}
                  <div className="overflow-x-auto -mx-2 px-2 pb-2 custom-table-scrollbar">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden rounded-2xl border-2 border-slate-300 shadow-sm bg-white">
                        <table className="min-w-full border-collapse text-left text-xs md:text-sm">
                          {/* Table Header */}
                          <thead className="bg-slate-100/95 border-b-2 border-slate-300">
                            <tr>
                              {costTable.headers.map((header, hIdx) => {
                                const isFirstCol = hIdx === 0
                                const isLastCol = hIdx === costTable.headers.length - 1

                                return (
                                  <th
                                    key={hIdx}
                                    scope="col"
                                    className={`py-3.5 px-4 font-bold text-slate-800 tracking-wider uppercase text-[11px] md:text-xs ${
                                      !isLastCol ? "border-r border-slate-300" : ""
                                    } ${
                                      isFirstCol
                                        ? "min-w-[190px] bg-slate-100 border-r-2 border-slate-300"
                                        : "min-w-[140px] text-right"
                                    }`}
                                  >
                                    <span className={`flex items-center gap-1.5 ${!isFirstCol ? "justify-end" : ""}`}>
                                      {isFirstCol ? (
                                        <>
                                          <Users className="w-3.5 h-3.5 text-brand" />
                                          {header}
                                        </>
                                      ) : (
                                        renderCategoryHeader(header)
                                      )}
                                    </span>
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>

                          {/* Table Body */}
                          <tbody className="divide-y divide-slate-200 bg-white">
                            {costTable.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={`transition-colors hover:bg-emerald-50/40 ${
                                  rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                                }`}
                              >
                                {row.map((cell, cIdx) => {
                                  const isFirstCol = cIdx === 0
                                  const isLastCol = cIdx === row.length - 1
                                  const isPrice =
                                    !isFirstCol &&
                                    (cell.startsWith("₹") ||
                                      cell.startsWith("$") ||
                                      !isNaN(Number(cell.replace(/,/g, ""))))

                                  return (
                                    <td
                                      key={cIdx}
                                      className={`py-4 px-4 ${
                                        !isLastCol ? "border-r border-slate-200" : ""
                                      } ${
                                        isFirstCol
                                          ? "font-semibold text-slate-900 bg-slate-50/90 border-r-2 border-slate-300 text-xs md:text-sm"
                                          : "text-right"
                                      }`}
                                    >
                                      {isFirstCol ? (
                                        <div className="flex items-center gap-2">
                                          {cell.includes("Pax") && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                                          )}
                                          <span>{cell}</span>
                                        </div>
                                      ) : isPrice ? (
                                        <div>
                                          <span className="text-emerald-800 font-bold font-display text-sm md:text-base tracking-tight block">
                                            {cell}
                                          </span>
                                          {row[0]?.includes("Pax") && (
                                            <span className="text-[10px] text-slate-400 font-normal block leading-tight">
                                              per person
                                            </span>
                                          )}
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
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed shadow-2xs">
            <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <p>
              Tariffs shown are indicative base rates per person based on twin sharing. Final quotation will reflect exact travel dates, airline schedules, seasonal surcharges, and requested custom hotel choices.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

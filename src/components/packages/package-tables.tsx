"use client"

import * as React from "react"
import { Building2, Calendar, CreditCard, Hotel, Info, ShieldCheck, UtensilsCrossed, Users } from "lucide-react"

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
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
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Verified MTPL Partner Hotels</span>
            </div>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto -mx-2 px-2 pb-2">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs md:text-sm">
                  <thead className="bg-slate-50/90">
                    <tr>
                      {accommodations.headers.map((header, idx) => {
                        const isCity = header.toLowerCase().includes("city")
                        const isNights = header.toLowerCase().includes("night")
                        const isMeal = header.toLowerCase().includes("meal")
                        return (
                          <th
                            key={idx}
                            scope="col"
                            className={`py-3.5 px-4 font-bold text-slate-800 tracking-wider uppercase text-[11px] md:text-xs ${
                              isCity ? "min-w-[130px]" : ""
                            } ${isNights ? "w-[90px] text-center" : ""} ${
                              isMeal ? "min-w-[120px] text-center" : "min-w-[180px]"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {isCity && <Building2 className="w-3.5 h-3.5 text-brand" />}
                              {isNights && <Calendar className="w-3.5 h-3.5 text-brand" />}
                              {isMeal && <UtensilsCrossed className="w-3.5 h-3.5 text-brand" />}
                              {header}
                            </span>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {accommodations.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`transition-colors hover:bg-emerald-50/30 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                        }`}
                      >
                        {row.map((cell, cIdx) => {
                          const colHeader = accommodations.headers[cIdx]?.toLowerCase() || ""
                          const isCity = colHeader.includes("city")
                          const isNights = colHeader.includes("night")
                          const isMeal = colHeader.includes("meal")

                          return (
                            <td
                              key={cIdx}
                              className={`py-3.5 px-4 text-slate-700 align-top ${
                                isNights ? "text-center font-bold" : ""
                              } ${isMeal ? "text-center" : ""}`}
                            >
                              {isCity ? (
                                <span className="font-bold text-slate-900 block font-sans">
                                  {cell}
                                </span>
                              ) : isNights ? (
                                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                  {cell} {cell === "1" ? "Night" : "Nights"}
                                </span>
                              ) : isMeal ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                                  {cell}
                                </span>
                              ) : (
                                <div className="text-xs leading-relaxed text-slate-700 whitespace-pre-line font-medium">
                                  {cell}
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
          <p className="text-[11px] text-slate-500 italic leading-relaxed pt-1">
            * All hotel accommodations are subject to availability at the time of final confirmation. In case of non-availability, an equivalent hotel in the same or upgraded category will be provided.
          </p>
        </section>
      )}

      {/* 2. PACKAGE COST OPTIONS TABLE */}
      {hasCosts && (
        <section aria-labelledby="cost-heading" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
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
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60 self-start sm:self-auto">
              <span>Indicative Base Tariffs</span>
            </div>
          </div>

          {/* Tables Loop (handles single or multiple tables e.g. Weekend vs Weekday or Sri Lanka seasons) */}
          <div className="space-y-6">
            {costTables.map((costTable, tIdx) => {
              if (!costTable.rows || costTable.rows.length === 0) return null

              return (
                <div key={tIdx} className="space-y-3">
                  {costTable.title && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="w-1.5 h-4 bg-brand rounded-full inline-block" />
                      <h3 className="font-bold text-sm md:text-base text-slate-900 font-sans">
                        {costTable.title}
                      </h3>
                      {costTable.currency && (
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          ({costTable.currency})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Responsive Cost Table */}
                  <div className="overflow-x-auto -mx-2 px-2 pb-2">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-xs md:text-sm">
                          <thead className="bg-slate-50/90">
                            <tr>
                              {costTable.headers.map((header, hIdx) => {
                                const isFirstCol = hIdx === 0
                                return (
                                  <th
                                    key={hIdx}
                                    scope="col"
                                    className={`py-3.5 px-4 font-bold text-slate-800 tracking-wider uppercase text-[11px] md:text-xs ${
                                      isFirstCol ? "min-w-[180px]" : "min-w-[130px] text-right"
                                    }`}
                                  >
                                    <span className={`flex items-center gap-1.5 ${!isFirstCol ? "justify-end" : ""}`}>
                                      {isFirstCol && <Users className="w-3.5 h-3.5 text-brand" />}
                                      {header}
                                    </span>
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 bg-white">
                            {costTable.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={`transition-colors hover:bg-emerald-50/30 ${
                                  rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                                }`}
                              >
                                {row.map((cell, cIdx) => {
                                  const isFirstCol = cIdx === 0
                                  const isPrice = !isFirstCol && (cell.startsWith("₹") || cell.startsWith("$") || !isNaN(Number(cell.replace(/,/g, ""))))

                                  return (
                                    <td
                                      key={cIdx}
                                      className={`py-3.5 px-4 ${
                                        isFirstCol
                                          ? "font-semibold text-slate-900"
                                          : "text-right font-bold text-brand font-display text-sm md:text-base"
                                      }`}
                                    >
                                      {isFirstCol ? (
                                        <span>{cell}</span>
                                      ) : isPrice ? (
                                        <span className="text-brand font-bold tracking-tight">
                                          {cell}
                                        </span>
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
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
            <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <p>
              Tariffs shown are indicative starting base rates per person based on twin sharing. Final quotation will reflect exact travel dates, airline schedules, seasonal surcharges, and requested custom hotel choices.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

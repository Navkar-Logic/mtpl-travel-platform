import { Package, PackageTableData } from "@/types/package"

export type PackagePriceDetails = {
  hasPrice: boolean
  displayPrice: string
  subtext: string
  startingPrice: number | null
  groupPrice: number | null
  pricingBasis: string
  source: "cost_table" | "numeric_fixed" | "on_request"
}

/**
 * Extracts and calculates the authoritative 2-person lowest price
 * for a package from its cost tables or package metadata.
 */
export function getPackagePriceDetails(
  pkg: Package,
  tables: PackageTableData | null
): PackagePriceDetails {
  // 1. Check if cost tables contain verified 2-person tariff numbers
  if (tables && tables.costTables && tables.costTables.length > 0) {
    let twoPaxMin = Infinity
    let twoPaxCategory = ""
    let groupMin = Infinity
    let groupLabel = ""
    let fallbackMin = Infinity
    let fallbackCategory = ""
    let fallbackLabel = ""

    for (const table of tables.costTables) {
      if (!table.rows || table.rows.length === 0) continue
      const headers = table.headers || []

      for (const row of table.rows) {
        const rowHeader = (row[0] || "").trim()
        const lowerRow = rowHeader.toLowerCase()

        // Exclude supplements (children without bed, infant, extra cot, etc.)
        if (
          lowerRow.includes("without bed") ||
          lowerRow.includes("child without") ||
          lowerRow.includes("infant") ||
          lowerRow.includes("c.n.b")
        ) {
          continue
        }

        const is2Pax =
          lowerRow.includes("2 pax") ||
          lowerRow.includes("2pax") ||
          lowerRow.includes("double") ||
          lowerRow.includes("twin") ||
          lowerRow.includes("2 adult")

        const isGroup =
          lowerRow.includes("4 pax") ||
          lowerRow.includes("4pax") ||
          lowerRow.includes("6 pax") ||
          lowerRow.includes("6pax")

        const isAdultOccupancy =
          is2Pax ||
          isGroup ||
          lowerRow.includes("pax") ||
          lowerRow.includes("person") ||
          lowerRow.includes("sharing") ||
          lowerRow.includes("adult") ||
          lowerRow.includes("standard")

        if (!isAdultOccupancy) continue

        for (let c = 1; c < row.length; c++) {
          const cell = row[c]
          if (!cell) continue

          const num = parseInt(cell.replace(/[^0-9]/g, ""), 10)
          // Realistic holiday package price threshold in INR
          if (!isNaN(num) && num > 1000) {
            // Check 2 Pax specific price
            if (is2Pax && num < twoPaxMin) {
              twoPaxMin = num
              twoPaxCategory = headers[c] || ""
            }

            // Check Group specific price (e.g. 4 Pax)
            if (isGroup && num < groupMin) {
              groupMin = num
              groupLabel = rowHeader
            }

            // Fallback general minimum
            if (num < fallbackMin) {
              fallbackMin = num
              fallbackCategory = headers[c] || ""
              fallbackLabel = rowHeader
            }
          }
        }
      }
    }

    // Prioritize 2 PERSON LOWEST PRICE
    if (twoPaxMin !== Infinity) {
      const formatted = `₹${twoPaxMin.toLocaleString("en-IN")}`
      let subtext = `Per person on 2 Pax sharing`
      if (twoPaxCategory) {
        subtext += ` (${twoPaxCategory})`
      }
      if (groupMin !== Infinity && groupMin < twoPaxMin) {
        subtext += ` • ${groupLabel || "4 Pax"} from ₹${groupMin.toLocaleString("en-IN")}`
      }

      return {
        hasPrice: true,
        displayPrice: formatted,
        subtext: subtext,
        startingPrice: twoPaxMin,
        groupPrice: groupMin !== Infinity ? groupMin : null,
        pricingBasis: "Per Person on 2 Pax Double Sharing",
        source: "cost_table",
      }
    }

    // Fallback if no explicit "2 Pax" row exists but general adult rates exist
    if (fallbackMin !== Infinity) {
      const formatted = `₹${fallbackMin.toLocaleString("en-IN")}`
      let subtext = `Based on ${fallbackLabel}`
      if (fallbackCategory) {
        subtext += ` (${fallbackCategory})`
      }

      return {
        hasPrice: true,
        displayPrice: formatted,
        subtext: subtext,
        startingPrice: fallbackMin,
        groupPrice: null,
        pricingBasis: "Per Person on Twin Sharing",
        source: "cost_table",
      }
    }
  }

  // 2. Fall back to fixed numeric price if verified in package catalogue
  if (pkg.numericPrice && pkg.numericPrice > 0) {
    const formatted = `₹${pkg.numericPrice.toLocaleString("en-IN")}`
    return {
      hasPrice: true,
      displayPrice: formatted,
      subtext: pkg.pricingBasis || "Per person on 2 Pax double sharing",
      startingPrice: pkg.numericPrice,
      groupPrice: null,
      pricingBasis: pkg.pricingBasis || "Standard 2 Pax Tariff",
      source: "numeric_fixed",
    }
  }

  // 3. Fallback for bespoke, quotation-only tours
  return {
    hasPrice: false,
    displayPrice: "Request a Quote",
    subtext: "Personalized tariff tailored to travel dates & group size",
    startingPrice: null,
    groupPrice: null,
    pricingBasis: pkg.pricingBasis || "Customized on Request",
    source: "on_request",
  }
}

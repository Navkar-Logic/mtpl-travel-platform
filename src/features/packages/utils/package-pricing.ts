import { Package, PackageTableData } from "@/types/package"

export type PackagePriceDetails = {
  hasPrice: boolean
  displayPrice: string
  subtext: string
  startingPrice: number | null
  groupPrice: number | null
  pricingBasis: string
  currency: "INR" | "USD"
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
  // Detect if package is quoted in USD (e.g. Sri Lanka and other USD-denominated international tours)
  const isUSD =
    Boolean(
      tables?.costTables?.some(
        (t) =>
          t.currency?.toUpperCase() === "USD" ||
          t.title?.toUpperCase().includes("USD") ||
          t.headers?.some((h) => h?.toUpperCase().includes("USD"))
      )
    ) ||
    Boolean(
      tables?.costTables?.some((t) =>
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
    pkg.slug.includes("sri-lanka") ||
    pkg.slug.includes("srilanka")

  const currencyCode: "INR" | "USD" = isUSD ? "USD" : "INR"
  const currencyPrefix = isUSD ? "USD " : "₹"
  const locale = isUSD ? "en-US" : "en-IN"
  const minThreshold = isUSD ? 50 : 1000

  const formatAmount = (val: number) => {
    return `${currencyPrefix}${val.toLocaleString(locale)}`
  }

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
          // Realistic holiday package price threshold (>= 50 for USD, >= 1000 for INR)
          if (!isNaN(num) && num >= minThreshold) {
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
      const formatted = formatAmount(twoPaxMin)
      let subtext = `Per person on 2 Pax sharing`
      if (twoPaxCategory) {
        subtext += ` (${twoPaxCategory})`
      }
      if (groupMin !== Infinity && groupMin < twoPaxMin) {
        subtext += ` • ${groupLabel || "4 Pax"} from ${formatAmount(groupMin)}`
      }

      return {
        hasPrice: true,
        displayPrice: formatted,
        subtext: subtext,
        startingPrice: twoPaxMin,
        groupPrice: groupMin !== Infinity ? groupMin : null,
        pricingBasis: "Per Person on 2 Pax Double Sharing",
        currency: currencyCode,
        source: "cost_table",
      }
    }

    // Fallback if no explicit "2 Pax" row exists but general adult rates exist
    if (fallbackMin !== Infinity) {
      const formatted = formatAmount(fallbackMin)
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
        currency: currencyCode,
        source: "cost_table",
      }
    }
  }

  // 2. Fall back to fixed numeric price if verified in package catalogue
  if (pkg.numericPrice && pkg.numericPrice > 0) {
    const formatted = formatAmount(pkg.numericPrice)
    return {
      hasPrice: true,
      displayPrice: formatted,
      subtext: pkg.pricingBasis || "Per person on 2 Pax double sharing",
      startingPrice: pkg.numericPrice,
      groupPrice: null,
      pricingBasis: pkg.pricingBasis || "Standard 2 Pax Tariff",
      currency: currencyCode,
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
    currency: currencyCode,
    source: "on_request",
  }
}

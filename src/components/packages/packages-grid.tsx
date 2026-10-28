"use client"

import * as React from "react"
import Image from "next/image"
import { useSearchParams, usePathname } from "next/navigation"
import { Package, PackageCategory } from "@/types/package"
import { PackageCard } from "@/components/packages/package-card"
import { ModernDropdown, DropdownOption } from "@/components/packages/modern-dropdown"
import { getPackageCategory } from "@/features/packages/data/packages"
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Check, 
  Globe2, 
  Compass, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Info
} from "lucide-react"
import { getMediaUrl } from "@/lib/media"

const PAGE_SIZE = 12

export function PackagesGrid({ packages }: { packages: Package[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read initial state from URL query parameters
  const urlCategory = searchParams.get("category")
  const initialCategory: PackageCategory = urlCategory === "international" ? "international" : "national"
  const initialSearch = searchParams.get("search") || ""
  const initialDestination = searchParams.get("destination") || "All"
  const initialDuration = searchParams.get("duration") || "All"
  const initialMinPrice = searchParams.get("minPrice") || ""
  const initialMaxPrice = searchParams.get("maxPrice") || ""
  const initialSort = searchParams.get("sort") || "recommended"
  const initialPage = parseInt(searchParams.get("page") || "1", 10) || 1

  // Filter & Control States
  const [selectedCategory, setSelectedCategory] = React.useState<PackageCategory>(initialCategory)
  const [searchQuery, setSearchQuery] = React.useState(initialSearch)
  const [selectedDestination, setSelectedDestination] = React.useState(initialDestination)
  const [selectedDuration, setSelectedDuration] = React.useState(initialDuration)
  const [minPrice, setMinPrice] = React.useState<string>(initialMinPrice)
  const [maxPrice, setMaxPrice] = React.useState<string>(initialMaxPrice)
  const [selectedSort, setSelectedSort] = React.useState(initialSort)
  const [currentPage, setCurrentPage] = React.useState(initialPage)

  // Mobile drawer state & destination search state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false)
  const [destSearchQuery, setDestSearchQuery] = React.useState("")

  // Top ref for smooth scrolling on pagination/category switch
  const listTopRef = React.useRef<HTMLDivElement>(null)

  // Synchronize state with URL query parameters
  const updateUrlParams = React.useCallback((updates: {
    category?: PackageCategory
    search?: string
    destination?: string
    duration?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    page?: number
  }) => {
    const params = new URLSearchParams()
    const nextCategory = updates.category !== undefined ? updates.category : selectedCategory
    const nextSearch = updates.search !== undefined ? updates.search : searchQuery
    const nextDest = updates.destination !== undefined ? updates.destination : selectedDestination
    const nextDuration = updates.duration !== undefined ? updates.duration : selectedDuration
    const nextMinPrice = updates.minPrice !== undefined ? updates.minPrice : minPrice
    const nextMaxPrice = updates.maxPrice !== undefined ? updates.maxPrice : maxPrice
    const nextSort = updates.sort !== undefined ? updates.sort : selectedSort
    const nextPage = updates.page !== undefined ? updates.page : currentPage

    if (nextCategory) params.set("category", nextCategory)
    if (nextSearch.trim()) params.set("search", nextSearch.trim())
    if (nextDest !== "All") params.set("destination", nextDest)
    if (nextDuration !== "All") params.set("duration", nextDuration)
    if (nextMinPrice.trim()) params.set("minPrice", nextMinPrice.trim())
    if (nextMaxPrice.trim()) params.set("maxPrice", nextMaxPrice.trim())
    if (nextSort !== "recommended") params.set("sort", nextSort)
    if (nextPage > 1) params.set("page", nextPage.toString())

    const newQuery = params.toString()
    const targetUrl = newQuery ? `${pathname}?${newQuery}` : pathname
    window.history.replaceState(null, "", targetUrl)
  }, [pathname, selectedCategory, searchQuery, selectedDestination, selectedDuration, minPrice, maxPrice, selectedSort, currentPage])

  // Split catalogue into National and International pools
  const nationalPackages = React.useMemo(() => {
    return packages.filter((p) => getPackageCategory(p) === "national")
  }, [packages])

  const internationalPackages = React.useMemo(() => {
    return packages.filter((p) => getPackageCategory(p) === "international")
  }, [packages])

  // Active pool based on selected category
  const activePool = selectedCategory === "international" ? internationalPackages : nationalPackages
  const otherPool = selectedCategory === "international" ? nationalPackages : internationalPackages
  const isInternational = selectedCategory === "international"
  const priceSymbol = isInternational ? "$" : "₹"

  // Dynamic Destination options scoped to the active category
  const destinationOptions = React.useMemo(() => {
    const destMap = new Map<string, number>()
    activePool.forEach((p) => {
      destMap.set(p.destination, (destMap.get(p.destination) || 0) + 1)
    })

    const sortedDests = Array.from(destMap.keys()).sort((a, b) => a.localeCompare(b))
    return sortedDests.map((d) => ({
      name: d,
      count: destMap.get(d) || 0,
    }))
  }, [activePool])

  // Filtered destination options for desktop destination search
  const visibleDestinations = React.useMemo(() => {
    if (!destSearchQuery.trim()) return destinationOptions
    const q = destSearchQuery.toLowerCase()
    return destinationOptions.filter((d) => d.name.toLowerCase().includes(q))
  }, [destinationOptions, destSearchQuery])

  // Dynamic Duration counts scoped to the active category
  const durationCounts = React.useMemo(() => {
    return {
      all: activePool.length,
      short: activePool.filter((p) => p.days <= 4).length,
      medium: activePool.filter((p) => p.days >= 5 && p.days <= 7).length,
      long: activePool.filter((p) => p.days >= 8).length,
    }
  }, [activePool])

  // Sort Options for ModernDropdown
  const sortOptions: DropdownOption[] = [
    { label: "Recommended / Featured", value: "recommended" },
    { label: "Package Name: A to Z", value: "name-asc" },
    { label: "Package Name: Z to A", value: "name-desc" },
    { label: "Duration: Shortest first", value: "duration-asc" },
    { label: "Duration: Longest first", value: "duration-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ]

  // Numeric Price Range validation & calculation
  const parsedMinPrice = minPrice.trim() !== "" ? parseFloat(minPrice) : null
  const parsedMaxPrice = maxPrice.trim() !== "" ? parseFloat(maxPrice) : null
  const isPriceFilterActive = parsedMinPrice !== null || parsedMaxPrice !== null


  // Filter packages within the active category
  const { filteredPackages, pricedPackages, quoteOnlyPackages } = React.useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, " ")

    const matches = activePool.filter((pkg) => {
      // 1. Search Query filter (case-insensitive across name, destination, route, overview, highlights, itinerary)
      if (cleanQuery) {
        const matchTitle = pkg.title.toLowerCase().includes(cleanQuery)
        const matchDest = pkg.destination.toLowerCase().includes(cleanQuery)
        const matchDesc = pkg.shortDescription.toLowerCase().includes(cleanQuery)
        const matchOverview = pkg.overview?.toLowerCase().includes(cleanQuery)
        const matchHighlights = pkg.highlights?.some((h) => h.toLowerCase().includes(cleanQuery))
        const matchItinerary = pkg.itinerary?.some((i) => 
          i.title.toLowerCase().includes(cleanQuery) || i.description.toLowerCase().includes(cleanQuery)
        )
        if (!matchTitle && !matchDest && !matchDesc && !matchOverview && !matchHighlights && !matchItinerary) {
          return false
        }
      }

      // 2. Destination filter
      if (selectedDestination !== "All" && pkg.destination !== selectedDestination) {
        return false
      }

      // 3. Duration filter
      if (selectedDuration === "short" && pkg.days > 4) return false
      if (selectedDuration === "medium" && (pkg.days < 5 || pkg.days > 7)) return false
      if (selectedDuration === "long" && pkg.days < 8) return false

      // 4. Numeric Price Filter
      if (isPriceFilterActive) {
        if (typeof pkg.numericPrice === "number" && !isNaN(pkg.numericPrice)) {
          if (parsedMinPrice !== null && pkg.numericPrice < parsedMinPrice) return false
          if (parsedMaxPrice !== null && pkg.numericPrice > parsedMaxPrice) return false
        }
      }

      return true
    })

    // Separate verified priced packages from quote-based packages
    const priced: Package[] = []
    const quoteOnly: Package[] = []

    matches.forEach((pkg) => {
      if (typeof pkg.numericPrice === "number" && !isNaN(pkg.numericPrice)) {
        priced.push(pkg)
      } else {
        quoteOnly.push(pkg)
      }
    })

    // Sort according to selected sort option
    const sortList = (list: Package[]) => {
      if (selectedSort === "duration-asc") {
        return list.sort((a, b) => a.days - b.days || a.title.localeCompare(b.title))
      } else if (selectedSort === "duration-desc") {
        return list.sort((a, b) => b.days - a.days || a.title.localeCompare(b.title))
      } else if (selectedSort === "name-asc") {
        return list.sort((a, b) => a.title.localeCompare(b.title))
      } else if (selectedSort === "name-desc") {
        return list.sort((a, b) => b.title.localeCompare(a.title))
      } else if (selectedSort === "price-asc") {
        return list.sort((a, b) => (a.numericPrice ?? 0) - (b.numericPrice ?? 0) || a.title.localeCompare(b.title))
      } else if (selectedSort === "price-desc") {
        return list.sort((a, b) => (b.numericPrice ?? 0) - (a.numericPrice ?? 0) || a.title.localeCompare(b.title))
      } else {
        // Default: Recommended (Featured first, then duration)
        return list.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.days - b.days || a.title.localeCompare(b.title)
        })
      }
    }

    const sortedPriced = sortList([...priced])
    const sortedQuote = sortList([...quoteOnly])
    const combined = [...sortedPriced, ...sortedQuote]

    return {
      filteredPackages: combined,
      pricedPackages: sortedPriced,
      quoteOnlyPackages: sortedQuote,
    }
  }, [
    activePool, 
    searchQuery, 
    selectedDestination, 
    selectedDuration, 
    selectedSort, 
    isPriceFilterActive, 
    parsedMinPrice, 
    parsedMaxPrice
  ])

  // Cross-category check: if 0 results in current category, check if search matches the other category
  const crossCategoryMatches = React.useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, " ")
    if (!cleanQuery || filteredPackages.length > 0) return []

    return otherPool.filter((pkg) => {
      const matchTitle = pkg.title.toLowerCase().includes(cleanQuery)
      const matchDest = pkg.destination.toLowerCase().includes(cleanQuery)
      const matchDesc = pkg.shortDescription.toLowerCase().includes(cleanQuery)
      const matchHighlights = pkg.highlights?.some((h) => h.toLowerCase().includes(cleanQuery))
      const matchItinerary = pkg.itinerary?.some((i) => 
        i.title.toLowerCase().includes(cleanQuery) || i.description.toLowerCase().includes(cleanQuery)
      )
      return matchTitle || matchDest || matchDesc || matchHighlights || matchItinerary
    })
  }, [otherPool, searchQuery, filteredPackages.length])

  // Pagination calculation
  const totalPages = Math.ceil(filteredPackages.length / PAGE_SIZE)
  const safeCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages))
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE
  const paginatedPackages = filteredPackages.slice(startIndex, startIndex + PAGE_SIZE)

  // Handle category change (preserves search, resets filters & pagination)
  const handleCategoryChange = (newCategory: PackageCategory) => {
    if (newCategory === selectedCategory) return
    setSelectedCategory(newCategory)
    setSelectedDestination("All")
    setSelectedDuration("All")
    setMinPrice("")
    setMaxPrice("")
    setCurrentPage(1)
    setDestSearchQuery("")
    updateUrlParams({
      category: newCategory,
      destination: "All",
      duration: "All",
      minPrice: "",
      maxPrice: "",
      page: 1,
    })
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    updateUrlParams({ search: query, page: 1 })
  }

  // Handle destination change
  const handleDestinationChange = (dest: string) => {
    setSelectedDestination(dest)
    setCurrentPage(1)
    updateUrlParams({ destination: dest, page: 1 })
  }

  // Handle duration change
  const handleDurationChange = (dur: string) => {
    setSelectedDuration(dur)
    setCurrentPage(1)
    updateUrlParams({ duration: dur, page: 1 })
  }

  // Handle price range changes
  const handleMinPriceChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, "")
    setMinPrice(clean)
    setCurrentPage(1)
    updateUrlParams({ minPrice: clean, page: 1 })
  }

  const handleMaxPriceChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, "")
    setMaxPrice(clean)
    setCurrentPage(1)
    updateUrlParams({ maxPrice: clean, page: 1 })
  }

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
    setCurrentPage(1)
    updateUrlParams({ sort, page: 1 })
  }

  // Reset filters action (PRESERVES active category!)
  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedDestination("All")
    setSelectedDuration("All")
    setMinPrice("")
    setMaxPrice("")
    setSelectedSort("recommended")
    setCurrentPage(1)
    setDestSearchQuery("")
    updateUrlParams({
      search: "",
      destination: "All",
      duration: "All",
      minPrice: "",
      maxPrice: "",
      sort: "recommended",
      page: 1,
    })
  }

  // Page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    updateUrlParams({ page: newPage })
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const isFiltered = 
    searchQuery !== "" || 
    selectedDestination !== "All" || 
    selectedDuration !== "All" || 
    minPrice !== "" || 
    maxPrice !== "" || 
    selectedSort !== "recommended"

  const isPriceSortActive = selectedSort === "price-asc" || selectedSort === "price-desc"

  return (
    <section 
      ref={listTopRef} 
      id="packages-listing" 
      className="bg-[#F8FAF9] pt-24 sm:pt-28 md:pt-[104px] pb-12 sm:pb-16 relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-[104px] w-full max-w-full overflow-x-clip"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            SECTION 1: Introductory Header & Category Selector
            Ensures exactly 16–24 px spacing from floating navbar bottom to content
            ========================================================================= */}
        <div className="mb-6 md:mb-7">
          {/* Compact Introductory Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 mb-3.5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand border border-emerald-200/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 shadow-2xs">
                <span>MTPL HOLIDAYS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
                Find your next escape.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5">
                Explore curated holidays across India and around the world.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs inline-flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span>{packages.length} Verified Holidays in Catalogue</span>
            </div>
          </div>

          {/* Prominent Category Selector Cards (Balanced, Proper Proportions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
            {/* National Category Card */}
            <button
              type="button"
              onClick={() => handleCategoryChange("national")}
              aria-pressed={selectedCategory === "national"}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-left transition-all duration-300 border cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand/20 ${
                selectedCategory === "national"
                  ? "bg-white border-brand ring-2 ring-brand shadow-[0_12px_28px_rgba(7,162,94,0.14)]"
                  : "bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs opacity-90 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4.5">
                {/* Square Photo Display - Fully Visible, Controlled Proper Size */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 shrink-0 aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
                  <Image
                    src={getMediaUrl("/api/media/National-Category.webp")}
                    alt="National Holidays across India"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />
                  <div className="absolute bottom-1.5 left-2 sm:hidden text-white">
                    <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-300 block">
                      INDIA
                    </span>
                  </div>
                </div>

                {/* Content & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-2 py-0.5 rounded-md inline-block">
                      NATIONAL
                    </span>
                    {selectedCategory === "national" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand text-white shadow-xs shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors shrink-0">
                        Explore India
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold font-sans text-slate-900 group-hover:text-brand transition-colors truncate">
                    Discover India
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-light mt-0.5 line-clamp-2 leading-relaxed">
                    Domestic holidays across Indian states and union territories
                  </p>

                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100/80">
                    <span className="inline-block text-xs font-bold text-brand bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-0.5 rounded-lg">
                      {nationalPackages.length} Packages
                    </span>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-brand flex items-center gap-1 transition-colors">
                      Browse <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* International Category Card */}
            <button
              type="button"
              onClick={() => handleCategoryChange("international")}
              aria-pressed={selectedCategory === "international"}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-left transition-all duration-300 border cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand/20 ${
                selectedCategory === "international"
                  ? "bg-white border-brand ring-2 ring-brand shadow-[0_12px_28px_rgba(7,162,94,0.14)]"
                  : "bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs opacity-90 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4.5">
                {/* Square Photo Display - Fully Visible, Controlled Proper Size */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 shrink-0 aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
                  <Image
                    src={getMediaUrl("/api/media/International-Category.webp")}
                    alt="International Holidays"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />
                  <div className="absolute bottom-1.5 left-2 sm:hidden text-white">
                    <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-300 block">
                      GLOBAL
                    </span>
                  </div>
                </div>

                {/* Content & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/90 px-2 py-0.5 rounded-md inline-block">
                      INTERNATIONAL
                    </span>
                    {selectedCategory === "international" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand text-white shadow-xs shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors shrink-0">
                        Explore the world
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold font-sans text-slate-900 group-hover:text-brand transition-colors truncate">
                    Explore the World
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-light mt-0.5 line-clamp-2 leading-relaxed">
                    Curated holidays in Bhutan, Nepal, Sri Lanka, Jordan, Cambodia & Japan
                  </p>

                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100/80">
                    <span className="inline-block text-xs font-bold text-brand bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-0.5 rounded-lg">
                      {internationalPackages.length} Packages
                    </span>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-brand flex items-center gap-1 transition-colors">
                      Browse <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: Main Two-Column Portal Layout (Desktop Sidebar + Discovery Feed)
            Gap between category selector and search panel: 24–32 px
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
          
          {/* ==================== DESKTOP FILTER SIDEBAR ==================== */}
          <aside className="hidden lg:block w-60 xl:w-64 flex-shrink-0 sticky top-24 self-start space-y-3.5">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200/90 shadow-[0_4px_24px_rgb(0,0,0,0.03)]">
              {/* Filter Sidebar Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand" />
                  <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
                </div>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-brand hover:text-brand-dark hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset All
                  </button>
                )}
              </div>

              {/* 1. Category Switch within Sidebar */}
              <div className="py-3.5 border-b border-slate-100">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Holiday Category
                </label>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("national")}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === "national"
                        ? "bg-brand text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    National ({nationalPackages.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("international")}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === "international"
                        ? "bg-brand text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Intl ({internationalPackages.length})
                  </button>
                </div>
              </div>

              {/* 2. Destination Filter */}
              <div className="py-3.5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Destination
                  </label>
                  {selectedDestination !== "All" && (
                    <button
                      type="button"
                      onClick={() => handleDestinationChange("All")}
                      className="text-[11px] font-semibold text-brand hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Destination search if many options */}
                {destinationOptions.length > 6 && (
                  <div className="relative mb-2.5">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={destSearchQuery}
                      onChange={(e) => setDestSearchQuery(e.target.value)}
                      placeholder="Search destination..."
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl h-8 pl-8 pr-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white"
                    />
                  </div>
                )}

                {/* Destination Options List */}
                <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => handleDestinationChange("All")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                      selectedDestination === "All"
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>All Destinations</span>
                    <span className="text-[11px] text-slate-400">({activePool.length})</span>
                  </button>

                  {visibleDestinations.map((dest) => {
                    const isSelected = selectedDestination === dest.name
                    return (
                      <button
                        key={dest.name}
                        type="button"
                        onClick={() => handleDestinationChange(dest.name)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-brand/10 text-brand font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate pr-2">{dest.name}</span>
                        <span className="text-[11px] text-slate-400 flex-shrink-0">({dest.count})</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 3. Duration Filter */}
              <div className="py-3.5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Duration (Days)
                  </label>
                  {selectedDuration !== "All" && (
                    <button
                      type="button"
                      onClick={() => handleDurationChange("All")}
                      className="text-[11px] font-semibold text-brand hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleDurationChange("All")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                      selectedDuration === "All"
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>All Durations</span>
                    <span className="text-[11px] text-slate-400">({durationCounts.all})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDurationChange("short")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                      selectedDuration === "short"
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>Short (2 – 4 Days)</span>
                    <span className="text-[11px] text-slate-400">({durationCounts.short})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDurationChange("medium")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                      selectedDuration === "medium"
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>Medium (5 – 7 Days)</span>
                    <span className="text-[11px] text-slate-400">({durationCounts.medium})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDurationChange("long")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                      selectedDuration === "long"
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>Extended (8+ Days)</span>
                    <span className="text-[11px] text-slate-400">({durationCounts.long})</span>
                  </button>
                </div>
              </div>

              {/* 4. Numeric Price Range Filter */}
              <div className="pt-3.5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {isInternational ? "Price Range ($ USD)" : "Price Range (₹ INR)"}
                  </label>
                  {(minPrice || maxPrice) && (
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("")
                        setMaxPrice("")
                        updateUrlParams({ minPrice: "", maxPrice: "", page: 1 })
                      }}
                      className="text-[11px] font-semibold text-brand hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Presets for International Packages */}
                {isInternational && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {[
                      { label: "All", min: "", max: "" },
                      { label: "< $500", min: "", max: "500" },
                      { label: "$500–$1k", min: "500", max: "1000" },
                      { label: "$1k+", min: "1000", max: "" },
                    ].map((preset) => {
                      const isActive = minPrice === preset.min && maxPrice === preset.max
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setMinPrice(preset.min)
                            setMaxPrice(preset.max)
                            updateUrlParams({ minPrice: preset.min, maxPrice: preset.max, page: 1 })
                          }}
                          className={`text-[10.5px] px-2 py-0.5 rounded-lg font-medium transition-colors border ${
                            isActive
                              ? "bg-brand text-white border-brand shadow-xs"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {preset.label}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Min & Max Inputs */}
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">{priceSymbol}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={minPrice}
                      onChange={(e) => handleMinPriceChange(e.target.value)}
                      placeholder={isInternational ? "Min ($200)" : "Min"}
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl h-8.5 pl-6 pr-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">{priceSymbol}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={maxPrice}
                      onChange={(e) => handleMaxPriceChange(e.target.value)}
                      placeholder={isInternational ? "Max ($2,500)" : "Max"}
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl h-8.5 pl-6 pr-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white"
                    />
                  </div>
                </div>

                {/* Information on Pricing Model */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-500 leading-relaxed">
                  <div className="flex items-start gap-1.5 font-semibold text-slate-700 mb-1">
                    <Info className="w-3.5 h-3.5 text-brand flex-shrink-0 mt-0.5" />
                    <span>Verified Transparent Pricing</span>
                  </div>
                  <p>
                    {isInternational
                      ? "All 26 international packages display verified starting rates in USD ($) per person."
                      : "All 67 national packages display verified starting rates in INR (₹) per person."}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* ==================== RIGHT MAIN FEED ==================== */}
          <main className="flex-1 min-w-0 flex flex-col">
            
            {/* Top Toolbar: Search + Modern Dropdown Sort + Mobile Filter Trigger
                Internal padding: approximately 16–20 px (p-3.5 sm:p-4)
                Margin bottom: approximately 20–24 px (mb-5) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-[0_4px_24px_rgb(0,0,0,0.03)] mb-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder={`Search ${selectedCategory === "national" ? "India" : "international"} packages, cities, routes...`}
                    className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200/90 rounded-2xl h-11 pl-10 pr-9 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => handleSearchChange("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      aria-label="Clear search input"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 h-11 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-brand" />
                  <span>Filters</span>
                  {isFiltered && (
                    <span className="w-2 h-2 rounded-full bg-brand" />
                  )}
                </button>

                {/* Modern Custom Sort Dropdown (Replaces native select) */}
                <div className="relative flex-shrink-0 sm:w-56">
                  <ModernDropdown
                    options={sortOptions}
                    value={selectedSort}
                    onChange={handleSortChange}
                    label="Sort Order"
                    align="right"
                    icon={<ArrowUpDown className="w-3.5 h-3.5" />}
                  />
                </div>
              </div>

              {/* Active Filter Chips & Clear Action (Compact padding: pt-2.5 mt-2.5) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2.5 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-0.5">
                    Active:
                  </span>

                  {/* Category Chip */}
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    <span>{selectedCategory === "national" ? "National (India)" : "International"}</span>
                  </span>

                  {/* Search Query Chip */}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium max-w-[200px] sm:max-w-xs">
                      <span className="truncate">Search: &ldquo;{searchQuery}&rdquo;</span>
                      <button onClick={() => handleSearchChange("")} className="hover:text-red-500 flex-shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Destination Chip */}
                  {selectedDestination !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium max-w-[180px] sm:max-w-xs">
                      <span className="truncate">Destination: {selectedDestination}</span>
                      <button onClick={() => handleDestinationChange("All")} className="hover:text-red-500 flex-shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Duration Chip */}
                  {selectedDuration !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                      <span>
                        Duration: {
                          selectedDuration === "short" ? "2–4 Days" : 
                          selectedDuration === "medium" ? "5–7 Days" : "8+ Days"
                        }
                      </span>
                      <button onClick={() => handleDurationChange("All")} className="hover:text-red-500 flex-shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Price Range Chip */}
                  {(minPrice || maxPrice) && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium max-w-[220px] sm:max-w-none">
                      <span className="truncate">
                        Price: {minPrice ? `${priceSymbol}${minPrice}` : `${priceSymbol}0`} – {maxPrice ? `${priceSymbol}${maxPrice}` : "Any"} {isInternational ? "USD" : ""}
                      </span>
                      <button
                        onClick={() => {
                          setMinPrice("")
                          setMaxPrice("")
                          updateUrlParams({ minPrice: "", maxPrice: "", page: 1 })
                        }}
                        className="hover:text-red-500 flex-shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Sort Chip */}
                  {selectedSort !== "recommended" && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                      <span>Sort: {sortOptions.find((s) => s.value === selectedSort)?.label}</span>
                      <button onClick={() => handleSortChange("recommended")} className="hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-brand font-bold hover:underline inline-flex items-center gap-1 text-[11px] cursor-pointer flex-shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Results Status Header (Separation to grid: approximately 16–20 px -> mb-4) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 px-1 text-xs text-slate-600 mb-4">
              <div className="leading-relaxed">
                Showing <strong className="text-slate-900 font-bold">{filteredPackages.length > 0 ? startIndex + 1 : 0}</strong>–
                <strong className="text-slate-900 font-bold">{Math.min(startIndex + PAGE_SIZE, filteredPackages.length)}</strong> of{" "}
                <strong className="text-slate-900 font-bold">{filteredPackages.length}</strong> verified{" "}
                {selectedCategory === "national" ? "National Holidays" : "International Holidays"}
              </div>

              {totalPages > 1 && (
                <div className="text-slate-500 text-xs font-medium self-start sm:self-auto">
                  Page <span className="font-bold text-slate-900">{safeCurrentPage}</span> of{" "}
                  <span className="font-bold text-slate-900">{totalPages}</span>
                </div>
              )}
            </div>

            {/* Price Sorting Notice Banner when active */}
            {isPriceSortActive && (
              <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5 shadow-2xs mb-4">
                <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">
                    Price Sorting &amp; Quote-Based Packages
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    All packages in MTPL&apos;s curated inventory are quote-based (customized to travel dates, hotel tiers, and group size). Quote-based packages are preserved below in verified order without artificial zero values.
                  </p>
                </div>
              </div>
            )}

            {/* Empty States & Smart Cross-Category Recovery */}
            {filteredPackages.length === 0 ? (
              crossCategoryMatches.length > 0 ? (
                /* Cross-category Match Found */
                <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
                  <div className="w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center mx-auto mb-3.5 shadow-md">
                    <Globe2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 mb-2">
                    Looking for &ldquo;{searchQuery}&rdquo; in {selectedCategory === "national" ? "International" : "National"} Holidays?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    We couldn&apos;t find &ldquo;{searchQuery}&rdquo; under{" "}
                    <span className="font-bold text-slate-800">{selectedCategory === "national" ? "National Holidays (India)" : "International Holidays"}</span>, 
                    but we found <strong className="text-brand font-bold">{crossCategoryMatches.length} verified packages</strong> in our{" "}
                    <span className="font-bold text-slate-800">{selectedCategory === "national" ? "International" : "National"}</span> catalogue!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(selectedCategory === "national" ? "international" : "national")}
                      className="bg-brand hover:bg-brand-dark text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                    >
                      <span>Switch to {selectedCategory === "national" ? "International Holidays" : "National Holidays"} ({crossCategoryMatches.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-4 py-2.5 rounded-xl transition-all text-xs sm:text-sm cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              ) : (
                /* Standard Empty State */
                <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/80 shadow-2xs max-w-xl mx-auto my-8">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3.5 text-slate-400">
                    <Compass className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-slate-900 mb-1.5">No Matching Packages</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-light mb-5 leading-relaxed">
                    We couldn&apos;t find any {selectedCategory === "national" ? "domestic" : "international"} packages matching your current filter criteria. Try choosing another destination, adjusting duration, or clearing your active filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="bg-brand text-white font-bold px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-all text-xs sm:text-sm shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )
            ) : (
              <>
                {/* Package Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile)
                    Shifted upward so the first row is visible above the fold on desktop */}
                {isPriceSortActive && pricedPackages.length > 0 ? (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-3.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                        <h3 className="text-base font-bold text-slate-900">
                          Fixed-Price Packages ({pricedPackages.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 desktop-package-grid gap-4 sm:gap-5 relative z-10">
                        {pricedPackages.map((pkg) => (
                          <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <h3 className="text-base font-bold text-slate-900">
                            Quote-based Packages ({quoteOnlyPackages.length})
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Pricing on request based on group size, hotel category &amp; travel season.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 desktop-package-grid gap-4 sm:gap-5 relative z-10">
                        {quoteOnlyPackages.map((pkg) => (
                          <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 desktop-package-grid gap-4 sm:gap-5 relative z-10">
                    {paginatedPackages.map((pkg) => (
                      <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                  </div>
                )}

                {/* Accessible Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-slate-200/80">
                    <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                      Showing packages <span className="font-bold text-slate-900">{startIndex + 1}</span> to{" "}
                      <span className="font-bold text-slate-900">{Math.min(startIndex + PAGE_SIZE, filteredPackages.length)}</span> of{" "}
                      <span className="font-bold text-slate-900">{filteredPackages.length}</span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                      {/* Previous button */}
                      <button
                        type="button"
                        onClick={() => handlePageChange(safeCurrentPage - 1)}
                        disabled={safeCurrentPage === 1}
                        className="h-9 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 bg-white shadow-2xs"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Prev</span>
                      </button>

                      {/* Mobile Current Page Indicator (visible only on phone screens) */}
                      <div className="sm:hidden text-xs font-bold text-slate-700 px-3 py-1.5 bg-slate-100 rounded-xl">
                        Page {safeCurrentPage} of {totalPages}
                      </div>

                      {/* Desktop / Tablet Page Numbers */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                          const isCurrent = pageNum === safeCurrentPage
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => handlePageChange(pageNum)}
                              aria-current={isCurrent ? "page" : undefined}
                              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isCurrent
                                  ? "bg-brand text-white shadow-2xs"
                                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                      </div>

                      {/* Next button */}
                      <button
                        type="button"
                        onClick={() => handlePageChange(safeCurrentPage + 1)}
                        disabled={safeCurrentPage === totalPages}
                        className="h-9 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 bg-white shadow-2xs"
                        aria-label="Next page"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        {/* =========================================================================
            SECTION 3: Accessible Mobile Filter Drawer / Dialog
            ========================================================================= */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileDrawerOpen(false)}
            />

            {/* Slide-out Sheet */}
            <div className="relative w-full max-w-md bg-white h-full flex flex-col z-10 shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand" />
                  <h3 className="font-bold text-slate-900 text-sm">Filter &amp; Sort</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* 1. Category Switch */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("national")}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === "national"
                          ? "bg-brand text-white shadow-2xs"
                          : "text-slate-600"
                      }`}
                    >
                      National ({nationalPackages.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("international")}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === "international"
                          ? "bg-brand text-white shadow-2xs"
                          : "text-slate-600"
                      }`}
                    >
                      International ({internationalPackages.length})
                    </button>
                  </div>
                </div>

                {/* 2. Destination Picker */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Destination
                    </label>
                    {selectedDestination !== "All" && (
                      <button
                        type="button"
                        onClick={() => handleDestinationChange("All")}
                        className="text-xs font-semibold text-brand hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <select
                    value={selectedDestination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-xl h-10 px-3 text-xs font-medium text-slate-800"
                  >
                    <option value="All">All Destinations ({activePool.length})</option>
                    {destinationOptions.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} ({d.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Duration */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Duration
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDurationChange("All")}
                      className={`p-2 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedDuration === "All"
                          ? "border-brand bg-brand/5 text-brand"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      All ({durationCounts.all})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDurationChange("short")}
                      className={`p-2 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedDuration === "short"
                          ? "border-brand bg-brand/5 text-brand"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      Short 2–4D ({durationCounts.short})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDurationChange("medium")}
                      className={`p-2 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedDuration === "medium"
                          ? "border-brand bg-brand/5 text-brand"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      Medium 5–7D ({durationCounts.medium})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDurationChange("long")}
                      className={`p-2 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedDuration === "long"
                          ? "border-brand bg-brand/5 text-brand"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      Extended 8+D ({durationCounts.long})
                    </button>
                  </div>
                </div>

                {/* 4. Numeric Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {isInternational ? "Price Range ($ USD)" : "Price Range (₹ INR)"}
                    </label>
                    {(minPrice || maxPrice) && (
                      <button
                        type="button"
                        onClick={() => {
                          setMinPrice("")
                          setMaxPrice("")
                          updateUrlParams({ minPrice: "", maxPrice: "", page: 1 })
                        }}
                        className="text-[11px] font-semibold text-brand hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {isInternational && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {[
                        { label: "All", min: "", max: "" },
                        { label: "< $500", min: "", max: "500" },
                        { label: "$500–$1k", min: "500", max: "1000" },
                        { label: "$1k+", min: "1000", max: "" },
                      ].map((preset) => {
                        const isActive = minPrice === preset.min && maxPrice === preset.max
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              setMinPrice(preset.min)
                              setMaxPrice(preset.max)
                              updateUrlParams({ minPrice: preset.min, maxPrice: preset.max, page: 1 })
                            }}
                            className={`text-[10.5px] px-2 py-0.5 rounded-lg font-medium border ${
                              isActive
                                ? "bg-brand text-white border-brand shadow-xs"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {preset.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mb-1.5">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">{priceSymbol}</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={minPrice}
                        onChange={(e) => handleMinPriceChange(e.target.value)}
                        placeholder={isInternational ? "Min ($)" : "Min (₹)"}
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl h-9 pl-6 pr-2.5 text-xs"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">{priceSymbol}</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={maxPrice}
                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                        placeholder={isInternational ? "Max ($)" : "Max (₹)"}
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl h-9 pl-6 pr-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {isInternational
                      ? "All 26 international packages display verified starting rates in USD ($) per person."
                      : "All 67 national packages display verified starting rates in INR (₹) per person."}
                  </p>
                </div>

                {/* 5. Sort By */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Sort Order
                  </label>
                  <ModernDropdown
                    options={sortOptions}
                    value={selectedSort}
                    onChange={handleSortChange}
                    label="Sort Order"
                    icon={<ArrowUpDown className="w-3.5 h-3.5" />}
                  />
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-100 flex items-center gap-2.5 bg-slate-50">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs bg-white hover:bg-slate-100"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-dark shadow-2xs"
                >
                  Show ({filteredPackages.length}) Holidays
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

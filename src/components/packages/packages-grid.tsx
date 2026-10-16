"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { Package } from "@/types/package"
import { PackageCard } from "@/components/packages/package-card"
import { ModernDropdown } from "@/components/packages/modern-dropdown"
import { Search, SlidersHorizontal, X, MapPin, Clock } from "lucide-react"

export function PackagesGrid({ packages }: { packages: Package[] }) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedDestination, setSelectedDestination] = React.useState("All")
  const [selectedDuration, setSelectedDuration] = React.useState("All")

  // Calculate destination options with package counts
  const destinationOptions = React.useMemo(() => {
    const destMap = new Map<string, number>()
    packages.forEach((p) => {
      destMap.set(p.destination, (destMap.get(p.destination) || 0) + 1)
    })

    const sortedDests = Array.from(destMap.keys()).sort()
    return [
      { label: "All Destinations", value: "All", count: packages.length },
      ...sortedDests.map((d) => ({
        label: d,
        value: d,
        count: destMap.get(d) || 0,
      })),
    ]
  }, [packages])

  // Calculate duration options with package counts
  const durationOptions = React.useMemo(() => {
    const shortCount = packages.filter((p) => p.days <= 4).length
    const mediumCount = packages.filter((p) => p.days >= 5 && p.days <= 7).length
    const longCount = packages.filter((p) => p.days >= 8).length

    return [
      { label: "All Durations", value: "All", count: packages.length },
      { label: "Short (2 – 4 Days)", value: "short", count: shortCount },
      { label: "Medium (5 – 7 Days)", value: "medium", count: mediumCount },
      { label: "Extended (8+ Days)", value: "long", count: longCount },
    ]
  }, [packages])

  // Filter packages
  const filteredPackages = React.useMemo(() => {
    return packages.filter((pkg) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = pkg.title.toLowerCase().includes(q)
        const matchDest = pkg.destination.toLowerCase().includes(q)
        const matchDesc = pkg.shortDescription.toLowerCase().includes(q)
        const matchHighlights = pkg.highlights?.some((h) => h.toLowerCase().includes(q))
        if (!matchTitle && !matchDest && !matchDesc && !matchHighlights) {
          return false
        }
      }

      // 2. Destination Filter
      if (selectedDestination !== "All" && pkg.destination !== selectedDestination) {
        return false
      }

      // 3. Duration Filter
      if (selectedDuration === "short" && pkg.days > 4) return false
      if (selectedDuration === "medium" && (pkg.days < 5 || pkg.days > 7)) return false
      if (selectedDuration === "long" && pkg.days < 8) return false

      return true
    })
  }, [packages, searchQuery, selectedDestination, selectedDuration])

  // Reset filters
  const handleReset = () => {
    setSearchQuery("")
    setSelectedDestination("All")
    setSelectedDuration("All")
  }

  const isFiltered = searchQuery !== "" || selectedDestination !== "All" || selectedDuration !== "All"

  return (
    <section className="bg-[var(--background)] py-12 md:py-20 relative">
      <Container>
        {/* Controls Toolbar: Modern Search & Sleek Dropdowns */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_12px_40px_rgb(0,0,0,0.05)] border border-slate-200/80 mb-12 relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by destination, state, or sightseeing spots..."
                  className="w-full bg-slate-50 hover:bg-slate-100/60 border border-slate-200/90 rounded-2xl h-13 pl-12 pr-10 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand focus:bg-white transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Destination Modern Dropdown */}
            <div className="md:col-span-3">
              <ModernDropdown
                label="Destination"
                icon={<MapPin className="w-4 h-4" />}
                options={destinationOptions}
                value={selectedDestination}
                onChange={setSelectedDestination}
              />
            </div>

            {/* Duration Modern Dropdown */}
            <div className="md:col-span-3">
              <ModernDropdown
                label="Duration"
                icon={<Clock className="w-4 h-4" />}
                options={durationOptions}
                value={selectedDuration}
                onChange={setSelectedDuration}
              />
            </div>
          </div>

          {/* Filter Status Bar & Reset Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-100 text-xs">
            <div className="text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredPackages.length}</span> of{" "}
              <span className="font-bold text-slate-900">{packages.length}</span> verified holiday packages
            </div>

            {isFiltered && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-brand font-bold hover:underline transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-sans text-slate-900 mb-2">No Matching Packages</h3>
            <p className="text-slate-500 text-sm font-light mb-6">
              We couldn&apos;t find any holiday packages matching your search criteria. Try selecting another destination or resetting your filters.
            </p>
            <button
              onClick={handleReset}
              className="bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand/90 transition-all text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

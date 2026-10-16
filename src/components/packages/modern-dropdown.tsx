"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

interface Option {
  label: string
  value: string
  count?: number
}

interface CustomDropdownProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  label: string
  className?: string
}

export function ModernDropdown({
  options,
  value,
  onChange,
  icon,
  label,
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Find active label
  const selectedOption = options.find((o) => o.value === value) || options[0]

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className={`w-full h-13 px-4 rounded-2xl flex items-center justify-between gap-3 text-left transition-all duration-200 border ${
          isOpen
            ? "bg-white border-brand ring-4 ring-brand/10 shadow-md"
            : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/90 text-slate-800"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-brand flex-shrink-0">{icon}</span>}
          <div className="truncate">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              {label}
            </span>
            <span className="block text-sm font-semibold text-slate-900 truncate">
              {selectedOption ? selectedOption.label : "Select"}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>

      {/* Floating Animated Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl p-2 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <ul role="listbox" aria-label={label} className="space-y-1">
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {option.count !== undefined && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-brand text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {option.count}
                        </span>
                      )}
                      {isSelected && <Check className="w-4 h-4 text-brand" />}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

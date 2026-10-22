"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

export interface DropdownOption {
  label: string
  value: string
  count?: number
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  label: string
  className?: string
  buttonClassName?: string
  align?: "left" | "right"
  showLabelInButton?: boolean
}

export function ModernDropdown({
  options,
  value,
  onChange,
  icon,
  label,
  className = "",
  buttonClassName = "",
  align = "left",
  showLabelInButton = false,
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

  // Keyboard accessibility: Escape to close
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className={`w-full h-11 px-3.5 sm:px-4 rounded-2xl flex items-center justify-between gap-2.5 text-left transition-all duration-200 border cursor-pointer ${
          isOpen
            ? "bg-white border-brand ring-4 ring-brand/10 shadow-sm"
            : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/90 text-slate-800"
        } ${buttonClassName}`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {icon ? (
            <span className="text-slate-400 group-hover:text-brand flex-shrink-0">{icon}</span>
          ) : null}
          <div className="truncate">
            {showLabelInButton && (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-0.5">
                {label}
              </span>
            )}
            <span className="block text-xs font-bold text-slate-900 truncate">
              {selectedOption ? selectedOption.label : "Select"}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>

      {/* Floating Animated Dropdown Menu */}
      {isOpen && (
        <div 
          className={`absolute ${align === "right" ? "right-0" : "left-0"} top-full mt-1.5 z-50 bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-1.5 min-w-[220px] sm:min-w-[240px] max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-150`}
        >
          <ul role="listbox" aria-label={label} className="space-y-0.5">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-brand/10 text-brand font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      {option.count !== undefined && (
                        <span
                          className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-brand text-white font-bold"
                              : "bg-slate-100 text-slate-500 font-medium"
                          }`}
                        >
                          {option.count}
                        </span>
                      )}
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand stroke-[2.5]" />}
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

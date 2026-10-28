"use client"

import * as React from "react"
import { PhoneCall } from "lucide-react"

interface PackageCallbackButtonProps {
  packageSlug: string
  packageTitle: string
  className?: string
}

export function PackageCallbackButton({
  packageSlug,
  packageTitle,
  className = "",
}: PackageCallbackButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-callback-modal", {
          detail: {
            packageSlug,
            packageTitle,
          },
        })
      )
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all bg-amber-500 hover:bg-amber-600 text-white h-12 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 ${className}`}
      aria-label={`Request a callback for ${packageTitle}`}
      title="Request a quick callback from our travel experts"
    >
      <PhoneCall className="w-4 h-4" />
      <span>Request a Callback</span>
    </button>
  )
}

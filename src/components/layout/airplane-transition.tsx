"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function AirplaneTransition() {
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const target = (e.target as HTMLElement).closest('a')
      if (!target || !target.href) return

      // Don't intercept if modified click
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      
      const hrefAttr = target.getAttribute('href')
      
      // Don't intercept if it's a blank target, mailto, tel, or hash link
      if (
        target.target === "_blank" ||
        !hrefAttr ||
        hrefAttr.startsWith('#') ||
        hrefAttr.startsWith('mailto:') ||
        hrefAttr.startsWith('tel:') ||
        hrefAttr.startsWith('http') && target.origin !== window.location.origin
      ) {
        return
      }

      // Allow pathname navigation without animation if it's the exact same pathname + hash
      const currentUrl = new URL(window.location.href)
      const targetUrl = new URL(target.href)
      if (currentUrl.pathname === targetUrl.pathname && targetUrl.hash) {
        return
      }
      
      // Allow if it's the exact same url
      if (currentUrl.href === targetUrl.href) {
        return
      }

      // It's an internal link
      e.preventDefault()
      e.stopPropagation()

      // If reduced motion, just navigate immediately
      if (prefersReducedMotion) {
        router.push(hrefAttr)
        return
      }

      // Start transition
      setIsTransitioning(true)

      // Wait for the airplane to take off, then navigate
      setTimeout(() => {
        router.push(hrefAttr)
      }, 700)
      
      // Complete flight and fade out
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1600)
    }

    // Use capture phase to intercept before next/link does
    document.addEventListener("click", handleClick, { capture: true })
    
    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
    }
  }, [router])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-[var(--background)]/85 backdrop-blur-sm pointer-events-none flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle Route Trail */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 0 70 C 30 60, 70 40, 100 30"
              fill="none"
              stroke="url(#trail-gradient)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.6, ease: "easeInOut", times: [0, 0.6, 1] }}
            />
            <defs>
              <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Airplane Silhouette */}
          <motion.svg
            initial={{ x: "-60vw", y: "30vh", rotate: 75 }}
            animate={{ 
              x: ["-60vw", "-20vw", "0vw", "20vw", "60vw"],
              y: ["30vh", "5vh", "0vh", "-5vh", "-30vh"],
              rotate: [75, 65, 60, 55, 40]
            }}
            transition={{ duration: 1.6, ease: "easeInOut", times: [0, 0.3, 0.5, 0.7, 1] }}
            className="w-10 md:w-14 lg:w-16 h-10 md:h-14 lg:h-16 text-brand relative z-10 drop-shadow-[0_4px_12px_rgba(7,162,94,0.4)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

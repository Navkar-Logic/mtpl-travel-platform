"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Phone,
  Mail,
  X,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Sparkles,
  Send,
  Clock,
  User,
  Globe2,
  MapPin,
  ShieldCheck,
} from "lucide-react"
import { siteConfig } from "@/config/site"
import { getPackageBySlug } from "@/features/packages/data/packages"
import { validatePhoneNumber } from "@/lib/validations/callback"

export function FloatingContactRail() {
  const pathname = usePathname()

  // Modal selector: "callback" | "quote" | null (strictly separate forms)
  const [activeModal, setActiveModal] = React.useState<"callback" | "quote" | null>(null)

  // Route-derived package context
  const routePackage = React.useMemo(() => {
    if (pathname && pathname.startsWith("/packages/")) {
      const slug = pathname.replace("/packages/", "").split("/")[0]
      if (slug) {
        return getPackageBySlug(slug) || null
      }
    }
    return null
  }, [pathname])

  const [eventPackage, setEventPackage] = React.useState<{ slug: string; title: string } | null>(null)

  const activePackageSlug = eventPackage?.slug || routePackage?.slug || ""
  const activePackageTitle = eventPackage?.title || routePackage?.title || ""

  // =========================================================================
  // SEPARATE FORM 1: CALLBACK STATE (Name Optional, Phone Mandatory)
  // =========================================================================
  const [callbackName, setCallbackName] = React.useState("")
  const [callbackPhone, setCallbackPhone] = React.useState("")
  const [callbackPhoneError, setCallbackPhoneError] = React.useState<string | null>(null)

  // =========================================================================
  // SEPARATE FORM 2: FREE QUOTE STATE (Name Optional, Email & Phone Mandatory, Tour Type Optional)
  // =========================================================================
  const [quoteName, setQuoteName] = React.useState("")
  const [quoteEmail, setQuoteEmail] = React.useState("")
  const [quotePhone, setQuotePhone] = React.useState("")
  const [quoteTourType, setQuoteTourType] = React.useState<"international" | "national" | "">("")
  const [quoteEmailError, setQuoteEmailError] = React.useState<string | null>(null)
  const [quotePhoneError, setQuotePhoneError] = React.useState<string | null>(null)

  // Shared Submission & Status
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [successReference, setSuccessReference] = React.useState<string | null>(null)
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [countdown, setCountdown] = React.useState(5)

  const callbackPhoneRef = React.useRef<HTMLInputElement>(null)
  const quoteEmailRef = React.useRef<HTMLInputElement>(null)

  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const handleOpenCallbackModal = () => {
    setServerError(null)
    setActiveModal("callback")
  }

  const handleOpenQuoteModal = () => {
    setServerError(null)
    setActiveModal("quote")
  }

  const handleCloseModal = React.useCallback(() => {
    setActiveModal(null)
    setCallbackName("")
    setCallbackPhone("")
    setCallbackPhoneError(null)
    setQuoteName("")
    setQuoteEmail("")
    setQuotePhone("")
    setQuoteTourType("")
    setQuoteEmailError(null)
    setQuotePhoneError(null)
    setIsSubmitting(false)
    setIsSuccess(false)
    setServerError(null)
    setSuccessReference(null)
    setCountdown(5)
  }, [])

  // Auto-close 5-second countdown on successful submission
  React.useEffect(() => {
    if (!isSuccess) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleCloseModal()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isSuccess, handleCloseModal])

  // Listen for global open-callback-modal custom events
  React.useEffect(() => {
    const handleCustomOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{
        packageSlug?: string
        packageTitle?: string
        tab?: "callback" | "quote"
      }>
      if (customEvent.detail?.packageSlug || customEvent.detail?.packageTitle) {
        setEventPackage({
          slug: customEvent.detail.packageSlug || "",
          title: customEvent.detail.packageTitle || "",
        })
      }
      setServerError(null)
      if (customEvent.detail?.tab === "quote") {
        setActiveModal("quote")
      } else {
        setActiveModal("callback")
      }
    }

    window.addEventListener("open-callback-modal", handleCustomOpen)
    return () => window.removeEventListener("open-callback-modal", handleCustomOpen)
  }, [])

  // Lock body scroll and handle Escape key when modal is open
  React.useEffect(() => {
    if (activeModal) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleCloseModal()
        }
      }

      window.addEventListener("keydown", handleKeyDown)

      const timer = setTimeout(() => {
        if (activeModal === "quote") {
          quoteEmailRef.current?.focus()
        } else {
          callbackPhoneRef.current?.focus()
        }
      }, 100)

      return () => {
        document.body.style.overflow = prevOverflow
        window.removeEventListener("keydown", handleKeyDown)
        clearTimeout(timer)
      }
    }
  }, [activeModal, handleCloseModal])

  // Primary Call link (digits only for tel: URI)
  const primaryPhone = siteConfig.contact.phones.primary
  const telHref = `tel:${primaryPhone.replace(/\s+/g, "")}`

  // Verified WhatsApp enquiry phone
  const whatsappNumber = (siteConfig.contact.phones.customerEnquiry[0] || "918381006600").replace(/\D/g, "")

  // Contextual WhatsApp prefill message
  const whatsappMessage = activePackageTitle
    ? `Hello MTPL team, I am interested in planning a trip for ${activePackageTitle}. Please share availability and customized quote details.`
    : "Hello MTPL team, I would like to inquire about your holiday packages and travel services."

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // =========================================================================
  // SUBMIT HANDLER: CALLBACK (Name Optional, Phone Mandatory)
  // =========================================================================
  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    const phoneValidation = validatePhoneNumber(callbackPhone)
    if (!phoneValidation.isValid) {
      setCallbackPhoneError(phoneValidation.error || "Please enter a valid phone number.")
      callbackPhoneRef.current?.focus()
      return
    }

    setCallbackPhoneError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "callback",
          name: callbackName.trim(),
          phone: callbackPhone.trim(),
          packageSlug: activePackageSlug || "",
          packageName: activePackageTitle || "",
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            "Unable to submit callback request at this moment. Please call us directly."
        )
      }

      setSuccessReference(data.reference || null)
      setCountdown(5)
      setIsSuccess(true)
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try calling our desk directly."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================================================================
  // SUBMIT HANDLER: FREE QUOTE (Name Optional, Email Mandatory, Phone Mandatory, Tour Type Optional)
  // =========================================================================
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    let hasError = false

    // Validate email (Mandatory)
    const trimmedEmail = quoteEmail.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmedEmail) {
      setQuoteEmailError("Email address is required.")
      hasError = true
    } else if (!emailRegex.test(trimmedEmail)) {
      setQuoteEmailError("Please enter a valid email address.")
      hasError = true
    } else {
      setQuoteEmailError(null)
    }

    // Validate phone (Mandatory)
    const phoneValidation = validatePhoneNumber(quotePhone)
    if (!phoneValidation.isValid) {
      setQuotePhoneError(phoneValidation.error || "Please enter a valid phone number.")
      hasError = true
    } else {
      setQuotePhoneError(null)
    }

    if (hasError) {
      if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
        quoteEmailRef.current?.focus()
      } else {
        quoteEmailRef.current?.focus()
      }
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "quote",
          name: quoteName.trim(),
          email: trimmedEmail,
          phone: quotePhone.trim(),
          tourType: quoteTourType,
          packageSlug: activePackageSlug || "",
          packageName: activePackageTitle || "",
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            "Unable to submit quote request at this moment. Please call us directly."
        )
      }

      setSuccessReference(data.reference || null)
      setCountdown(5)
      setIsSuccess(true)
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try calling our desk directly."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* =========================================================================
          FLOATING CONTACT ACTION RAIL (Fixed Right Edge, Middle Viewport)
          ========================================================================= */}
      <aside
        id="floating-contact-rail"
        aria-label="Direct Contact Actions"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-1 sm:gap-2 pointer-events-auto"
      >
        {/* 1. CALL US BUTTON — Orange Background, White Phone Icon */}
        <a
          href={telHref}
          aria-label={`Call MTPL Travel Desk at ${primaryPhone}`}
          title={`Call Us directly at ${primaryPhone}`}
          className="group relative flex flex-col items-center justify-center bg-[#F97316] hover:bg-[#EA580C] text-white rounded-l-xl sm:rounded-l-2xl shadow-md hover:shadow-lg w-8 sm:w-11 py-2 sm:py-3 px-0.5 sm:px-1 transition-all duration-200 hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F97316]"
        >
          <Phone className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2] shrink-0" aria-hidden="true" />
          <span
            className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white [writing-mode:vertical-rl] rotate-180 select-none whitespace-nowrap mt-1"
            style={{ textOrientation: "mixed" }}
          >
            Call Us
          </span>
        </a>

        {/* 2. WHATSAPP BUTTON — Bright Green Background, White WhatsApp Icon */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with MTPL on WhatsApp"
          title="Chat directly on WhatsApp with our team"
          className="group relative flex flex-col items-center justify-center bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-l-xl sm:rounded-l-2xl shadow-md hover:shadow-lg w-8 sm:w-11 py-2 sm:py-3 px-0.5 sm:px-1 transition-all duration-200 hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current text-white shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.67-1.39 1.29-1.93 1.37-.51.08-1.18.12-3.41-.81-2.85-1.19-4.68-4.11-4.82-4.3-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.27.53-.34.71-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.54.77 1.88.84 2.01.07.14.12.3.02.48-.09.19-.14.3-.28.46-.14.17-.3.37-.43.5-.14.14-.29.3-.13.57.17.27.75 1.24 1.61 2 1.11.98 2.04 1.29 2.33 1.43.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.38-.24.64-.15.26.09 1.66.78 1.95.92.29.14.48.22.55.34.07.14.07.78-.17 1.45z" />
          </svg>
          <span
            className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white [writing-mode:vertical-rl] rotate-180 select-none whitespace-nowrap mt-1"
            style={{ textOrientation: "mixed" }}
          >
            WhatsApp
          </span>
        </a>

        {/* 3. CALLBACK BUTTON — Warm Amber Background, White PhoneCall Icon */}
        <button
          type="button"
          onClick={handleOpenCallbackModal}
          aria-label="Request a Callback from MTPL"
          title="Request a quick callback from our travel experts"
          className="group relative flex flex-col items-center justify-center bg-[#D97706] hover:bg-[#B45309] text-white rounded-l-xl sm:rounded-l-2xl shadow-md hover:shadow-lg w-8 sm:w-11 py-2 sm:py-3 px-0.5 sm:px-1 transition-all duration-200 hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D97706] cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2] shrink-0" aria-hidden="true" />
          <span
            className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white [writing-mode:vertical-rl] rotate-180 select-none whitespace-nowrap mt-1"
            style={{ textOrientation: "mixed" }}
          >
            Callback
          </span>
        </button>

        {/* 4. GET A FREE QUOTE BUTTON — Deep Blue Background, White Envelope Icon */}
        <button
          type="button"
          onClick={handleOpenQuoteModal}
          aria-label="Get a Free Custom Quote"
          title="Get a customized quote tailored to your trip"
          className="group relative flex flex-col items-center justify-center bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-l-xl sm:rounded-l-2xl shadow-md hover:shadow-lg w-8 sm:w-11 py-2 sm:py-3 px-0.5 sm:px-1 transition-all duration-200 hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A] cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2] shrink-0" aria-hidden="true" />
          <span
            className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white [writing-mode:vertical-rl] rotate-180 select-none whitespace-nowrap mt-1"
            style={{ textOrientation: "mixed" }}
          >
            Get a Free Quote
          </span>
        </button>
      </aside>

      {/* =========================================================================
          SEPARATE MODAL 1: REQUEST A CALLBACK (Dedicated Dialog)
          ========================================================================= */}
      {isClient && activeModal === "callback" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="callback-modal-title"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-100 flex flex-col pointer-events-auto transform animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* Success View */
              <div className="text-center py-5 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                    Thank You!
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-sm mx-auto font-medium">
                    Your callback request has been received. Our team will call you back within 24 hours.
                  </p>
                </div>

                {successReference && (
                  <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700">
                    <span>Reference:</span>
                    <span className="font-mono text-emerald-700 font-bold">{successReference}</span>
                  </div>
                )}

                {/* 5-Second Auto-Close Indicator */}
                <div className="pt-2 pb-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Closing automatically in <strong className="text-slate-800 font-bold">{countdown}s</strong></span>
                  </div>
                  <div className="w-36 h-1 bg-slate-100 rounded-full mx-auto mt-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${(countdown / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Explicit Close Button */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-7 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm hover:shadow"
                  >
                    Close Now
                  </button>
                </div>
              </div>
            ) : (
              /* Callback Form */
              <div>
                {/* Header */}
                <div className="pr-8 mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/80 mb-2">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                    <span>Direct Concierge Desk</span>
                  </div>
                  <h3
                    id="callback-modal-title"
                    className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight"
                  >
                    Request a Callback
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5 leading-snug">
                    Leave your contact number. An MTPL holiday specialist will call you back within 24 hours.
                  </p>
                </div>

                {/* Package Context Tag (if available) */}
                {activePackageTitle && (
                  <div className="mb-4 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-center gap-2.5 text-xs text-amber-900">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="truncate font-medium">
                      Tour: <strong className="font-bold">{activePackageTitle}</strong>
                    </span>
                  </div>
                )}

                {serverError && (
                  <div className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-medium border border-rose-200/80 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitCallback} noValidate className="space-y-4">
                  {/* Name Field (OPTIONAL) */}
                  <div>
                    <label
                      htmlFor="sep-callback-name"
                      className="block text-xs font-bold text-slate-800 mb-1.5 font-sans"
                    >
                      Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="sep-callback-name"
                        type="text"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        maxLength={100}
                        placeholder="e.g. Rajesh Mishra"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-11 pl-10 pr-3.5 text-sm outline-none transition-all text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone Number Field (MANDATORY) */}
                  <div>
                    <label
                      htmlFor="sep-callback-phone"
                      className="block text-xs font-bold text-slate-800 mb-1.5 font-sans"
                    >
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        ref={callbackPhoneRef}
                        id="sep-callback-phone"
                        type="tel"
                        value={callbackPhone}
                        onChange={(e) => {
                          setCallbackPhone(e.target.value)
                          if (callbackPhoneError) setCallbackPhoneError(null)
                          if (serverError) setServerError(null)
                        }}
                        maxLength={25}
                        placeholder="+91 98765 43210"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(callbackPhoneError)}
                        aria-describedby={callbackPhoneError ? "sep-callback-phone-error" : undefined}
                        className={`w-full bg-slate-50 border rounded-2xl h-11 pl-10 pr-3.5 text-sm outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                          callbackPhoneError
                            ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                            : "border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white"
                        }`}
                      />
                    </div>
                    {callbackPhoneError && (
                      <p
                        id="sep-callback-phone-error"
                        className="text-rose-600 text-xs mt-1.5 font-medium flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{callbackPhoneError}</span>
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400 mt-1">
                      Accepts Indian 10-digit mobile numbers or international numbers.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#D97706] hover:bg-[#B45309] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Requesting Callback...</span>
                        </>
                      ) : (
                        <>
                          <PhoneCall className="w-4 h-4" />
                          <span>Request a Callback</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your phone number is strictly kept confidential.</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SEPARATE MODAL 2: GET A FREE QUOTE (Dedicated Dialog)
          ========================================================================= */}
      {isClient && activeModal === "quote" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-100 flex flex-col pointer-events-auto transform animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* Success View */
              <div className="text-center py-5 space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                    Thank You!
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-sm mx-auto font-medium">
                    Your quote request has been received. Our team will contact you with customized options within 24 hours.
                  </p>
                </div>

                {successReference && (
                  <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700">
                    <span>Reference:</span>
                    <span className="font-mono text-blue-700 font-bold">{successReference}</span>
                  </div>
                )}

                {/* 5-Second Auto-Close Indicator */}
                <div className="pt-2 pb-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Closing automatically in <strong className="text-slate-800 font-bold">{countdown}s</strong></span>
                  </div>
                  <div className="w-36 h-1 bg-slate-100 rounded-full mx-auto mt-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
                      style={{ width: `${(countdown / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Explicit Close Button */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-7 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm hover:shadow"
                  >
                    Close Now
                  </button>
                </div>
              </div>
            ) : (
              /* Quote Form */
              <div>
                {/* Header */}
                <div className="pr-8 mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200/80 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Personalized Itinerary &amp; Rates</span>
                  </div>
                  <h3
                    id="quote-modal-title"
                    className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight"
                  >
                    Get a Free Quote
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5 leading-snug">
                    Receive transparent rates and customized proposals tailored to your travel dates.
                  </p>
                </div>

                {/* Package Context Tag (if available) */}
                {activePackageTitle && (
                  <div className="mb-4 p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-2.5 text-xs text-blue-900">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="truncate font-medium">
                      Tour Package: <strong className="font-bold">{activePackageTitle}</strong>
                    </span>
                  </div>
                )}

                {serverError && (
                  <div className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-medium border border-rose-200/80 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitQuote} noValidate className="space-y-3.5">
                  {/* Name Field (OPTIONAL) */}
                  <div>
                    <label
                      htmlFor="sep-quote-name"
                      className="block text-xs font-bold text-slate-800 mb-1 font-sans"
                    >
                      Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="sep-quote-name"
                        type="text"
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        maxLength={100}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-10.5 pl-10 pr-3.5 text-sm outline-none transition-all text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Email Field (MANDATORY) */}
                  <div>
                    <label
                      htmlFor="sep-quote-email"
                      className="block text-xs font-bold text-slate-800 mb-1 font-sans"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        ref={quoteEmailRef}
                        id="sep-quote-email"
                        type="email"
                        value={quoteEmail}
                        onChange={(e) => {
                          setQuoteEmail(e.target.value)
                          if (quoteEmailError) setQuoteEmailError(null)
                          if (serverError) setServerError(null)
                        }}
                        maxLength={120}
                        placeholder="e.g. priya@example.com"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(quoteEmailError)}
                        aria-describedby={quoteEmailError ? "sep-quote-email-error" : undefined}
                        className={`w-full bg-slate-50 border rounded-2xl h-10.5 pl-10 pr-3.5 text-sm outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                          quoteEmailError
                            ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                            : "border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white"
                        }`}
                      />
                    </div>
                    {quoteEmailError && (
                      <p
                        id="sep-quote-email-error"
                        className="text-rose-600 text-xs mt-1 font-medium flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{quoteEmailError}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field (MANDATORY) */}
                  <div>
                    <label
                      htmlFor="sep-quote-phone"
                      className="block text-xs font-bold text-slate-800 mb-1 font-sans"
                    >
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="sep-quote-phone"
                        type="tel"
                        value={quotePhone}
                        onChange={(e) => {
                          setQuotePhone(e.target.value)
                          if (quotePhoneError) setQuotePhoneError(null)
                          if (serverError) setServerError(null)
                        }}
                        maxLength={25}
                        placeholder="+91 98765 43210"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(quotePhoneError)}
                        aria-describedby={quotePhoneError ? "sep-quote-phone-error" : undefined}
                        className={`w-full bg-slate-50 border rounded-2xl h-10.5 pl-10 pr-3.5 text-sm outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                          quotePhoneError
                            ? "border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-200"
                            : "border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white"
                        }`}
                      />
                    </div>
                    {quotePhoneError && (
                      <p
                        id="sep-quote-phone-error"
                        className="text-rose-600 text-xs mt-1 font-medium flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{quotePhoneError}</span>
                      </p>
                    )}
                  </div>

                  {/* Tour Type Selector — Modern Interactive Segmented Cards (NOT unstyled browser select) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="block text-xs font-bold text-slate-800 font-sans">
                        Tour Type <span className="text-slate-400 font-normal">(Optional)</span>
                      </span>
                      {quoteTourType && (
                        <button
                          type="button"
                          onClick={() => setQuoteTourType("")}
                          className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* International Option Card */}
                      <button
                        type="button"
                        onClick={() =>
                          setQuoteTourType((prev) => (prev === "international" ? "" : "international"))
                        }
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                          quoteTourType === "international"
                            ? "border-blue-600 bg-blue-50/80 text-blue-950 shadow-xs ring-2 ring-blue-600/20"
                            : "border-slate-200 bg-slate-50/70 hover:border-slate-300 text-slate-700 hover:bg-slate-100/60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            quoteTourType === "international"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-slate-500 border border-slate-200"
                          }`}
                        >
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold truncate leading-tight">
                            International
                          </span>
                          <span className="block text-[10px] text-slate-500 font-normal truncate">
                            World Holiday
                          </span>
                        </div>
                      </button>

                      {/* National Option Card */}
                      <button
                        type="button"
                        onClick={() =>
                          setQuoteTourType((prev) => (prev === "national" ? "" : "national"))
                        }
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                          quoteTourType === "national"
                            ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-xs ring-2 ring-emerald-600/20"
                            : "border-slate-200 bg-slate-50/70 hover:border-slate-300 text-slate-700 hover:bg-slate-100/60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            quoteTourType === "national"
                              ? "bg-emerald-600 text-white"
                              : "bg-white text-slate-500 border border-slate-200"
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold truncate leading-tight">
                            National
                          </span>
                          <span className="block text-[10px] text-slate-500 font-normal truncate">
                            Discover India
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Preparing Your Quote...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Quote Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Free customized proposal with zero booking obligation.</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

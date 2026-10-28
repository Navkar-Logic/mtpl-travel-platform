"use client"

import * as React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronDown, Check, AlertCircle, X } from "lucide-react"

interface ValidationIssue {
  field: "fullName" | "email" | "phone" | "message" | "consent"
  message: string
}

const travelTypeOptions = [
  { value: "", label: "Select Travel Type (Optional)" },
  { value: "domestic", label: "Domestic Travel" },
  { value: "international", label: "International Travel" },
  { value: "cruises", label: "Luxury Cruise Vacations" },
  { value: "corporate", label: "Corporate / Business Travel" },
  { value: "holidays-visas", label: "Holidays & Visa Services" },
  { value: "forex-insurance", label: "Forex & Travel Insurance" },
  { value: "group-custom", label: "Custom / Group Tour (FIT & GIT)" },
  { value: "other", label: "Other Travel Inquiries" },
]

export function EnquiryForm() {
  const searchParams = useSearchParams()
  const defaultPackage = searchParams?.get("package") || ""
  const defaultDestination = searchParams?.get("destination") || ""
  const defaultOffer = searchParams?.get("offer") || ""
  const defaultService = searchParams?.get("service") || ""

  const initialSource = defaultPackage
    ? "package"
    : defaultDestination
    ? "destination"
    : defaultOffer
    ? "offer"
    : defaultService
    ? "service"
    : "general"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const getMappedTravelType = React.useCallback((serviceName: string) => {
    if (!serviceName) return ""
    const s = serviceName.toLowerCase()
    if (s.includes("corporate") || s.includes("group")) return "corporate"
    if (s.includes("holiday") || s.includes("visa") || s.includes("passport")) return "holidays-visas"
    if (s.includes("cruise")) return "international"
    if (s.includes("flight") || s.includes("hotel")) return "domestic"
    if (s.includes("forex") || s.includes("insurance")) return "other"
    return ""
  }, [])

  // Modern Dropdown State
  const [selectedTravelType, setSelectedTravelType] = useState(() => getMappedTravelType(defaultService))
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Validation & Modal State
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([])
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>({})

  // Form field refs for focusing after error popup
  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const consentRef = useRef<HTMLDivElement>(null)

  // Customer Terms Acceptance State (Single Checkbox with Hyperlink)
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsTermsAccepted(checked)
    if (checked && invalidFields.consent) {
      setInvalidFields((prev) => ({ ...prev, consent: false }))
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCloseValidationModal = useCallback(() => {
    setShowValidationModal(false)
    // Focus the first invalid field
    if (validationIssues.length > 0) {
      const firstInvalidField = validationIssues[0].field
      if (firstInvalidField === "fullName") fullNameRef.current?.focus()
      else if (firstInvalidField === "email") emailRef.current?.focus()
      else if (firstInvalidField === "phone") phoneRef.current?.focus()
      else if (firstInvalidField === "message") messageRef.current?.focus()
      else if (firstInvalidField === "consent") {
        consentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [validationIssues])

  // Close validation modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && showValidationModal) {
        handleCloseValidationModal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showValidationModal, handleCloseValidationModal])

  // Lock body scroll when validation modal is open
  useEffect(() => {
    if (showValidationModal) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [showValidationModal])

  function validateForm(formData: FormData): ValidationIssue[] {
    const issues: ValidationIssue[] = []
    const fullName = (formData.get("fullName") as string || "").trim()
    const email = (formData.get("email") as string || "").trim()
    const phone = (formData.get("phone") as string || "").trim()
    const message = (formData.get("message") as string || "").trim()

    // 1. Full Name
    if (!fullName) {
      issues.push({ field: "fullName", message: "Full Name is required (e.g. Rejesh Mishra)." })
    } else if (fullName.length < 2) {
      issues.push({ field: "fullName", message: "Full Name must contain at least 2 characters." })
    }

    // 2. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      issues.push({ field: "email", message: "Email Address is required (e.g. rajesh@gmail.com)." })
    } else if (!emailRegex.test(email)) {
      issues.push({ field: "email", message: "Please provide a valid email format (e.g. rajesh@gmail.com)." })
    }

    // 3. Phone Number
    const phoneDigits = phone.replace(/\D/g, "")
    if (!phone) {
      issues.push({ field: "phone", message: "Phone Number is required (e.g. +91 9999999999)." })
    } else if (phoneDigits.length < 8) {
      issues.push({ field: "phone", message: "Phone Number must contain at least 8 digits." })
    }

    // 4. Message
    if (!message) {
      issues.push({ field: "message", message: "Trip Planning Details message is required." })
    } else if (message.length < 10) {
      issues.push({ field: "message", message: "Trip Planning Details must be at least 10 characters long." })
    }

    // 5. Customer Terms & Conditions Acceptance
    if (!isTermsAccepted) {
      issues.push({
        field: "consent",
        message: "Please accept the Terms & Conditions before submitting your enquiry.",
      })
    }

    return issues
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerError(null)

    const formData = new FormData(e.currentTarget)
    // Make sure custom travelType is populated
    formData.set("travelType", selectedTravelType)

    // Check mandatory validation
    const issues = validateForm(formData)
    if (issues.length > 0) {
      setValidationIssues(issues)
      const fieldMap: Record<string, boolean> = {}
      issues.forEach((issue) => {
        fieldMap[issue.field] = true
      })
      setInvalidFields(fieldMap)
      setShowValidationModal(true)
      return
    }

    // Valid: clear issues and submit
    setInvalidFields({})
    setValidationIssues([])
    setIsSubmitting(true)

    const rawData = Object.fromEntries(formData.entries())
    let normalizedTravelType = selectedTravelType
    if (normalizedTravelType === "cruises") normalizedTravelType = "international"
    if (normalizedTravelType === "forex-insurance") normalizedTravelType = "other"

    const payload = {
      ...rawData,
      travelType: normalizedTravelType,
      consentAccepted: isTermsAccepted,
      declarations: {
        accuracyConfirmed: isTermsAccepted,
        communicationConsent: isTermsAccepted,
        privacyAcknowledged: isTermsAccepted,
        bookingDisclaimerAcknowledged: isTermsAccepted,
        termsAcknowledged: isTermsAccepted,
      },
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => null)
        const errMsg = errJson?.message || "Failed to submit enquiry. Please check your inputs and try again."
        throw new Error(errMsg)
      }

      setSuccess(true)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError("An unexpected error occurred.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleFieldChange(fieldName: string) {
    if (invalidFields[fieldName]) {
      setInvalidFields((prev) => ({ ...prev, [fieldName]: false }))
    }
  }

  if (success) {
    return (
      <div className="bg-brand/5 border border-brand/20 p-8 rounded-3xl text-center h-full flex flex-col justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand/20">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-3 font-sans">Enquiry Received</h3>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed font-light">
          Thank you for reaching out. MTPL&apos;s travel experts will get in touch with you shortly to assist with your journey.
        </p>
        <button
          onClick={() => {
            setSuccess(false)
            setSelectedTravelType("")
            setIsTermsAccepted(false)
          }}
          className="text-brand font-bold hover:underline transition-all"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  const selectedOptionLabel =
    travelTypeOptions.find((opt) => opt.value === selectedTravelType)?.label ||
    "Select Travel Type (Optional)"

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative"
      >
        <input type="hidden" name="source" value={initialSource} />
        {defaultPackage && <input type="hidden" name="packageSlug" value={defaultPackage} />}
        {defaultDestination && <input type="hidden" name="destinationSlug" value={defaultDestination} />}
        {defaultOffer && <input type="hidden" name="offerSlug" value={defaultOffer} />}
        {defaultService && <input type="hidden" name="serviceId" value={defaultService} />}
        <input type="hidden" name="travelType" value={selectedTravelType} />

        {/* Honeypot field for spam bots */}
        <div className="hidden" aria-hidden="true">
          <label>
            Don&apos;t fill this out if you&apos;re human:{" "}
            <input type="text" name="honeypot" tabIndex={-1} />
          </label>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans">Send an Enquiry</h2>
          <p className="text-slate-500 text-sm font-light">
            Fill out the form below and our travel consultants will contact you shortly.
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {(defaultPackage || defaultDestination || defaultOffer || defaultService) && (
          <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Enquiring about</p>
              <p className="text-slate-900 font-bold text-base capitalize">
                {(defaultPackage || defaultDestination || defaultOffer || defaultService)?.replace(/-/g, " ")}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-slate-900 mb-2 font-sans">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={fullNameRef}
              id="fullName"
              name="fullName"
              type="text"
              onChange={() => handleFieldChange("fullName")}
              className={`w-full bg-slate-50 border rounded-xl h-12 px-4 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                invalidFields.fullName
                  ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                  : "border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white"
              }`}
              placeholder="Rejesh Mishra"
            />
            {invalidFields.fullName && (
              <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                <span>Please enter your full name.</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2 font-sans">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              onChange={() => handleFieldChange("email")}
              className={`w-full bg-slate-50 border rounded-xl h-12 px-4 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                invalidFields.email
                  ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                  : "border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white"
              }`}
              placeholder="rajesh@gmail.com"
            />
            {invalidFields.email && (
              <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                <span>Please enter a valid email address.</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2 font-sans">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              ref={phoneRef}
              id="phone"
              name="phone"
              type="tel"
              onChange={() => handleFieldChange("phone")}
              className={`w-full bg-slate-50 border rounded-xl h-12 px-4 outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                invalidFields.phone
                  ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                  : "border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white"
              }`}
              placeholder="+91 9999999999"
            />
            {invalidFields.phone && (
              <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                <span>Please enter a valid phone number.</span>
              </p>
            )}
          </div>

          {/* Modern Dropdown: Travel Type */}
          <div ref={dropdownRef} className="relative">
            <label htmlFor="travelTypeTrigger" className="block text-sm font-bold text-slate-900 mb-2 font-sans">
              Travel Type
            </label>
            <button
              id="travelTypeTrigger"
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl h-12 px-4 flex items-center justify-between text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className={selectedTravelType ? "text-slate-900 font-medium" : "text-slate-500"}>
                {selectedOptionLabel}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-brand" : ""
                }`}
              />
            </button>

            {/* Floating Modern Dropdown Menu */}
            {isDropdownOpen && (
              <div
                role="listbox"
                className="absolute top-full left-0 right-0 mt-2 z-40 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-1.5 overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95"
              >
                {travelTypeOptions.map((opt) => {
                  const isSelected = selectedTravelType === opt.value
                  return (
                    <div
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedTravelType(opt.value)
                        setIsDropdownOpen(false)
                      }}
                      className={`px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-brand"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-brand" />}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2 font-sans">
            How can we help you plan your trip? <span className="text-red-500">*</span>
          </label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            rows={5}
            onChange={() => handleFieldChange("message")}
            className={`w-full bg-slate-50 border rounded-xl p-4 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400 ${
              invalidFields.message
                ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                : "border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white"
            }`}
            placeholder="Tell us about your travel plans, dates, preferred destinations, or specific requirements..."
          />
          {invalidFields.message && (
            <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
              <span>Please describe your travel plans (minimum 10 characters).</span>
            </p>
          )}
        </div>

        {/* Customer Terms & Conditions (Single Point Checkbox) */}
        <div
          ref={consentRef}
          tabIndex={-1}
          className={`mb-8 p-4 sm:p-5 rounded-2xl border transition-all ${
            invalidFields.consent
              ? "bg-red-50/40 border-red-300 ring-2 ring-red-200"
              : "bg-slate-50/80 border-slate-200/90 hover:border-slate-300"
          }`}
        >
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={isTermsAccepted}
              onChange={handleTermsChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/30 accent-emerald-600 cursor-pointer flex-shrink-0"
            />
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span>I confirm that the information provided is accurate and I accept the </span>
              <Link
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-brand font-bold underline underline-offset-2 hover:text-emerald-700 transition-colors inline-block"
              >
                Terms &amp; Conditions
              </Link>
              <span className="text-red-500 font-bold ml-1">*</span>
            </div>
          </label>

          {invalidFields.consent && (
            <p className="text-red-600 text-xs mt-2.5 font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Please accept the Terms &amp; Conditions before submitting.</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isTermsAccepted}
          className="w-full h-14 bg-gradient-brand text-white rounded-xl font-bold text-lg hover:opacity-95 hover:shadow-[0_8px_25px_rgba(14,116,67,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Enquiry...
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>

        {!isTermsAccepted && (
          <p className="text-center text-xs text-slate-400 mt-2.5 font-medium">
            * Please accept the Terms &amp; Conditions above to enable enquiry submission.
          </p>
        )}

        <p className="text-center text-xs text-slate-400 mt-6 font-medium">
          Your information is secure and will only be used by MTPL to assist with your travel planning.
        </p>
      </form>



      {/* Mandatory Validation Error Popup Modal */}
      {isClient && showValidationModal && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="validation-modal-title"
          onClick={handleCloseValidationModal}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-100 flex flex-col pointer-events-auto transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseValidationModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close alert"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Icon */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 id="validation-modal-title" className="text-xl font-bold text-slate-900 font-sans">
                  Missing Required Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
                  Please complete the following mandatory details before submitting your enquiry:
                </p>
              </div>
            </div>

            {/* Specific Issues List */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 mb-6">
              <ul className="space-y-2.5 text-sm text-slate-700">
                {validationIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span className="leading-snug">{issue.message}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={handleCloseValidationModal}
              className="w-full h-12 bg-gradient-brand text-white font-bold rounded-xl hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Fix Details & Continue
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

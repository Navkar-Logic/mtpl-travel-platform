"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export function FeedbackForm() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    packageOrService: "",
    feedback: "",
    honeypot: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState<{ reference?: string } | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 15) {
        errs.phone = "Please enter a valid phone number (7-15 digits).";
      }
    }

    if (!formData.feedback.trim()) {
      errs.feedback = "Please share your feedback comments.";
    } else if (formData.feedback.trim().length < 10) {
      errs.feedback = "Please write a bit more detail (at least 10 characters).";
    } else if (formData.feedback.trim().length > 3000) {
      errs.feedback = "Feedback text cannot exceed 3,000 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback. Please try again.");
      }

      setSubmitSuccess({ reference: data.reference });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        packageOrService: "",
        feedback: "",
        honeypot: "",
      });
      setErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="feedback-form" className="scroll-mt-24">
      <div className="bg-white rounded-3xl border border-[#E3EBE7] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(6,61,42,0.04)]">
        {/* Section C: Header & Intro */}
        <div className="max-w-2xl mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F0FDF4] text-[#16A765] border border-[#DCFCE7] mb-3">
            <span>Direct Feedback Channel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#063D2A] font-sans tracking-tight">
            Share Your Experience
          </h2>
          <p className="text-sm sm:text-base text-[#66736D] mt-3 leading-relaxed">
            Whether you have a suggestion, a compliment, or a concern about your experience with MTPL, we welcome your feedback. Your message will help our team understand what went well and where we can improve.
          </p>
        </div>

        {submitSuccess ? (
          <div className="p-8 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] text-left space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#16A765] flex-shrink-0" />
              <h3 className="text-lg font-bold text-[#063D2A]">
                Thank you for your feedback!
              </h3>
            </div>
            <p className="text-sm text-[#17201C] leading-relaxed">
              Your feedback has been received and logged in our system. A confirmation email has been sent to your email address.
            </p>
            {submitSuccess.reference && (
              <p className="text-xs text-[#66736D] font-mono">
                Submission Reference:{" "}
                <span className="font-bold text-[#063D2A] bg-white px-2 py-0.5 rounded border border-[#DCFCE7]">
                  {submitSuccess.reference}
                </span>
              </p>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmitSuccess(null)}
                className="text-xs font-bold text-[#16A765] hover:text-[#063D2A] transition-colors underline"
              >
                Submit another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
            {/* Honeypot field (hidden from legitimate users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="feedback-honeypot">Leave this blank</label>
              <input
                id="feedback-honeypot"
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name (Required) */}
              <div>
                <label
                  htmlFor="feedback-fullName"
                  className="block text-xs font-bold uppercase tracking-wider text-[#063D2A] mb-2"
                >
                  Full Name <span className="text-[#16A765]">*</span>
                </label>
                <input
                  id="feedback-fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                    errors.fullName
                      ? "border-red-400 bg-red-50/40 focus:border-red-500"
                      : "border-[#D6DFDB] bg-white focus:border-[#16A765] focus:ring-2 focus:ring-[#16A765]/10"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address (Required) */}
              <div>
                <label
                  htmlFor="feedback-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#063D2A] mb-2"
                >
                  Email Address <span className="text-[#16A765]">*</span>
                </label>
                <input
                  id="feedback-email"
                  name="email"
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                    errors.email
                      ? "border-red-400 bg-red-50/40 focus:border-red-500"
                      : "border-[#D6DFDB] bg-white focus:border-[#16A765] focus:ring-2 focus:ring-[#16A765]/10"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number (Optional) */}
              <div>
                <label
                  htmlFor="feedback-phone"
                  className="block text-xs font-bold uppercase tracking-wider text-[#063D2A] mb-2"
                >
                  Phone Number{" "}
                  <span className="text-xs font-normal text-[#66736D] lowercase">
                    (optional)
                  </span>
                </label>
                <input
                  id="feedback-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98230 12345"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                    errors.phone
                      ? "border-red-400 bg-red-50/40 focus:border-red-500"
                      : "border-[#D6DFDB] bg-white focus:border-[#16A765] focus:ring-2 focus:ring-[#16A765]/10"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Package or Service (Optional) */}
              <div>
                <label
                  htmlFor="feedback-packageOrService"
                  className="block text-xs font-bold uppercase tracking-wider text-[#063D2A] mb-2"
                >
                  Package or Service{" "}
                  <span className="text-xs font-normal text-[#66736D] lowercase">
                    (optional)
                  </span>
                </label>
                <input
                  id="feedback-packageOrService"
                  name="packageOrService"
                  type="text"
                  placeholder="e.g. Best of Himachal Tour / Flight Booking"
                  value={formData.packageOrService}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#D6DFDB] bg-white text-sm transition-all outline-none focus:border-[#16A765] focus:ring-2 focus:ring-[#16A765]/10"
                />
              </div>
            </div>

            {/* Your Feedback (Required) */}
            <div>
              <label
                htmlFor="feedback-message"
                className="block text-xs font-bold uppercase tracking-wider text-[#063D2A] mb-2"
              >
                Your Feedback <span className="text-[#16A765]">*</span>
              </label>
              <textarea
                id="feedback-message"
                name="feedback"
                required
                rows={5}
                placeholder="Share your thoughts, compliments, suggestions, or concerns regarding your trip..."
                value={formData.feedback}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none resize-y ${
                  errors.feedback
                    ? "border-red-400 bg-red-50/40 focus:border-red-500"
                    : "border-[#D6DFDB] bg-white focus:border-[#16A765] focus:ring-2 focus:ring-[#16A765]/10"
                }`}
              />
              <div className="flex items-center justify-between mt-1.5">
                {errors.feedback ? (
                  <p className="text-xs text-red-600 font-medium">{errors.feedback}</p>
                ) : (
                  <span className="text-[11px] text-[#66736D]">
                    Minimum 10 characters
                  </span>
                )}
                <span className="text-[11px] text-[#66736D]">
                  {formData.feedback.length} / 3000
                </span>
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-[#66736D] leading-relaxed">
              Your contact details will be used solely to process your feedback and communicate with you regarding your submission. Learn more in our{" "}
              <Link
                href="/privacy-policy"
                className="text-[#16A765] font-semibold underline hover:text-[#063D2A] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#16A765] hover:bg-[#128a53] text-white font-bold text-sm shadow-[0_2px_8px_rgba(22,167,101,0.25)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Feedback...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

import "server-only";
import path from "path";
import fs from "fs";
import { siteConfig } from "@/config/site";
import type { EmailConfig } from "./types";

/**
 * Parses and returns the centralized email & SMTP configuration.
 * Safe fallback to siteConfig contact details if specific email variables are absent.
 */
export function getEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  const fromName = process.env.SMTP_FROM_NAME || "Mishrikotkar Travels (MTPL)";
  const fromEmail = process.env.SMTP_FROM_EMAIL || siteConfig.contact.email;
  const notificationRecipient = process.env.ENQUIRY_NOTIFICATION_EMAIL || siteConfig.contact.email;

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");
  const supportPhone = process.env.SUPPORT_PHONE || siteConfig.contact.phones.primary;
  const supportWhatsApp = process.env.SUPPORT_WHATSAPP || "918381006600";

  const isConfigured = Boolean(host && user && pass);

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromName,
    fromEmail,
    notificationRecipient,
    appUrl,
    supportPhone,
    supportWhatsApp,
    isConfigured,
  };
}

/**
 * Checks if SMTP transport credentials have been properly configured.
 */
export function isSmtpConfigured(): boolean {
  return getEmailConfig().isConfigured;
}

/**
 * HTML escaper to protect email clients from stored XSS or formatting injection.
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Converts a raw customer phone string into a clean, clickable tel: protocol link.
 * Preserves leading '+' if present and removes all whitespace, dashes, and parentheses.
 */
export function formatTelUrl(rawPhone: string): string {
  if (!rawPhone) return "";
  const cleaned = rawPhone.trim().replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

/**
 * Formats a phone number for WhatsApp direct messaging without '+', spaces, or punctuation.
 * Automatically handles standard Indian 10-digit mobile numbers by prepending country code '91'.
 */
export function formatWhatsAppUrl(rawPhone: string): string | null {
  if (!rawPhone) return null;
  let digits = rawPhone.replace(/\D/g, "");
  if (!digits) return null;

  // Strip international dialing access prefix 00
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // Prepend India country code (91) for 10-digit mobile numbers starting with 6-9
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    digits = `91${digits}`;
  } else if (digits.length === 11 && digits.startsWith("0") && /^[6-9]/.test(digits.slice(1))) {
    // Leading single zero: 09876543210 -> 919876543210
    digits = `91${digits.slice(1)}`;
  }

  // Plausible international length check
  if (digits.length < 8) return null;

  return `https://wa.me/${digits}`;
}

export interface EmailLogoAttachment {
  filename: string;
  path?: string;
  cid: string;
  exists: boolean;
}

/**
 * Resolves the primary MTPL desktop logo for white-header email rendering.
 * Asset: public/assets/mtpl-desktop-logo.png
 */
export function getHeaderLogoAttachment(): EmailLogoAttachment {
  const logoRelative = path.join("public", "assets", "mtpl-desktop-logo.png");
  const logoPath = path.resolve(process.cwd(), logoRelative);
  const exists = fs.existsSync(logoPath);

  return {
    filename: "mtpl-desktop-logo.png",
    path: exists ? logoPath : undefined,
    cid: "mtpl-desktop-logo",
    exists,
  };
}

/**
 * Resolves the MTPL footer logo for inline MIME Content-ID email embedding.
 * Asset: public/assets/mtpl-footer-logo.png
 */
export function getFooterLogoAttachment(): EmailLogoAttachment {
  const logoRelative = path.join("public", "assets", "mtpl-footer-logo.png");
  const logoPath = path.resolve(process.cwd(), logoRelative);
  const exists = fs.existsSync(logoPath);

  return {
    filename: "mtpl-footer-logo.png",
    path: exists ? logoPath : undefined,
    cid: "mtpl-footer-logo",
    exists,
  };
}

/**
 * Resolves both header and footer logo attachments for email transports.
 * Attaches both files inline with matching Content-IDs (cid:mtpl-desktop-logo and cid:mtpl-footer-logo).
 */
export function getEmailLogoAttachments(): Array<{
  filename: string;
  path: string;
  cid: string;
}> {
  const header = getHeaderLogoAttachment();
  const footer = getFooterLogoAttachment();
  const attachments: Array<{ filename: string; path: string; cid: string }> = [];

  if (header.exists && header.path) {
    attachments.push({
      filename: header.filename,
      path: header.path,
      cid: header.cid,
    });
  }

  if (footer.exists && footer.path) {
    attachments.push({
      filename: footer.filename,
      path: footer.path,
      cid: footer.cid,
    });
  }

  return attachments;
}

/**
 * Legacy compatibility resolver. Defaults to header logo attachment.
 */
export function getLogoAttachment(): EmailLogoAttachment {
  return getHeaderLogoAttachment();
}

/**
 * Returns a stable, email-compatible HTTPS hosted URL for the header logo.
 * Uses the verified production domain canonical URL as the primary fallback.
 */
export function getHeaderLogoUrl(config?: EmailConfig): string {
  if (config?.appUrl && !config.appUrl.includes("localhost") && !config.appUrl.includes("127.0.0.1")) {
    return `${config.appUrl}/assets/mtpl-desktop-logo.png`;
  }
  return "https://www.mishrikotkartravels.com/assets/mtpl-desktop-logo.png";
}

/**
 * Returns a stable, email-compatible HTTPS hosted URL for the footer logo.
 */
export function getFooterLogoUrl(config?: EmailConfig): string {
  if (config?.appUrl && !config.appUrl.includes("localhost") && !config.appUrl.includes("127.0.0.1")) {
    return `${config.appUrl}/assets/mtpl-footer-logo.png`;
  }
  return "https://www.mishrikotkartravels.com/assets/mtpl-footer-logo.png";
}


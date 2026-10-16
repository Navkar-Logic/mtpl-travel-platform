import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { EmailConfig } from "./types";

let cachedTransporter: Transporter | null = null;
let testTransporter: Transporter | null = null;

/**
 * Injects a test or mock transporter (used for offline automated testing).
 */
export function setTestTransporter(transporter: Transporter | null): void {
  testTransporter = transporter;
}

/**
 * Returns the active Nodemailer transporter.
 * Reuses the singleton cached transporter in production/development.
 */
export function getTransporter(config: EmailConfig): Transporter | null {
  if (testTransporter) {
    return testTransporter;
  }

  if (!config.isConfigured) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure, // true for 465, false for 587
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: true,
      },
      connectionTimeout: 10000, // 10s
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return cachedTransporter;
}

/**
 * Resets cached transporter (e.g., when config changes).
 */
export function resetTransporter(): void {
  cachedTransporter = null;
  testTransporter = null;
}

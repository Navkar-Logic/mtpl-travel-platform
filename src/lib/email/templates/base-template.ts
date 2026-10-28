import "server-only";
import { escapeHtml, getHeaderLogoUrl, getFooterLogoUrl } from "../config";
import type { EmailConfig } from "../types";

export interface EmailActionItem {
  label: string;
  url: string;
  type?: "primary" | "secondary" | "tel" | "whatsapp" | "email";
}

export interface EmailDetailField {
  label: string;
  value: string;
  rawHtml?: boolean;
}

export interface BaseEmailProps {
  subject: string;
  badgeText?: string;
  title: string;
  referenceCode?: string;
  introMessage?: string;
  details?: EmailDetailField[];
  customContentHtml?: string;
  actions?: EmailActionItem[];
  nextStepsTitle?: string;
  nextStepsText?: string;
  disclaimerText?: string;
  recipientType?: "customer" | "admin";
  headerLogoCid?: string;
  footerLogoCid?: string;
}

export const EMAIL_PALETTE = {
  primaryGreen: "#16A765",
  primaryHover: "#138E56",
  deepGreen: "#063D2A",
  lightGreen: "#A7F3C0",
  softGreenBg: "#EAF7F0",
  subtleGreenBorder: "#C6EBD7",
  pageBackground: "#F7F9F8",
  cardBackground: "#FFFFFF",
  panelBackground: "#F7F9F8",
  primaryText: "#17201C",
  secondaryText: "#66736D",
  mutedText: "#8C9993",
  border: "#E2E8E5",
  divider: "#E5EBE8",
} as const;

/**
 * Builds the unified, responsive HTML email string adhering strictly to MTPL's
 * corporate travel brand guidelines (white header with centered desktop logo,
 * inline CID footer logo, verified contact details).
 */
export function renderBaseEmailHtml(
  props: BaseEmailProps,
  config: EmailConfig
): string {
  const headerLogoSrc = props.headerLogoCid
    ? `cid:${props.headerLogoCid}`
    : getHeaderLogoUrl(config);

  const footerLogoSrc = props.footerLogoCid
    ? `cid:${props.footerLogoCid}`
    : getFooterLogoUrl(config);

  const safeSubject = escapeHtml(props.subject);
  const safeTitle = escapeHtml(props.title);
  const safeBadge = props.badgeText ? escapeHtml(props.badgeText) : null;
  const safeRef = props.referenceCode ? escapeHtml(props.referenceCode) : null;

  // Build Structured Information Panel
  let detailsTableHtml = "";
  if (props.details && props.details.length > 0) {
    const rows = props.details
      .map((field, idx) => {
        const isLast = idx === (props.details?.length ?? 0) - 1;
        const borderStyle = isLast ? "border-bottom: none;" : `border-bottom: 1px solid ${EMAIL_PALETTE.border};`;
        const renderedVal = field.rawHtml ? field.value : escapeHtml(field.value);

        return `
          <tr>
            <td style="width: 34%; padding: 11px 16px; font-size: 12px; font-weight: 600; color: ${EMAIL_PALETTE.secondaryText}; text-transform: uppercase; letter-spacing: 0.5px; ${borderStyle} vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${escapeHtml(field.label)}:
            </td>
            <td style="padding: 11px 16px; font-size: 14px; font-weight: 500; color: ${EMAIL_PALETTE.primaryText}; ${borderStyle} vertical-align: top; word-break: break-word; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${renderedVal}
            </td>
          </tr>
        `;
      })
      .join("");

    detailsTableHtml = `
      <div style="margin: 22px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: ${EMAIL_PALETTE.panelBackground}; border: 1px solid ${EMAIL_PALETTE.border}; border-radius: 8px; overflow: hidden;">
          ${rows}
        </table>
      </div>
    `;
  }

  // Build Action Buttons
  let actionsHtml = "";
  if (props.actions && props.actions.length > 0) {
    const buttons = props.actions
      .map((action) => {
        const isPrimary = action.type === "primary" || !action.type;
        const bg = isPrimary ? EMAIL_PALETTE.primaryGreen : EMAIL_PALETTE.softGreenBg;
        const textColor = isPrimary ? "#FFFFFF" : EMAIL_PALETTE.deepGreen;
        const border = isPrimary ? "none" : `1px solid ${EMAIL_PALETTE.lightGreen}`;

        return `
          <a href="${escapeHtml(action.url)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: ${bg}; color: ${textColor}; border: ${border}; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 6px; margin: 4px 6px 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${escapeHtml(action.label)}
          </a>
        `;
      })
      .join("");

    actionsHtml = `
      <div style="margin: 20px 0 10px 0; padding-top: 4px;">
        ${buttons}
      </div>
    `;
  }

  // Build Next Steps / Operational Follow-up
  let nextStepsHtml = "";
  if (props.nextStepsText) {
    const nextStepsHeading = props.nextStepsTitle || "Next Steps";
    nextStepsHtml = `
      <div style="margin: 24px 0 0 0; background-color: ${EMAIL_PALETTE.softGreenBg}; border-left: 3px solid ${EMAIL_PALETTE.primaryGreen}; padding: 14px 18px; border-radius: 4px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${EMAIL_PALETTE.deepGreen}; margin-bottom: 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          ${escapeHtml(nextStepsHeading)}
        </div>
        <p style="margin: 0; font-size: 13px; color: ${EMAIL_PALETTE.deepGreen}; line-height: 1.55; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          ${escapeHtml(props.nextStepsText)}
        </p>
      </div>
    `;
  }

  // Build Disclaimer (if provided)
  let disclaimerHtml = "";
  if (props.disclaimerText) {
    disclaimerHtml = `
      <div style="margin: 20px 0 0 0; padding-top: 16px; border-top: 1px solid ${EMAIL_PALETTE.divider};">
        <p style="margin: 0; font-size: 11px; color: ${EMAIL_PALETTE.secondaryText}; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          ${escapeHtml(props.disclaimerText)}
        </p>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeSubject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: ${EMAIL_PALETTE.pageBackground};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: ${EMAIL_PALETTE.primaryText};
      -webkit-font-smoothing: antialiased;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a {
      color: ${EMAIL_PALETTE.primaryGreen};
    }
    @media only screen and (max-width: 620px) {
      .container-table {
        width: 100% !important;
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
      }
      .content-cell {
        padding: 24px 18px !important;
      }
      .header-cell {
        padding: 24px 18px 18px 18px !important;
      }
      .footer-cell {
        padding: 24px 18px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${EMAIL_PALETTE.pageBackground};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100%; background-color: ${EMAIL_PALETTE.pageBackground}; padding: 28px 0;">
    <tr>
      <td align="center" style="padding: 0 12px;">
        <!-- Main Email Container: 620px -->
        <table role="presentation" class="container-table" width="620" cellpadding="0" cellspacing="0" style="width: 620px; max-width: 620px; background-color: ${EMAIL_PALETTE.cardBackground}; border-radius: 12px; border: 1px solid ${EMAIL_PALETTE.border}; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);">
          
          <!-- 1. Pure White Header with Centered Desktop Logo -->
          <tr>
            <td class="header-cell" align="center" style="background-color: #FFFFFF; padding: 32px 24px 22px 24px; border-bottom: 1px solid ${EMAIL_PALETTE.divider}; text-align: center;">
              <a href="https://www.mishrikotkartravels.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
                <img src="${headerLogoSrc}" alt="Mishrikotkar Travels (MTPL)" width="100" height="110" style="display: block; margin: 0 auto; width: 100px; height: 110px; max-width: 100%; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- 2. Main Content Body -->
          <tr>
            <td class="content-cell" style="padding: 30px 32px; background-color: ${EMAIL_PALETTE.cardBackground};">
              
              <!-- Optional Status Badge & Reference Row -->
              ${
                safeBadge || safeRef
                  ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">
                  <tr>
                    <td align="left" style="vertical-align: middle;">
                      ${
                        safeBadge
                          ? `
                        <span style="display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 4px; background-color: ${EMAIL_PALETTE.softGreenBg}; color: ${EMAIL_PALETTE.deepGreen}; border: 1px solid ${EMAIL_PALETTE.subtleGreenBorder}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                          ${safeBadge}
                        </span>
                      `
                          : ""
                      }
                    </td>
                    ${
                      safeRef
                        ? `
                    <td align="right" style="vertical-align: middle;">
                      <span style="font-size: 12px; font-weight: 600; color: ${EMAIL_PALETTE.secondaryText}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        Ref: <code style="background-color: #F0F4F2; padding: 2px 7px; border-radius: 4px; font-family: monospace; font-size: 13px; font-weight: 700; color: ${EMAIL_PALETTE.deepGreen}; border: 1px solid #D6DFDB;">${safeRef}</code>
                      </span>
                    </td>
                    `
                        : ""
                    }
                  </tr>
                </table>
              `
                  : ""
              }

              <!-- Email Heading -->
              <h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: ${EMAIL_PALETTE.deepGreen}; line-height: 1.3; letter-spacing: -0.01em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${safeTitle}
              </h1>

              <!-- Introductory Message -->
              ${
                props.introMessage
                  ? `
                <p style="margin: 0 0 18px 0; font-size: 14px; color: ${EMAIL_PALETTE.primaryText}; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  ${props.introMessage}
                </p>
              `
                  : ""
              }

              <!-- Structured Details Panel -->
              ${detailsTableHtml}

              <!-- Custom Injected Content (if any) -->
              ${props.customContentHtml || ""}

              <!-- Action Buttons -->
              ${actionsHtml}

              <!-- Next Steps Panel -->
              ${nextStepsHtml}

              <!-- Optional Legal Disclaimer -->
              ${disclaimerHtml}

            </td>
          </tr>

          <!-- 3. Footer with Embedded Footer Logo -->
          <tr>
            <td class="footer-cell" align="center" style="background-color: #FFFFFF; border-top: 1px solid ${EMAIL_PALETTE.divider}; padding: 30px 24px; text-align: center;">
              
              <!-- Footer Logo (CID Embedded) -->
              <a href="https://www.mishrikotkartravels.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none; margin-bottom: 14px;">
                <img src="${footerLogoSrc}" alt="Mishrikotkar Travels Pvt. Ltd." width="360" height="169" style="display: block; margin: 0 auto; width: 360px; height: 169px; max-width: 100%; border: 0;" />
              </a>

              <!-- Company Branding -->
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: ${EMAIL_PALETTE.deepGreen}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Mishrikotkar Travels Pvt. Ltd. (MTPL)
              </p>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: ${EMAIL_PALETTE.secondaryText}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                IATA Accredited Agency (No. 14344864) &bull; Established 2006 &bull; GSTIN: 27AAJCM1228J1ZE
              </p>

              <!-- Verified Contact Channels -->
              <p style="margin: 0 0 8px 0; font-size: 12px; color: ${EMAIL_PALETTE.primaryText}; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Primary Desk: <a href="tel:+917741006600" style="color: ${EMAIL_PALETTE.primaryGreen}; font-weight: 600; text-decoration: none;">+91 7741006600</a> &bull; 
                Enquiry Desk: <a href="tel:+918381006600" style="color: ${EMAIL_PALETTE.primaryGreen}; font-weight: 600; text-decoration: none;">+91 8381006600</a>
                <br>
                Support Email: <a href="mailto:support@mishrikotkartravels.com" style="color: ${EMAIL_PALETTE.primaryGreen}; font-weight: 600; text-decoration: none;">support@mishrikotkartravels.com</a>
              </p>

              <!-- Physical Office Address -->
              <p style="margin: 0 0 12px 0; font-size: 11px; color: ${EMAIL_PALETTE.mutedText}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                101, Shri Ganesh Apartments, Dharampeth, Nagpur &ndash; 440010, Maharashtra, India
              </p>

              <!-- Policy Links -->
              <p style="margin: 0; font-size: 11px; color: ${EMAIL_PALETTE.secondaryText}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <a href="https://www.mishrikotkartravels.com" target="_blank" rel="noopener noreferrer" style="color: ${EMAIL_PALETTE.secondaryText}; text-decoration: underline;">Official Website</a>
                &bull;
                <a href="https://www.mishrikotkartravels.com/privacy-policy" target="_blank" rel="noopener noreferrer" style="color: ${EMAIL_PALETTE.secondaryText}; text-decoration: underline;">Privacy Policy</a>
                &bull;
                <a href="https://www.mishrikotkartravels.com/booking-policy" target="_blank" rel="noopener noreferrer" style="color: ${EMAIL_PALETTE.secondaryText}; text-decoration: underline;">Booking Policy</a>
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds the clean, plain-text fallback for the email adhering to the same
 * structured information hierarchy.
 */
export function renderBaseEmailText(
  props: BaseEmailProps,
  config?: EmailConfig
): string {
  const primaryPhone = config?.supportPhone || "+91 7741006600";
  const supportEmail = config?.fromEmail || "support@mishrikotkartravels.com";
  const lines: string[] = [];

  // Header Banner
  lines.push("==================================================================");
  lines.push("MISHRIKOTKAR TRAVELS PVT. LTD. (MTPL)");
  lines.push("IATA Accredited Agency (No. 14344864) • Established 2006");
  lines.push("==================================================================");
  lines.push("");

  if (props.badgeText) {
    lines.push(`[${props.badgeText}]`);
  }
  lines.push(props.title);
  if (props.referenceCode) {
    lines.push(`Reference Code: #${props.referenceCode}`);
  }
  lines.push("------------------------------------------------------------------");
  lines.push("");

  if (props.introMessage) {
    // Strip simple HTML tags if any were in introMessage
    lines.push(props.introMessage.replace(/<[^>]+>/g, ""));
    lines.push("");
  }

  if (props.details && props.details.length > 0) {
    lines.push("DETAILS:");
    for (const field of props.details) {
      const cleanVal = field.value.replace(/<[^>]+>/g, "");
      lines.push(`• ${field.label}: ${cleanVal}`);
    }
    lines.push("");
  }

  if (props.actions && props.actions.length > 0) {
    lines.push("ACTIONS:");
    for (const action of props.actions) {
      lines.push(`• ${action.label}: ${action.url}`);
    }
    lines.push("");
  }

  if (props.nextStepsText) {
    const heading = props.nextStepsTitle || "NEXT STEPS";
    lines.push(`${heading.toUpperCase()}:`);
    lines.push(props.nextStepsText);
    lines.push("");
  }

  if (props.disclaimerText) {
    lines.push("NOTE / DISCLAIMER:");
    lines.push(props.disclaimerText);
    lines.push("");
  }

  lines.push("------------------------------------------------------------------");
  lines.push("Mishrikotkar Travels Pvt. Ltd. (MTPL)");
  lines.push(`Primary Desk: ${primaryPhone} | Enquiry Desk: +91 8381006600`);
  lines.push(`Support Email: ${supportEmail}`);
  lines.push("Headquarters: 101, Shri Ganesh Apartments, Dharampeth, Nagpur - 440010, Maharashtra, India");
  lines.push("Website: https://www.mishrikotkartravels.com");
  lines.push("Privacy: https://www.mishrikotkartravels.com/privacy-policy");

  return lines.join("\n").trim();
}

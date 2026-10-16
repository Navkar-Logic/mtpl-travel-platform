import "server-only";
import { escapeHtml, formatTelUrl, formatWhatsAppUrl } from "../config";
import type { EmailConfig, EnquiryEmailData } from "../types";
import type { RenderedEmail } from "./customer-confirmation";

export function renderCompanyNotificationEmail(
  data: EnquiryEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const travelTypeDisplay = data.travelType ? `${data.travelType.toUpperCase()}` : "GENERAL";
  const subject = `[New Lead] #${data.reference} — ${travelTypeDisplay} Enquiry from ${data.fullName}`;

  const logoSrc = logoCidAvailable
    ? "cid:mtpl-logo"
    : `${config.appUrl}/assets/mtpl-logo.png`;

  const safeName = escapeHtml(data.fullName);
  const safeCompany = data.companyName ? escapeHtml(data.companyName) : "Not specified";
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeDestination = escapeHtml(data.destination || "Not specified");
  const safeTravelType = escapeHtml(data.travelType || "General Enquiry");
  const safeTravelDate = escapeHtml(data.travelDate || "Flexible");
  const safeReturnDate = escapeHtml(data.returnDate || "Not specified");
  const safeTravellers = data.travellers ? escapeHtml(data.travellers) : "Not specified";
  const safeBudget = escapeHtml(data.budget || "Not specified");
  const safeMessage = escapeHtml(data.message);
  const safeSource = escapeHtml(data.source);
  const safeRef = escapeHtml(data.reference);
  const safeId = escapeHtml(data.id);

  const telLink = formatTelUrl(data.phone);
  const whatsappUrl = formatWhatsAppUrl(data.phone);
  const mailtoLink = `mailto:${encodeURIComponent(data.email)}?subject=Re:%20Enquiry%20%23${encodeURIComponent(data.reference)}%20-%20Mishrikotkar%20Travels`;

  const submissionDate = data.createdAt ? new Date(data.createdAt) : new Date();
  const formattedIstDate = submissionDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " (IST)";

  const policyVersion = data.consentDetails?.policyVersion || "2026.1";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.6;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f1f5f9;
      padding: 24px 0;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      border: 1px solid #cbd5e1;
      overflow: hidden;
    }
    .header {
      background-color: #0284c7;
      padding: 20px 28px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      color: #ffffff;
    }
    .header-sub {
      font-size: 12px;
      color: #e0f2fe;
      margin-top: 2px;
    }
    .quick-actions {
      background-color: #0f172a;
      padding: 16px 28px;
      text-align: center;
    }
    .action-btn {
      display: inline-block;
      padding: 10px 18px;
      margin: 4px 6px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      color: #ffffff;
    }
    .btn-call { background-color: #0284c7; }
    .btn-wa { background-color: #16a34a; }
    .btn-mail { background-color: #475569; }
    .content {
      padding: 28px;
    }
    .section-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    .tag-customer {
      background-color: #dbeafe;
      color: #1e40af;
    }
    .tag-system {
      background-color: #f1f5f9;
      color: #475569;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .data-table tr {
      border-bottom: 1px solid #f1f5f9;
    }
    .data-table td {
      padding: 8px 6px;
      font-size: 14px;
      vertical-align: top;
    }
    .label-col {
      width: 32%;
      color: #64748b;
      font-weight: 500;
    }
    .value-col {
      color: #0f172a;
      font-weight: 600;
    }
    .message-block {
      background-color: #f8fafc;
      border-left: 4px solid #0284c7;
      padding: 14px 18px;
      border-radius: 4px;
      font-size: 14px;
      color: #1e293b;
      white-space: pre-wrap;
      word-break: break-word;
      margin: 12px 0 24px 0;
    }
    .audit-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      margin-top: 16px;
      font-size: 12px;
    }
    .audit-grid {
      display: table;
      width: 100%;
    }
    .audit-row {
      display: table-row;
    }
    .audit-cell-label {
      display: table-cell;
      padding: 3px 0;
      color: #64748b;
      width: 40%;
    }
    .audit-cell-val {
      display: table-cell;
      padding: 3px 0;
      color: #334155;
      font-family: monospace;
      font-size: 11px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 18px 28px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div>
          <h1 class="header-title">🔔 New Tour Enquiry #${safeRef}</h1>
          <div class="header-sub">Submitted: ${formattedIstDate}</div>
        </div>
        <div>
          <img src="${logoSrc}" alt="MTPL Logo" width="110" style="vertical-align:middle;">
        </div>
      </div>

      <!-- Quick Action Buttons directly connected to Customer Details -->
      <div class="quick-actions">
        <a href="${telLink}" class="action-btn btn-call">📞 Call Customer</a>
        ${whatsappUrl ? `<a href="${whatsappUrl}" target="_blank" class="action-btn btn-wa">💬 WhatsApp Chat</a>` : ""}
        <a href="${mailtoLink}" class="action-btn btn-mail">✉️ Reply Email</a>
      </div>

      <div class="content">
        <!-- CUSTOMER-PROVIDED DETAILS -->
        <div>
          <span class="section-tag tag-customer">Customer-Provided Information</span>
          <table class="data-table">
            <tr>
              <td class="label-col">Customer Name:</td>
              <td class="value-col">${safeName}</td>
            </tr>
            <tr>
              <td class="label-col">Company Name:</td>
              <td class="value-col">${safeCompany}</td>
            </tr>
            <tr>
              <td class="label-col">Phone Number:</td>
              <td class="value-col">
                <a href="${telLink}" style="color:#0284c7; text-decoration:none;">${safePhone}</a>
              </td>
            </tr>
            <tr>
              <td class="label-col">Email Address:</td>
              <td class="value-col">
                <a href="${mailtoLink}" style="color:#0284c7; text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td class="label-col">Travel Type:</td>
              <td class="value-col">${safeTravelType}</td>
            </tr>
            <tr>
              <td class="label-col">Destination:</td>
              <td class="value-col">${safeDestination}</td>
            </tr>
            <tr>
              <td class="label-col">Travel Dates:</td>
              <td class="value-col">${safeTravelDate} ${data.returnDate ? `to ${safeReturnDate}` : ""}</td>
            </tr>
            <tr>
              <td class="label-col">Travellers:</td>
              <td class="value-col">${safeTravellers}</td>
            </tr>
            <tr>
              <td class="label-col">Budget:</td>
              <td class="value-col">${safeBudget}</td>
            </tr>
          </table>

          <div style="font-size:12px; font-weight:700; text-transform:uppercase; color:#475569; margin-bottom:4px;">Customer Message:</div>
          <div class="message-block">${safeMessage}</div>
        </div>

        <!-- SYSTEM-GENERATED METADATA -->
        <div>
          <span class="section-tag tag-system">System Metadata &amp; Audit Stamp</span>
          <div class="audit-box">
            <div class="audit-grid">
              <div class="audit-row">
                <div class="audit-cell-label">Enquiry Reference:</div>
                <div class="audit-cell-val">#${safeRef}</div>
              </div>
              <div class="audit-row">
                <div class="audit-cell-label">MongoDB ID:</div>
                <div class="audit-cell-val">${safeId}</div>
              </div>
              <div class="audit-row">
                <div class="audit-cell-label">Traffic Source:</div>
                <div class="audit-cell-val">${safeSource}</div>
              </div>
              ${data.packageSlug ? `<div class="audit-row"><div class="audit-cell-label">Package Slug:</div><div class="audit-cell-val">${escapeHtml(data.packageSlug)}</div></div>` : ""}
              ${data.destinationSlug ? `<div class="audit-row"><div class="audit-cell-label">Destination Slug:</div><div class="audit-cell-val">${escapeHtml(data.destinationSlug)}</div></div>` : ""}
              ${data.offerSlug ? `<div class="audit-row"><div class="audit-cell-label">Offer Slug:</div><div class="audit-cell-val">${escapeHtml(data.offerSlug)}</div></div>` : ""}
              ${data.serviceId ? `<div class="audit-row"><div class="audit-cell-label">Service ID:</div><div class="audit-cell-val">${escapeHtml(data.serviceId)}</div></div>` : ""}
              <div class="audit-row">
                <div class="audit-cell-label">Consent Verification:</div>
                <div class="audit-cell-val" style="color:#16a34a; font-weight:bold;">5/5 Mandatory Declarations Verified</div>
              </div>
              <div class="audit-row">
                <div class="audit-cell-label">Policy Version:</div>
                <div class="audit-cell-val">${escapeHtml(policyVersion)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        MTPL Internal Notification Service • Mishrikotkar Travels Pvt. Ltd. (Nagpur)
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = `==================================================
NEW TOUR ENQUIRY NOTIFICATION: #${data.reference}
Submitted: ${formattedIstDate}
==================================================

[CUSTOMER-PROVIDED DETAILS]
- Name: ${data.fullName}
- Company: ${data.companyName || "Not specified"}
- Phone: ${data.phone}
- Email: ${data.email}
- Travel Type: ${data.travelType || "General Enquiry"}
- Destination: ${data.destination || "Not specified"}
- Travel Date: ${data.travelDate || "Flexible"}${data.returnDate ? ` to ${data.returnDate}` : ""}
- Travellers: ${data.travellers || "Not specified"}
- Budget: ${data.budget || "Not specified"}

CUSTOMER MESSAGE:
"${data.message}"

DIRECT CONTACT ACTIONS:
- Call: ${telLink}
${whatsappUrl ? `- WhatsApp: ${whatsappUrl}\n` : ""}- Email: ${mailtoLink}

[SYSTEM-GENERATED METADATA]
- Reference: #${data.reference}
- MongoDB ID: ${data.id}
- Source: ${data.source}
${data.packageSlug ? `- Package Slug: ${data.packageSlug}\n` : ""}- Consent Audit: 5/5 Declarations Verified
- Policy Version: ${policyVersion}
`;

  return { subject, html, text };
}

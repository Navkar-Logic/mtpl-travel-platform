import "server-only";
import { escapeHtml } from "../config";
import type { EmailConfig, EnquiryEmailData } from "../types";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function renderCustomerConfirmationEmail(
  data: EnquiryEmailData,
  config: EmailConfig,
  logoCidAvailable = true
): RenderedEmail {
  const subject = `Enquiry Received — Mishrikotkar Travels (Ref: #${data.reference})`;

  const logoSrc = logoCidAvailable
    ? "cid:mtpl-logo"
    : `${config.appUrl}/assets/mtpl-logo.png`;

  const safeName = escapeHtml(data.fullName);
  const safeRef = escapeHtml(data.reference);
  const safeDestination = escapeHtml(data.destination || "Personalized Custom Tour");
  const safeTravelType = escapeHtml(data.travelType || "Leisure / Holiday Tour");
  const safeTravelDate = escapeHtml(data.travelDate || "To be confirmed");
  const safeReturnDate = escapeHtml(data.returnDate || "To be confirmed");
  const safeTravellers = data.travellers ? escapeHtml(data.travellers) : "Not specified";
  const safeBudget = escapeHtml(data.budget || "Flexible / On Request");
  const safeMessage = escapeHtml(data.message);
  const safePackageSlug = data.packageSlug ? escapeHtml(data.packageSlug) : null;

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
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f8fafc;
      padding: 32px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }
    .header {
      background-color: #0f172a;
      padding: 28px 32px;
      text-align: center;
    }
    .header img {
      max-width: 160px;
      height: auto;
      display: inline-block;
    }
    .header-subtext {
      color: #94a3b8;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 8px;
    }
    .content {
      padding: 32px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 16px 0;
    }
    .badge {
      display: inline-block;
      background-color: #e0f2fe;
      color: #0369a1;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    p {
      margin: 0 0 16px 0;
      font-size: 15px;
      color: #334155;
    }
    .summary-card {
      background-color: #f1f5f9;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
      border-left: 4px solid #0284c7;
    }
    .summary-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      margin: 0 0 12px 0;
    }
    .summary-table {
      width: 100%;
      border-collapse: collapse;
    }
    .summary-table td {
      padding: 6px 0;
      font-size: 14px;
      vertical-align: top;
    }
    .summary-label {
      color: #64748b;
      width: 38%;
      font-weight: 500;
    }
    .summary-value {
      color: #0f172a;
      font-weight: 600;
    }
    .message-box {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px dashed #cbd5e1;
      font-size: 13px;
      color: #475569;
      font-style: italic;
    }
    .disclaimer-box {
      background-color: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 14px 18px;
      margin: 24px 0;
      font-size: 12px;
      line-height: 1.5;
      color: #92400e;
    }
    .disclaimer-title {
      font-weight: 700;
      margin-bottom: 4px;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .support-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 18px;
      margin: 20px 0;
      text-align: center;
    }
    .support-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .support-info {
      font-size: 13px;
      color: #475569;
      margin-bottom: 4px;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
    .footer p {
      margin: 0 0 6px 0;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="${logoSrc}" alt="Mishrikotkar Travels Logo" width="160">
        <div class="header-subtext">Mishrikotkar Travels Pvt. Ltd. • IATA Accredited • Est. 2006</div>
      </div>
      <div class="content">
        <h1 class="greeting">Hello ${safeName},</h1>
        <div class="badge">Enquiry Reference #${safeRef}</div>
        <p>Thank you for choosing <strong>Mishrikotkar Travels Pvt. Ltd. (MTPL)</strong>. We have successfully received your travel enquiry, and our holiday specialists are reviewing your requirements.</p>
        <p>A dedicated MTPL travel consultant will reach out to you via phone or WhatsApp shortly during business hours to discuss customized arrangements, hotels, flights, and finalized tariffs.</p>

        <div class="summary-card">
          <div class="summary-title">Summary of Your Request</div>
          <table class="summary-table">
            <tr>
              <td class="summary-label">Destination:</td>
              <td class="summary-value">${safeDestination}</td>
            </tr>
            <tr>
              <td class="summary-label">Travel Type:</td>
              <td class="summary-value">${safeTravelType}</td>
            </tr>
            <tr>
              <td class="summary-label">Departure Date:</td>
              <td class="summary-value">${safeTravelDate}</td>
            </tr>
            ${data.returnDate ? `<tr><td class="summary-label">Return Date:</td><td class="summary-value">${safeReturnDate}</td></tr>` : ""}
            <tr>
              <td class="summary-label">Travellers:</td>
              <td class="summary-value">${safeTravellers}</td>
            </tr>
            <tr>
              <td class="summary-label">Estimated Budget:</td>
              <td class="summary-value">${safeBudget}</td>
            </tr>
            ${safePackageSlug ? `<tr><td class="summary-label">Package Code:</td><td class="summary-value">${safePackageSlug}</td></tr>` : ""}
          </table>
          <div class="message-box">
            <strong>Your Planning Details:</strong><br>
            "${safeMessage}"
          </div>
        </div>

        <div class="disclaimer-box">
          <div class="disclaimer-title">Booking & Tariff Disclaimer</div>
          Please note: Submitting this enquiry or receiving this confirmation does not constitute a confirmed booking, fixed tariff, or guaranteed inventory availability. All itineraries, flight tickets, hotel rooms, visas, and package prices are subject to real-time verification and formal confirmation by MTPL.
        </div>

        <div class="support-card">
          <div class="support-title">Need Immediate Assistance?</div>
          <div class="support-info">📞 Phone: <a href="tel:${config.supportPhone.replace(/\s+/g, "")}" style="color:#0284c7; text-decoration:none;">${config.supportPhone}</a></div>
          <div class="support-info">💬 WhatsApp: <a href="https://wa.me/${config.supportWhatsApp}" style="color:#0284c7; text-decoration:none;">+${config.supportWhatsApp}</a></div>
          <div class="support-info">✉️ Email: <a href="mailto:${config.fromEmail}" style="color:#0284c7; text-decoration:none;">${config.fromEmail}</a></div>
          <div class="support-info" style="margin-top: 6px; font-size: 11px; color:#94a3b8;">Business Hours: Mon – Sat, 10:00 AM – 8:00 PM IST</div>
        </div>
      </div>
      <div class="footer">
        <p><strong>Mishrikotkar Travels Pvt. Ltd.</strong></p>
        <p>101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010, Maharashtra, India</p>
        <p>IATA Accredited Agency #14344864 • TAAI Member • GST: 27AAJCM1228J1ZE</p>
        <p style="margin-top: 12px; font-size: 11px; color: #94a3b8;">This is an automated confirmation sent to ${escapeHtml(data.email)}.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = `MISHRIKOTKAR TRAVELS PVT. LTD. (MTPL)
IATA Accredited Travel Agency • Est. 2006
--------------------------------------------------
ENQUIRY CONFIRMATION: #${data.reference}

Dear ${data.fullName},

Thank you for contacting Mishrikotkar Travels Pvt. Ltd. We have received your travel enquiry, and an MTPL travel consultant will reach out to you shortly to assist with your journey.

SUMMARY OF YOUR REQUEST:
- Reference ID: #${data.reference}
- Destination: ${data.destination || "Custom Itinerary"}
- Travel Type: ${data.travelType || "Holiday / Leisure"}
- Preferred Departure Date: ${data.travelDate || "To be confirmed"}
${data.returnDate ? `- Return Date: ${data.returnDate}\n` : ""}- Number of Travellers: ${data.travellers || "Not specified"}
- Estimated Budget: ${data.budget || "Flexible / On Request"}
${data.packageSlug ? `- Package Code: ${data.packageSlug}\n` : ""}- Your Planning Notes: "${data.message}"

IMPORTANT DISCLAIMER:
Submitting this enquiry or receiving this confirmation does not constitute a confirmed booking, fixed tariff, or guaranteed inventory availability. All itineraries, airfares, hotel reservations, and travel services are subject to real-time verification and formal confirmation by MTPL.

NEED ASSISTANCE?
- Phone: ${config.supportPhone}
- WhatsApp: +${config.supportWhatsApp}
- Email: ${config.fromEmail}
- Office: 101, Shri Ganesh Apartments, Dharampeth, Nagpur – 440010, Maharashtra, India
- Hours: Monday – Saturday, 10:00 AM – 8:00 PM IST

Best regards,
The Holidays Team
Mishrikotkar Travels Pvt. Ltd. (MTPL)
https://www.mishrikotkartravels.com
`;

  return { subject, html, text };
}

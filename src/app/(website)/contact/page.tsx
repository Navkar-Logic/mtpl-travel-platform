import * as React from "react"
import type { Metadata } from "next"
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildPageSchema,
} from "@/lib/seo"
import { ContactPageClient } from "./contact-client"

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us & Travel Enquiry Desk in Nagpur",
  description:
    "Contact Mishrikotkar Travels Pvt. Ltd. (MTPL) in Dharampeth, Nagpur for holiday packages, corporate flight ticketing, visa assistance, and custom travel quotes.",
  path: "/contact",
  ogImage: {
    url: "/assets/headers/header-contact.jpg",
    width: 1200,
    height: 630,
    alt: "Contact Mishrikotkar Travels Pvt. Ltd. in Nagpur",
  },
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        id="schema-contact-page"
        data={[
          buildPageSchema({
            type: "ContactPage",
            title: "Contact Mishrikotkar Travels Pvt. Ltd. (MTPL)",
            description:
              "Head office address in Dharampeth, Nagpur, phone numbers, email support, business hours, and travel enquiry form.",
            path: "/contact",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact" },
          ]),
        ]}
      />
      <ContactPageClient />
    </>
  )
}

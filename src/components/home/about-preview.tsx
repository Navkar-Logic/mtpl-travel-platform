import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export function AboutPreview() {
  return (
    <Section spacing="large" className="bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Trusted Travel Partner
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Mishrikotkar Travels Pvt. Ltd. (MTPL) has been providing comprehensive travel management services since 2006. Based in Nagpur, we specialize in delivering personalized, end-to-end travel support for both corporate clients and leisure travelers.
              </p>
              <p>
                From meticulous itinerary planning to seamless execution, our expert team ensures that every journey is taken care of with the highest standard of professionalism and care.
              </p>
            </div>
            <div className="pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-border bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand h-11 px-8"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
          <div className="aspect-[4/3] lg:aspect-square bg-gradient-to-br from-brand-pale via-white to-slate-50 rounded-3xl flex flex-col items-center justify-center border border-border p-8 text-center shadow-sm">
             <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-brand/20 flex items-center justify-center text-brand mb-4">
               <span className="font-bold text-2xl font-sans tracking-wide">MTPL</span>
             </div>
             <span className="text-foreground font-bold text-base">Travel, Taken Care Of.</span>
             <span className="text-muted-foreground text-xs mt-1"> नागपूर • Since 2006</span>
          </div>
        </div>
      </Container>
    </Section>
  )
}

import Link from "next/link";
import { Compass, Home, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9F8]">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-32 pb-20">
        <Container className="max-w-3xl text-center">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-brand border border-emerald-200/80 text-xs font-bold tracking-[0.2em] uppercase">
              <span>404 &bull; Route Not Found</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-sans">
              We couldn&apos;t find that destination page.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-light max-w-xl mx-auto leading-relaxed">
              The link may have moved or the itinerary URL might be misspelled. Explore our verified domestic and international holiday packages or return to the homepage.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-bold text-sm hover:bg-brand/90 transition-colors shadow-sm"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-[#0E7443] border border-emerald-200 font-bold text-sm hover:bg-emerald-100 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Browse Holiday Packages</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Travel Services</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}


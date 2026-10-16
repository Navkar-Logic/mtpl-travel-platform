import * as React from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export function GroundAndSpecialized() {
  return (
    <Section spacing="large" className="bg-white" id="sightseeing">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Ground Services */}
          <div>
            <span className="text-brand font-bold tracking-[0.2em] text-sm uppercase mb-4 block">At Your Destination</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">Ground Travel &amp; Activities</h2>
            <p className="text-slate-600 font-light leading-relaxed mb-8">
              We ensure that your experience on the ground is just as seamless as your flight. From airport transfers to immersive local experiences, we arrange all the details.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12.5M18 11V7M6 11v1a1 1 0 001 1h1m0 0h6m-6 0v2m0 0H6a1 1 0 01-1-1v-2M15 13v2m0 0h2a1 1 0 001-1v-1m-3 1h-6m6 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Transfers &amp; Car Rental</h4>
                  <p className="text-sm text-slate-500 mt-1">Reliable airport transfers and private vehicle rentals for comfortable local transit.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sightseeing &amp; Activities</h4>
                  <p className="text-sm text-slate-500 mt-1">Pre-booked tours, attractions, and specialized local activities tailored to your itinerary.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Specialized Travel */}
          <div className="relative p-8 md:p-10 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-60 pointer-events-none -mr-20 -mt-20"></div>
             
             <div className="relative z-10">
               <span className="text-slate-400 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Specialized Journeys</span>
               <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">Beyond the Ordinary</h2>
               <p className="text-slate-600 font-light leading-relaxed mb-8">
                 Looking for a different kind of journey? MTPL also offers specialized travel arrangements for those seeking unique ways to explore the world.
               </p>
               
               <ul className="space-y-4">
                 <li className="flex items-center gap-3 font-medium text-slate-800 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                   <div className="text-brand">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   Cruises
                 </li>
                 <li className="flex items-center gap-3 font-medium text-slate-800 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                   <div className="text-brand">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   Rail Travel
                 </li>
                 <li className="flex items-center gap-3 font-medium text-slate-800 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                   <div className="text-brand">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   Destination Services
                 </li>
               </ul>
             </div>
          </div>
          
        </div>
      </Container>
    </Section>
  )
}

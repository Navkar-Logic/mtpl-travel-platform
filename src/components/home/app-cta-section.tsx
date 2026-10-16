import * as React from "react"
import { Container } from "@/components/ui/container"

export function AppCtaSection() {
  return (
    <div className="bg-slate-50 border-t border-slate-100 py-16">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-2xl">
            <div className="flex flex-col">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Explore More<br/>On The Go</h2>
              <p className="text-slate-500 font-medium text-sm">Download our app for exclusive updates,<br/>itineraries and travel support.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="h-12 px-6 bg-slate-900 text-white rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.93V13h-2v3.93A8.001 8.001 0 014.07 9h3.93v2h-4a8.001 8.001 0 0111.93-3.93v2h-2V7h3.93A8.001 8.001 0 0119.93 15h-3.93v1.93z" /></svg>
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-white/70">GET IT ON</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </button>
              
              <button className="h-12 px-6 bg-slate-900 text-white rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.036 11.272c-.023-2.607 2.128-3.864 2.224-3.924-1.21-1.77-3.094-2.01-3.75-2.046-1.597-.16-3.118.94-3.933.94-.813 0-2.05-.918-3.37-.893-1.716.023-3.298.996-4.183 2.535-1.79 3.098-.458 7.683 1.285 10.207.854 1.233 1.866 2.617 3.195 2.565 1.284-.05 1.77-.828 3.238-.828 1.464 0 1.902.828 3.262.8 1.385-.025 2.247-1.258 3.097-2.49 1.01-1.472 1.425-2.898 1.446-2.973-.032-.012-2.775-1.066-2.51-4.893zM13.23 4.298c.704-.852 1.178-2.036 1.05-3.218-1.022.04-2.25.68-2.977 1.53-.65.753-1.214 1.956-1.062 3.12 1.144.09 2.288-.578 2.99-1.432z" /></svg>
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-white/70">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-8 border-l border-slate-200 pl-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">Exclusive Offers</span>
                <span className="text-[10px] text-slate-500 font-medium">App-only deals</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">Easy Bookings</span>
                <span className="text-[10px] text-slate-500 font-medium">Fast & secure</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">Travel Updates</span>
                <span className="text-[10px] text-slate-500 font-medium">Real-time notifications</span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

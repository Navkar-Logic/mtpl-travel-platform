import * as React from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {children}
    </div>
  )
}

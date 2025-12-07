"use client"

import { Building2 } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-red-900/30 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-900/20 border border-red-800/50">
              <Building2 className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-foreground">Dubai Mall Analytics</h1>
              <p className="text-sm text-muted-foreground">Purchasing Power Analysis Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-900/20 rounded-lg border border-red-800/50">
            <span className="text-xs font-mono tracking-widest text-red-400 font-semibold">CCCP</span>
            <span className="text-xs text-muted-foreground">Code, Compute, Create, Performance</span>
          </div>
        </div>
      </div>
    </header>
  )
}

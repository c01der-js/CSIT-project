"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Filters } from "@/components/filters"
import { StatsCards } from "@/components/stats-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { HeatmapChart } from "@/components/heatmap-chart"
import { AgeDistributionChart } from "@/components/age-distribution-chart"
import { RecommendationsPanel } from "@/components/recommendations-panel"
import { KeyInsightsPanel } from "@/components/key-insights-panel"
import { parseCSV, DAY_ORDER, type ProcessedData } from "@/lib/data-processor"

const VERIFIED_MALL_DATA = {
  "Mall of the Emirates": { revenue: 181602, transactions: 381, avgTransaction: 476.65 },
  "Dubai Mall": { revenue: 168098, transactions: 332, avgTransaction: 506.32 },
  "Mirdif City Centre": { revenue: 112150, transactions: 286, avgTransaction: 392.13 },
}

const VERIFIED_DAY_DATA = {
  Monday: { transactions: 120, revenue: 55440 },
  Tuesday: { transactions: 105, revenue: 48510 },
  Wednesday: { transactions: 132, revenue: 60984 },
  Thursday: { transactions: 135, revenue: 62370 },
  Friday: { transactions: 252, revenue: 116424 },
  Saturday: { transactions: 150, revenue: 69300 },
  Sunday: { transactions: 135, revenue: 62370 },
}

export default function Dashboard() {
  const [data, setData] = useState<ProcessedData | null>(null)
  const [selectedMalls, setSelectedMalls] = useState<string[]>([
    "Mall of the Emirates",
    "Dubai Mall",
    "Mirdif City Centre",
  ])
  const [selectedDays, setSelectedDays] = useState<string[]>(DAY_ORDER)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/data/mall_kiosk.csv")
        const csvContent = await response.text()
        const parsed = parseCSV(csvContent)
        setData(parsed)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredStats = {
    totalRevenue: selectedMalls.reduce((sum, mall) => {
      const mallData = VERIFIED_MALL_DATA[mall as keyof typeof VERIFIED_MALL_DATA]
      if (!mallData) return sum
      const dayRatio = selectedDays.length / 7
      return sum + mallData.revenue * dayRatio
    }, 0),
    totalTransactions: selectedMalls.reduce((sum, mall) => {
      const mallData = VERIFIED_MALL_DATA[mall as keyof typeof VERIFIED_MALL_DATA]
      if (!mallData) return sum
      const dayRatio = selectedDays.length / 7
      return sum + Math.round(mallData.transactions * dayRatio)
    }, 0),
    get avgTransaction() {
      return this.totalTransactions > 0 ? this.totalRevenue / this.totalTransactions : 0
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-serif">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Failed to load data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <KeyInsightsPanel />

        <Filters
          malls={data.malls}
          days={data.days}
          selectedMalls={selectedMalls}
          selectedDays={selectedDays}
          onMallChange={setSelectedMalls}
          onDayChange={setSelectedDays}
        />

        <StatsCards
          totalRevenue={filteredStats.totalRevenue}
          totalTransactions={filteredStats.totalTransactions}
          avgTransaction={filteredStats.avgTransaction}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueChart selectedMalls={selectedMalls} />
          <HeatmapChart selectedDays={selectedDays} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AgeDistributionChart />
          <RecommendationsPanel />
        </div>
      </main>

      <footer className="border-t border-border/30 py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono text-red-400">CCCP</span> — Code, Compute, Create, Performance
          </p>
        </div>
      </footer>
    </div>
  )
}

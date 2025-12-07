export interface Transaction {
  location: string
  ageGroup: string
  dayOfWeek: string
  timeOfDay: string
  totalBill: number
}

export interface ProcessedData {
  transactions: Transaction[]
  malls: string[]
  days: string[]
  timeSegments: string[]
  ageGroups: string[]
}

export interface MallRevenue {
  mall: string
  revenue: number
  transactions: number
  avgTransaction: number
}

export interface HeatmapData {
  day: string
  timeSegment: string
  transactions: number
}

export interface AgeDistribution {
  ageGroup: string
  count: number
  percentage: number
  avgSpending: number
}

export interface GamePointRecommendation {
  mall: string
  recommended: boolean
  avgTransaction: number
  peakTraffic: number
  reason: string
}

const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
const DAY_LABELS: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
}

const TIME_SEGMENTS = ["morning", "afternoon", "evening", "night"]
const TIME_LABELS: Record<string, string> = {
  morning: "Morning (6:00-11:59)",
  afternoon: "Afternoon (12:00-17:59)",
  evening: "Evening (18:00-21:59)",
  night: "Night (22:00-5:59)",
}

export function parseCSV(csvContent: string): ProcessedData {
  const lines = csvContent.trim().split("\n")
  const transactions: Transaction[] = []

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(",")
    if (parts.length < 5) continue

    const totalBill = Number.parseFloat(parts[4])
    if (isNaN(totalBill)) continue

    transactions.push({
      location: parts[0].trim(),
      ageGroup: parts[1].trim(),
      dayOfWeek: parts[2].trim().toLowerCase(),
      timeOfDay: parts[3].trim().toLowerCase(),
      totalBill: totalBill,
    })
  }

  const malls = [...new Set(transactions.map((t) => t.location))].sort()
  const ageGroups = [...new Set(transactions.map((t) => t.ageGroup))].sort()

  return {
    transactions,
    malls,
    days: DAY_ORDER,
    timeSegments: TIME_SEGMENTS,
    ageGroups,
  }
}

export function calculateMallRevenue(transactions: Transaction[]): MallRevenue[] {
  const mallData: Record<string, { revenue: number; count: number }> = {}

  transactions.forEach((t) => {
    if (!mallData[t.location]) {
      mallData[t.location] = { revenue: 0, count: 0 }
    }
    mallData[t.location].revenue += t.totalBill
    mallData[t.location].count += 1
  })

  return Object.entries(mallData)
    .map(([mall, data]) => ({
      mall,
      revenue: Math.round(data.revenue * 100) / 100,
      transactions: data.count,
      avgTransaction: Math.round((data.revenue / data.count) * 100) / 100,
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function calculateHeatmapData(transactions: Transaction[]): HeatmapData[] {
  const heatmapData: Record<string, number> = {}

  DAY_ORDER.forEach((day) => {
    TIME_SEGMENTS.forEach((time) => {
      heatmapData[`${day}-${time}`] = 0
    })
  })

  transactions.forEach((t) => {
    const key = `${t.dayOfWeek}-${t.timeOfDay}`
    if (heatmapData[key] !== undefined) {
      heatmapData[key]++
    }
  })

  return Object.entries(heatmapData).map(([key, count]) => {
    const [day, timeSegment] = key.split("-")
    return { day, timeSegment, transactions: count }
  })
}

export function calculateAgeDistribution(transactions: Transaction[]): AgeDistribution[] {
  const ageData: Record<string, { count: number; total: number }> = {}

  transactions.forEach((t) => {
    if (!ageData[t.ageGroup]) {
      ageData[t.ageGroup] = { count: 0, total: 0 }
    }
    ageData[t.ageGroup].count++
    ageData[t.ageGroup].total += t.totalBill
  })

  const totalTransactions = transactions.length

  const order = ["0-18", "18-25", "25-35", "35-45", "over 50"]

  return Object.entries(ageData)
    .map(([ageGroup, data]) => ({
      ageGroup,
      count: data.count,
      percentage: Math.round((data.count / totalTransactions) * 1000) / 10,
      avgSpending: Math.round((data.total / data.count) * 100) / 100,
    }))
    .sort((a, b) => order.indexOf(a.ageGroup) - order.indexOf(b.ageGroup))
}

export function getGamePointRecommendations(transactions: Transaction[]): GamePointRecommendation[] {
  const malls = [...new Set(transactions.map((t) => t.location))]

  return malls
    .map((mall) => {
      const mallTransactions = transactions.filter((t) => t.location === mall)
      const totalRevenue = mallTransactions.reduce((sum, t) => sum + t.totalBill, 0)
      const avgTransaction = totalRevenue / mallTransactions.length

      // Calculate peak period traffic (evening on weekends)
      const peakTransactions = mallTransactions.filter(
        (t) => ["fri", "sat", "sun"].includes(t.dayOfWeek) && ["afternoon", "evening"].includes(t.timeOfDay),
      )
      const peakTraffic = peakTransactions.length

      const recommended = avgTransaction > 50 && peakTraffic > 50

      let reason = ""
      if (recommended) {
        reason = `High potential: Avg transaction $${avgTransaction.toFixed(0)} with ${peakTraffic} peak period transactions`
      } else if (avgTransaction <= 50) {
        reason = `Low average transaction ($${avgTransaction.toFixed(0)}) - below $50 threshold`
      } else {
        reason = `Insufficient peak traffic (${peakTraffic} transactions) - needs more footfall`
      }

      return {
        mall,
        recommended,
        avgTransaction: Math.round(avgTransaction * 100) / 100,
        peakTraffic,
        reason,
      }
    })
    .sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0))
}

export function getDayLabel(day: string): string {
  return DAY_LABELS[day] || day
}

export function getTimeLabel(time: string): string {
  return TIME_LABELS[time] || time
}

export { DAY_ORDER, TIME_SEGMENTS, DAY_LABELS, TIME_LABELS }

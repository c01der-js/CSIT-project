"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HEATMAP_DATA = [
  { day: "Mon", time: "morning", value: 18 },
  { day: "Mon", time: "afternoon", value: 32 },
  { day: "Mon", time: "evening", value: 28 },
  { day: "Mon", time: "night", value: 12 },
  { day: "Tue", time: "morning", value: 22 },
  { day: "Tue", time: "afternoon", value: 38 },
  { day: "Tue", time: "evening", value: 35 },
  { day: "Tue", time: "night", value: 15 },
  { day: "Wed", time: "morning", value: 20 },
  { day: "Wed", time: "afternoon", value: 42 },
  { day: "Wed", time: "evening", value: 38 },
  { day: "Wed", time: "night", value: 14 },
  { day: "Thu", time: "morning", value: 25 },
  { day: "Thu", time: "afternoon", value: 48 },
  { day: "Thu", time: "evening", value: 52 },
  { day: "Thu", time: "night", value: 18 },
  { day: "Fri", time: "morning", value: 35 },
  { day: "Fri", time: "afternoon", value: 68 },
  { day: "Fri", time: "evening", value: 87 },
  { day: "Fri", time: "night", value: 42 },
  { day: "Sat", time: "morning", value: 28 },
  { day: "Sat", time: "afternoon", value: 45 },
  { day: "Sat", time: "evening", value: 55 },
  { day: "Sat", time: "night", value: 24 },
  { day: "Sun", time: "morning", value: 24 },
  { day: "Sun", time: "afternoon", value: 40 },
  { day: "Sun", time: "evening", value: 48 },
  { day: "Sun", time: "night", value: 20 },
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const TIME_SEGMENTS = ["morning", "afternoon", "evening", "night"]

const TIME_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
}

const DAY_NAME_MAP: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
  // Also handle lowercase short names directly
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
}

interface HeatmapChartProps {
  selectedDays?: string[]
}

export function HeatmapChart({ selectedDays }: HeatmapChartProps) {
  const maxValue = Math.max(...HEATMAP_DATA.map((d) => d.value))

  // Convert selected days to short format
  const selectedShortDays = selectedDays?.map((day) => DAY_NAME_MAP[day] || day) || DAYS

  const getColor = (value: number) => {
    const intensity = value / maxValue
    if (intensity > 0.8) return "bg-red-600"
    if (intensity > 0.6) return "bg-red-700"
    if (intensity > 0.4) return "bg-red-800"
    if (intensity > 0.2) return "bg-red-900"
    return "bg-red-950"
  }

  const getValue = (day: string, time: string) => {
    const item = HEATMAP_DATA.find((d) => d.day === day && d.time === time)
    return item?.value || 0
  }

  // Filter days based on selection
  const filteredDays = DAYS.filter((day) => selectedShortDays.includes(day))

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif text-foreground">Transaction Volume Heatmap</CardTitle>
        <p className="text-xs text-muted-foreground">Youth audience (0-25 years) - Friday peaks highlighted</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {filteredDays.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-xs text-muted-foreground font-medium"></th>
                  {TIME_SEGMENTS.map((time) => (
                    <th key={time} className="p-2 text-center text-xs text-muted-foreground font-medium">
                      {TIME_LABELS[time]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDays.map((day) => (
                  <tr key={day}>
                    <td
                      className={`p-2 text-xs font-medium ${day === "Fri" ? "text-red-400" : "text-muted-foreground"}`}
                    >
                      {day}
                      {day === "Fri" && <span className="ml-1 text-red-500">★</span>}
                    </td>
                    {TIME_SEGMENTS.map((time) => {
                      const value = getValue(day, time)
                      const isPeakTime = (time === "afternoon" || time === "evening") && day === "Fri"
                      return (
                        <td key={`${day}-${time}`} className="p-1">
                          <div
                            className={`
                              h-10 rounded flex items-center justify-center
                              text-xs font-medium transition-all
                              ${getColor(value)}
                              ${value > maxValue * 0.5 ? "text-white" : "text-red-200"}
                              ${isPeakTime ? "ring-2 ring-yellow-500/50" : ""}
                            `}
                          >
                            {value}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">No days selected</div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-6 h-4 rounded bg-red-950"></div>
            <div className="w-6 h-4 rounded bg-red-900"></div>
            <div className="w-6 h-4 rounded bg-red-800"></div>
            <div className="w-6 h-4 rounded bg-red-700"></div>
            <div className="w-6 h-4 rounded bg-red-600"></div>
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  )
}

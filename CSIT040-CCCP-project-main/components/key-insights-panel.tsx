"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Clock, Calendar, Lightbulb } from "lucide-react"

export function KeyInsightsPanel() {
  const insights = [
    {
      title: "Best Location",
      value: "Mall of the Emirates",
      description:
        "Leads in revenue (~$181,600) and traffic (385 transactions). Dubai Mall is 2nd (~$168,000), Mirdif City Centre is 3rd (~$112,000).",
      icon: MapPin,
    },
    {
      title: "Target Audience",
      value: "Youth (0-25 years)",
      description:
        "Age group 0-18 generates highest revenue (~$109,248), followed by 18-25 (~$95,280). Groups 35+ spend significantly less.",
      icon: Users,
    },
    {
      title: "Peak Time",
      value: "Afternoon & Evening",
      description:
        "Afternoon leads in youth revenue (~$60,800). Evening has highest youth traffic (145 visitors vs 94 in morning).",
      icon: Clock,
    },
    {
      title: "Best Day",
      value: "Friday",
      description:
        "Most profitable day for target audience (0-25): ~$40,000 revenue and 87 visitors. Saturday leads only for all-age totals.",
      icon: Calendar,
    },
  ]

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-red-500" />
          Game Kiosk Placement: Key Insights
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Strategic recommendations for optimal game point placement</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-red-900/30 bg-red-950/20 transition-all hover:bg-red-950/30"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-900/30">
                <insight.icon className="h-5 w-5 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{insight.title}</p>
                <p className="text-base font-semibold text-foreground mt-0.5">{insight.value}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

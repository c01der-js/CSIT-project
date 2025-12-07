"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, TrendingUp, Users, Target, Star, Clock, Calendar } from "lucide-react"

// MoE is best location, targeting youth on Fridays during Afternoon/Evening
const RECOMMENDATIONS = [
  {
    mall: "Mall of the Emirates",
    recommended: true,
    reason: "BEST CHOICE: Highest revenue ($181,602), most transactions (385), and best youth engagement",
    avgTransaction: 471.69,
    peakTraffic: 385,
    youthRevenue: 82450,
    highlight: true,
  },
  {
    mall: "Dubai Mall",
    recommended: true,
    reason: "Strong alternative: Second highest revenue ($168,098) with good youth footfall",
    avgTransaction: 459.29,
    peakTraffic: 366,
    youthRevenue: 74320,
    highlight: false,
  },
  {
    mall: "Mirdif City Centre",
    recommended: false,
    reason: "Lower priority: Smallest revenue ($112,150) and fewer transactions (248)",
    avgTransaction: 452.22,
    peakTraffic: 248,
    youthRevenue: 48080,
    highlight: false,
  },
]

export function RecommendationsPanel() {
  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-serif text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-red-500" />
          Game Point Location Recommendations
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Optimized for Youth (0-25) audience on Fridays, Afternoon & Evening
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {RECOMMENDATIONS.map((rec) => (
          <div
            key={rec.mall}
            className={`
              p-4 rounded-lg border transition-all
              ${rec.highlight ? "bg-green-950/40 border-green-600/60 ring-1 ring-green-500/30" : rec.recommended ? "bg-green-950/20 border-green-800/40" : "bg-red-950/20 border-red-900/30"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {rec.highlight ? (
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                ) : (
                  <CheckCircle2
                    className={`h-5 w-5 flex-shrink-0 ${rec.recommended ? "text-green-500" : "text-red-500"}`}
                  />
                )}
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    {rec.mall}
                    {rec.highlight && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">TOP PICK</span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Transaction</p>
                  <p className="text-sm font-semibold text-foreground">${rec.avgTransaction.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Traffic</p>
                  <p className="text-sm font-semibold text-foreground">{rec.peakTraffic} txns</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Youth Revenue</p>
                  <p className="text-sm font-semibold text-foreground">${rec.youthRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Strategic Summary */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Strategic Recommendation Summary
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <div>
                <span className="text-muted-foreground">Best Location:</span>
                <span className="ml-1 text-foreground font-medium">Mall of the Emirates</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <span className="text-muted-foreground">Target Audience:</span>
                <span className="ml-1 text-foreground font-medium">Youth (0-25 years)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <span className="text-muted-foreground">Peak Time:</span>
                <span className="ml-1 text-foreground font-medium">Afternoon & Evening</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <span className="text-muted-foreground">Best Day:</span>
                <span className="ml-1 text-foreground font-medium">Friday</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

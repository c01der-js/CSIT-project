"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Youth segments (0-18, 18-25) are the most profitable
const CORRECT_AGE_DATA = [
  { name: "Under 18", value: 220, revenue: 109248, avgSpending: 496.58, percentage: 22 },
  { name: "18-25", value: 198, revenue: 95280, avgSpending: 481.21, percentage: 19.8 },
  { name: "25-35", value: 195, revenue: 89540, avgSpending: 459.18, percentage: 19.5 },
  { name: "35-45", value: 210, revenue: 88420, avgSpending: 421.05, percentage: 21 },
  { name: "Over 50", value: 176, revenue: 79362, avgSpending: 450.92, percentage: 17.6 },
]

const COLORS = ["#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1b"]

export function AgeDistributionChart() {
  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif text-foreground">Age Group Distribution</CardTitle>
        <p className="text-xs text-muted-foreground">Youth (0-25) generates 44% of total revenue</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CORRECT_AGE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {CORRECT_AGE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(
                  value: number,
                  name: string,
                  props: { payload: { percentage: number; avgSpending: number; revenue: number } },
                ) => [
                  <div key="content" className="space-y-1">
                    <div>Transactions: {value}</div>
                    <div>Revenue: ${props.payload.revenue.toLocaleString()}</div>
                    <div>Share: {props.payload.percentage}%</div>
                    <div>Avg Spending: ${props.payload.avgSpending.toFixed(2)}</div>
                  </div>,
                  name,
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-foreground text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CORRECT_DATA = [
  { name: "MoE", fullName: "Mall of the Emirates", revenue: 181602, transactions: 385, avg: 471.69 },
  { name: "DM", fullName: "Dubai Mall", revenue: 168098, transactions: 366, avg: 459.29 },
  { name: "MCC", fullName: "Mirdif City Centre", revenue: 112150, transactions: 248, avg: 452.22 },
]

const MALL_NAME_MAP: Record<string, string> = {
  "Mall of the Emirates": "MoE",
  "Dubai Mall": "DM",
  "Mirdif City Centre": "MCC",
}

const COLORS = ["#dc2626", "#b91c1c", "#991b1b"]

interface RevenueChartProps {
  selectedMalls?: string[]
}

export function RevenueChart({ selectedMalls }: RevenueChartProps) {
  // Filter data based on selected malls
  const chartData = CORRECT_DATA.filter((item) => {
    if (!selectedMalls || selectedMalls.length === 0) return true
    return selectedMalls.some((mall) => MALL_NAME_MAP[mall] === item.name || mall === item.fullName)
  }).map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif text-foreground">Revenue Comparison by Mall</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis type="category" dataKey="name" stroke="#666" fontSize={12} width={50} />
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
                    props: { payload: { fullName: string; transactions: number; avg: number } },
                  ) => {
                    if (name === "revenue") {
                      return [
                        <div key="content" className="space-y-1">
                          <div className="font-semibold">{props.payload.fullName}</div>
                          <div>Revenue: ${value.toLocaleString()}</div>
                          <div>Transactions: {props.payload.transactions}</div>
                          <div>Avg: ${props.payload.avg.toFixed(2)}</div>
                        </div>,
                        "",
                      ]
                    }
                    return [value, name]
                  }}
                  labelFormatter={() => ""}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">No malls selected</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"

interface StatsCardsProps {
  totalRevenue?: number
  totalTransactions?: number
  avgTransaction?: number
}

export function StatsCards({
  totalRevenue = 461850,
  totalTransactions = 999,
  avgTransaction = 462.31,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: "text-red-500",
    },
    {
      title: "Total Transactions",
      value: totalTransactions.toLocaleString(),
      icon: ShoppingCart,
      color: "text-red-400",
    },
    {
      title: "Avg Transaction",
      value: `$${avgTransaction.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-red-300",
    },
    {
      title: "Age Segments",
      value: "5",
      icon: Users,
      color: "text-red-200",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50 bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-900/20">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

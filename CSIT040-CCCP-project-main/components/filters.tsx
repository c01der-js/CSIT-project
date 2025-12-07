"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getDayLabel } from "@/lib/data-processor"

interface FiltersProps {
  malls: string[]
  days: string[]
  selectedMalls: string[]
  selectedDays: string[]
  onMallChange: (malls: string[]) => void
  onDayChange: (days: string[]) => void
}

export function Filters({ malls, days, selectedMalls, selectedDays, onMallChange, onDayChange }: FiltersProps) {
  const toggleMall = (mall: string) => {
    if (selectedMalls.includes(mall)) {
      if (selectedMalls.length > 1) {
        onMallChange(selectedMalls.filter((m) => m !== mall))
      }
    } else {
      onMallChange([...selectedMalls, mall])
    }
  }

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        onDayChange(selectedDays.filter((d) => d !== day))
      }
    } else {
      onDayChange([...selectedDays, day])
    }
  }

  const selectAllMalls = () => onMallChange(malls)
  const selectAllDays = () => onDayChange(days)

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl border border-border/50">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Malls</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={selectAllMalls}
            className="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            Select All
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {malls.map((mall) => (
            <Button
              key={mall}
              variant="outline"
              size="sm"
              onClick={() => toggleMall(mall)}
              className={cn(
                "text-xs transition-all",
                selectedMalls.includes(mall)
                  ? "bg-red-900/40 border-red-700 text-red-100 hover:bg-red-900/50"
                  : "bg-transparent border-border/50 text-muted-foreground hover:bg-muted/50",
              )}
            >
              {mall}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Days</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={selectAllDays}
            className="text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            Select All
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <Button
              key={day}
              variant="outline"
              size="sm"
              onClick={() => toggleDay(day)}
              className={cn(
                "text-xs transition-all",
                selectedDays.includes(day)
                  ? "bg-red-900/40 border-red-700 text-red-100 hover:bg-red-900/50"
                  : "bg-transparent border-border/50 text-muted-foreground hover:bg-muted/50",
              )}
            >
              {getDayLabel(day).slice(0, 3)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

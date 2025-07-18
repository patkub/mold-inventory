"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Mold } from "@/types/mold"

interface MoldListProps {
  molds: Mold[]
  onSelect: (id: string) => void
  selectedMoldNumber: string | null
}

export function MoldList({ molds, onSelect, selectedMoldNumber }: MoldListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Retired":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <ScrollArea className="h-[500px]">
      {molds.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No molds found. Add a new mold to get started.</div>
      ) : (
        <ul className="space-y-2">
          {molds.map((mold) => (
            <li key={mold.number}>
              <button
                onClick={() => onSelect(mold.number)}
                className={cn(
                  "w-full text-left p-3 rounded-md transition-colors",
                  selectedMoldNumber === mold.number ? "bg-gray-100 border-l-4 border-gray-900" : "hover:bg-gray-50",
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{mold.number}</p>
                    <p className="text-sm text-muted-foreground">{mold.description}</p>
                  </div>
                  <Badge className={getStatusColor(mold.status)}>{mold.status}</Badge>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}

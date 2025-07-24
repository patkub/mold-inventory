"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Mold } from "@/types/mold"
import { MoldStatusBadge } from "@/components/mold-status-badge"

interface MoldListProps {
  molds: Mold[]
  onSelect: (id: string) => void
  selectedMoldNumber: string | null
}

export function MoldList({ molds, onSelect, selectedMoldNumber }: MoldListProps) {
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
                  selectedMoldNumber === mold.number
                    ? "bg-gray-100 dark:bg-gray-700 border-l-4 border-gray-900 dark:border-gray-100"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700",
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{mold.number}</p>
                    <p className="text-sm text-muted-foreground">{mold.description}</p>
                  </div>
                  <MoldStatusBadge mold={mold}></MoldStatusBadge>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}

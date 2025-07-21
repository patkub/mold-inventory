"use client"

import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, RotateCw } from "lucide-react"
import type { Mold } from "@/types/mold"

interface MoldProps {
  mold: Mold
}

export function MoldStatusBadge({ mold }: MoldProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Maintenance":
        return <RotateCw className="h-5 w-5 text-yellow-500" />
      case "Retired":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Badge className={getStatusColor(mold.status)}>{getStatusIcon(mold.status)} {mold.status}</Badge>
  )
}


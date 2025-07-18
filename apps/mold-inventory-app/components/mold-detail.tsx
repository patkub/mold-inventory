"use client"

import { useState } from "react"
import { useMolds } from "@/components/mold-provider"
import { MoldForm } from "@/components/mold-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Edit, Trash2, X, AlertTriangle, CheckCircle2, Clock, RotateCw } from "lucide-react"

interface MoldDetailProps {
  moldId: string
  onClose: () => void
}

export function MoldDetail({ moldId, onClose }: MoldDetailProps) {
  const { getMold, deleteMold } = useMolds()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const mold = getMold(moldId)

  if (!mold) return null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "Retired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isEditing) {
    return <MoldForm mold={mold} onCancel={() => setIsEditing(false)} />
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{mold.name}</h2>
            <Badge className={getStatusColor(mold.status)}>{mold.status}</Badge>
          </div>
          <p className="text-muted-foreground">Mold #{mold.number}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted-foreground">Material:</dt>
              <dd>{mold.material}</dd>
              <dt className="text-muted-foreground">Dimensions:</dt>
              <dd>{mold.dimensions}</dd>
              <dt className="text-muted-foreground">Weight:</dt>
              <dd>{mold.weight}</dd>
              <dt className="text-muted-foreground">Cavities:</dt>
              <dd>{mold.cavities}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Usage Information</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted-foreground">Location:</dt>
              <dd>{mold.location}</dd>
              <dt className="text-muted-foreground">Manufacturer:</dt>
              <dd>{mold.manufacturer}</dd>
              <dt className="text-muted-foreground">Purchase Date:</dt>
              <dd className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {mold.purchaseDate}
              </dd>
              <dt className="text-muted-foreground">Last Used:</dt>
              <dd className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {mold.lastUsed}
              </dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Notes</h3>
        <p className="text-sm bg-gray-50 p-3 rounded-md">{mold.notes || "No notes available."}</p>
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="font-semibold mb-2">Maintenance History</h3>
        {mold.maintenanceHistory && mold.maintenanceHistory.length > 0 ? (
          <ul className="space-y-2">
            {mold.maintenanceHistory.map((record, index) => (
              <li key={index} className="text-sm bg-gray-50 p-3 rounded-md">
                <div className="font-medium">{record.date}</div>
                <div>{record.description}</div>
                <div className="text-xs text-muted-foreground mt-1">Performed by: {record.performedBy}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No maintenance records available.</p>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the mold &quot;{mold.name}&quot; from your inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                deleteMold(moldId)
                onClose()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

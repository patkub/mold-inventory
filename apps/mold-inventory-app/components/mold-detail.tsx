"use client"

import { useState } from "react"
import { useMolds } from "@/components/mold-providers/mold-provider-db"
import { MoldForm } from "@/components/mold-form"
import { MoldStatusBadge } from "@/components/mold-status-badge"
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
import { Separator } from "@/components/ui/separator"
import { Edit, Trash2, X } from "lucide-react"

interface MoldDetailProps {
  moldNumber: string
  onClose: () => void
}

export function MoldDetail({ moldNumber, onClose }: MoldDetailProps) {
  const { getMold, deleteMold } = useMolds()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const mold = getMold(moldNumber)

  if (!mold) return null

  if (isEditing) {
    return <MoldForm mold={mold} onCancel={() => setIsEditing(false)} />
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{mold.number}</h2>
            <MoldStatusBadge mold={mold}></MoldStatusBadge>
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
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Specifications</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted-foreground">Description:</dt>
              <dd className="text-gray-900 dark:text-gray-100">{mold.description}</dd>
              <dt className="text-muted-foreground">Cycle Time:</dt>
              <dd className="text-gray-900 dark:text-gray-100">{mold.cycle_time}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6 border-border" />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the mold &quot;{mold.number}&quot; from your inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                deleteMold(moldNumber)
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

"use client"

import type React from "react"

import { useState } from "react"
import { useMolds } from "@/components/mold-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Mold } from "@/types/mold"
import { ArrowLeft, Save } from "lucide-react"

interface MoldFormProps {
  mold?: Mold
  onCancel: () => void
}

export function MoldForm({ mold, onCancel }: MoldFormProps) {
  const { addMold, updateMold } = useMolds()
  const isEditing = !!mold

  const [formData, setFormData] = useState<Omit<Mold, "id">>({
    number: mold?.number || "",
    description: mold?.description || "",
    cycleTime: mold?.cycleTime || 0,
    status: mold?.status || "Active"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && mold) {
      updateMold(mold.number, formData)
    } else {
      addMold(formData)
    }

    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{isEditing ? "Edit Mold" : "Add New Mold"}</h2>
        <Button type="button" variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Mold Number</Label>
            <Input id="number" name="number" value={formData.number} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mold Description</Label>
            <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cycleTime">Cycle Time</Label>
            <Input id="cycleTime" name="cycleTime" value={formData.cycleTime} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? "Update Mold" : "Save Mold"}
        </Button>
      </div>
    </form>
  )
}

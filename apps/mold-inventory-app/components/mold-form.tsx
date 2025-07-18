"use client"

import type React from "react"

import { useState } from "react"
import { useMolds } from "@/components/mold-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    name: mold?.name || "",
    number: mold?.number || "",
    material: mold?.material || "",
    dimensions: mold?.dimensions || "",
    weight: mold?.weight || "",
    cavities: mold?.cavities || "",
    location: mold?.location || "",
    manufacturer: mold?.manufacturer || "",
    purchaseDate: mold?.purchaseDate || new Date().toISOString().split("T")[0],
    lastUsed: mold?.lastUsed || new Date().toISOString().split("T")[0],
    status: mold?.status || "Active",
    notes: mold?.notes || "",
    maintenanceHistory: mold?.maintenanceHistory || [],
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
      updateMold(mold.id, formData)
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
            <Label htmlFor="name">Mold Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Mold Number</Label>
            <Input id="number" name="number" value={formData.number} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input id="material" name="material" value={formData.material} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="L x W x H"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input id="weight" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g., 5 kg" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cavities">Cavities</Label>
            <Input id="cavities" name="cavities" value={formData.cavities} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Storage Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input id="manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastUsed">Last Used</Label>
            <Input id="lastUsed" name="lastUsed" type="date" value={formData.lastUsed} onChange={handleChange} />
          </div>

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

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} />
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

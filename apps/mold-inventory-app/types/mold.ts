export interface MaintenanceRecord {
  date: string
  description: string
  performedBy: string
}

export interface Mold {
  id: string
  name: string
  number: string
  material: string
  dimensions: string
  weight: string
  cavities: string
  location: string
  manufacturer: string
  purchaseDate: string
  lastUsed: string
  status: "Active" | "Maintenance" | "Retired"
  notes: string
  maintenanceHistory: MaintenanceRecord[]
}

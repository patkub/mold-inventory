export interface MaintenanceRecord {
  date: string
  description: string
  performedBy: string
}

export interface Mold {
  number: string,
  description: string,
  cycle_time: string,
  status: "Active" | "Maintenance" | "Retired"
}

export interface MaintenanceRecord {
  date: string
  description: string
  performedBy: string
}

export interface Mold {
  number: string,
  description: string,
  cycleTime: number,
  status: "Active" | "Maintenance" | "Retired"
}

export interface Mold {
  number: string,
  description: string,
  cycle_time: string,
  status: "Active" | "Maintenance" | "Retired"
}

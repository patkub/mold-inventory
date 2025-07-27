export interface Mold {
  number: string,
  description: string,
  cycle_time: number,
  status: "Active" | "Maintenance" | "Retired"
}

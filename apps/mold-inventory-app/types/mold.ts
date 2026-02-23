export interface Mold {
  number: string
  description: string
  cycle_time: number
  status: 'Active' | 'Maintenance' | 'Retired'
}

/* eslint-disable no-unused-vars */
export type MoldContextType = {
  getMolds: () => void
  molds: Mold[]
  addMold: (mold: Omit<Mold, 'id'>) => void
  updateMold: (id: string, mold: Partial<Mold>) => void
  deleteMold: (id: string) => void
  getMold: (id: string) => Mold | undefined
}
/* eslint-enable no-unused-vars */

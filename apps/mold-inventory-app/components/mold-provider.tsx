"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { Mold } from "@/types/mold"

type MoldContextType = {
  molds: Mold[]
  addMold: (mold: Omit<Mold, "id">) => void
  updateMold: (id: string, mold: Partial<Mold>) => void
  deleteMold: (id: string) => void
  getMold: (id: string) => Mold | undefined
}

const MoldContext = createContext<MoldContextType | undefined>(undefined)

export function MoldProvider({ children }: { children: React.ReactNode }) {
  const [molds, setMolds] = useState<Mold[]>([])

  const addMold = (mold: Omit<Mold, "id">) => {
    const newMold = {
      ...mold,
      id: Math.random().toString(36).substring(2, 9),
    }
    setMolds((prev) => [...prev, newMold])
  }

  const updateMold = (number: string, updatedMold: Partial<Mold>) => {
    setMolds((prev) => prev.map((mold) => (mold.number === number ? { ...mold, ...updatedMold } : mold)))
  }

  const deleteMold = (number: string) => {
    setMolds((prev) => prev.filter((mold) => mold.number !== number))
  }

  const getMold = (number: string) => {
    return molds.find((mold) => mold.number === number)
  }

  return (
    <MoldContext.Provider value={{molds, addMold, updateMold, deleteMold, getMold }}>{children}</MoldContext.Provider>
  )
}

export const useMolds = () => {
  const context = useContext(MoldContext)
  if (context === undefined) {
    throw new Error("useMolds must be used within a MoldProvider")
  }
  return context
}

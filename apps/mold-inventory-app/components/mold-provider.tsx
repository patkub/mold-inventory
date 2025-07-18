"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import type { Mold } from "@/types/mold"
import { initialMolds } from "@/data/initial-molds"

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
  const { user } = useAuth0()

  // Use user ID as part of the storage key to separate data between users
  const storageKey = user?.sub ? `molds-${user.sub}` : "molds"

  useEffect(() => {
    // Load initial data or from localStorage if available
    const savedMolds = localStorage.getItem(storageKey)
    if (savedMolds) {
      setMolds(JSON.parse(savedMolds))
    } else {
      setMolds(initialMolds)
    }
  }, [storageKey])

  useEffect(() => {
    // Save to localStorage whenever molds change
    if (molds.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(molds))
    }
  }, [molds, storageKey])

  const addMold = (mold: Omit<Mold, "id">) => {
    const newMold = {
      ...mold,
      id: Math.random().toString(36).substring(2, 9),
    }
    setMolds((prev) => [...prev, newMold])
  }

  const updateMold = (id: string, updatedMold: Partial<Mold>) => {
    setMolds((prev) => prev.map((mold) => (mold.id === id ? { ...mold, ...updatedMold } : mold)))
  }

  const deleteMold = (id: string) => {
    setMolds((prev) => prev.filter((mold) => mold.id !== id))
  }

  const getMold = (id: string) => {
    return molds.find((mold) => mold.id === id)
  }

  return (
    <MoldContext.Provider value={{ molds, addMold, updateMold, deleteMold, getMold }}>{children}</MoldContext.Provider>
  )
}

export const useMolds = () => {
  const context = useContext(MoldContext)
  if (context === undefined) {
    throw new Error("useMolds must be used within a MoldProvider")
  }
  return context
}

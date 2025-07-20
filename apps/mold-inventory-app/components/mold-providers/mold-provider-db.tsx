"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import type { Mold } from "@/types/mold"

type MoldContextType = {
  getMolds: () => void
  molds: Mold[]
  addMold: (mold: Omit<Mold, "id">) => void
  updateMold: (id: string, mold: Partial<Mold>) => void
  deleteMold: (id: string) => void
  getMold: (id: string) => Mold | undefined
}

const MoldContext = createContext<MoldContextType | undefined>(undefined)

export function MoldProviderDB({ children }: { children: React.ReactNode }) {
  const { getAccessTokenSilently } = useAuth0()

  const [molds, setMolds] = useState<Mold[]>([])

  /**
   * Get molds from database
   * 
   * Get access token from Auth0
   * Call GET /api/molds with access token
   * Return molds JSON response
   */
  const getMolds = async () => {
    const getMoldsAuth = async () => {
      const domain = "dev-5gm1mr1z8nbmuhv7.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const apiMoldsResponse = await fetch("/api/molds", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const molds = await apiMoldsResponse.json();
        // console.log(molds)

        return molds;
      } catch (e) {
        // Error occurred getting molds
        console.log(e)
      }
    };

    // Get molds from API
    const molds = await getMoldsAuth();
    // update molds
    setMolds([...molds.molds]);
  };


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
    <MoldContext.Provider value={{ molds, getMolds, addMold, updateMold, deleteMold, getMold }}>{children}</MoldContext.Provider>
  )
}

export const useMolds = () => {
  const context = useContext(MoldContext)
  if (context === undefined) {
    throw new Error("useMolds must be used within a MoldProviderDB")
  }
  return context
}

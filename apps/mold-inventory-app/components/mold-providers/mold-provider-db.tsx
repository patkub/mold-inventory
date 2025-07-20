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

type MoldsType = {
  molds: Mold[]
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
  const getMoldsAuth = async (): Promise<MoldsType | undefined> => {
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

      const molds = await apiMoldsResponse.json() as MoldsType;
      // console.log(molds)

      return molds;
    } catch (e) {
      // Error occurred getting molds
      console.log(e)
    }
  };

  const createMoldAuth = async (newMold: Omit<Mold, "id">): Promise<Mold | undefined> => {
    const domain = "dev-5gm1mr1z8nbmuhv7.us.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const apiMoldsResponse = await fetch("/api/molds", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMold),
      });

      const mold = await apiMoldsResponse.json() as Mold;
      // console.log(mold)

      return mold;
    } catch (e) {
      // Error occurred creating mold
      console.log(e)
    }
  };

  const deleteMoldAuth = async (number: string): Promise<Mold | undefined> => {
    const domain = "dev-5gm1mr1z8nbmuhv7.us.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const apiMoldsResponse = await fetch("/api/molds", {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: number }),
      });

      const response = await apiMoldsResponse.json() as Mold;
      // console.log(response)

      return response;
    } catch (e) {
      // Error occurred deleting mold
      console.log(e)
    }
  };

  const updateMoldAuth = async (existingMold: Partial<Mold>): Promise<Mold | undefined> => {
    const domain = "dev-5gm1mr1z8nbmuhv7.us.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const apiMoldsResponse = await fetch("/api/molds", {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingMold),
      });

      const updatedMold = await apiMoldsResponse.json() as Mold;
      // console.log(updatedMold)

      return updatedMold;
    } catch (e) {
      // Error occurred updating molds
      console.log(e)
    }
  };

  /**
   * Get molds from database
   * 
   * Get access token from Auth0
   * Call GET /api/molds with access token
   * Return molds JSON response
   */
  const getMolds = async () => {
    // Get molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds.molds]);
    }
  };

  const addMold = async (mold: Omit<Mold, "id">) => {
    // Create new mold in database
    await createMoldAuth(mold);

    // Update molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds.molds]);
    }
  }

  const updateMold = async (number: string, updatedMold: Partial<Mold>) => {
    // Update mold in database
    await updateMoldAuth(updatedMold)
    
    // Get molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds.molds]);
    }
  }

  const deleteMold = async (number: string) => {
    // Delete mold in database
    await deleteMoldAuth(number);

    // Get molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds.molds]);
    }
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

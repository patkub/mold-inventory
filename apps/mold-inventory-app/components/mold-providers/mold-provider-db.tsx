"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import type { Mold } from "@/types/mold"
import { useToast } from "@/components/toast-provider"

type MoldContextType = {
  getMolds: () => void
  molds: Mold[]
  addMold: (mold: Omit<Mold, "id">) => void
  updateMold: (id: string, mold: Partial<Mold>) => void
  deleteMold: (id: string) => void
  getMold: (id: string) => Mold | undefined
}

type DeleteMoldResponse = {
  message: string
}

const MoldContext = createContext<MoldContextType | undefined>(undefined)

export function MoldProviderDB({ children }: { children: React.ReactNode }) {
  const { getAccessTokenSilently } = useAuth0()

  const [molds, setMolds] = useState<Mold[]>([])
  const { toast } = useToast()

  // Add Auth0 access token to request
  const attachAuth0AccessToken = async (request: Request) => {
    const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""
    const AUTH0_AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ""

    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${AUTH0_AUDIENCE}`,
        issuer: `https://${AUTH0_DOMAIN}`,
      },
    });

    request.headers.append("Authorization", `Bearer ${accessToken}`)
    return request;
  }

  /**
   * Get molds from database
   * 
   * Get access token from Auth0
   * Call GET /api/molds with access token
   * Return molds JSON response
   */
  const getMoldsAuth = async (): Promise<Mold[] | undefined> => {
    try {
      const request = new Request("/api/molds", {
        method: 'GET'
      });
      await attachAuth0AccessToken(request);

      const response = await fetch(request);
      const molds = await response.json() as Mold[];

      return molds;
    } catch (e) {
      // Error occurred getting molds
      console.log(e)
    }
  };

  const createMoldAuth = async (newMold: Omit<Mold, "id">): Promise<Mold | undefined> => {
    try {
      const request = new Request("/api/molds", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMold),
      });
      await attachAuth0AccessToken(request);

      const response = await fetch(request);
      const mold = await response.json() as Mold;

      toast({
        title: "Success",
        description: `Mold ${mold.number} added successfully`,
      })

      return mold;
    } catch (e) {
      // Error occurred creating mold
      console.log(e)

      toast({
        title: "Error",
        description: `An error occurred adding mold ${newMold.number}`,
      })
    }
  };

  const deleteMoldAuth = async (number: string): Promise<DeleteMoldResponse | undefined> => {
    try {
      const request = new Request("/api/molds", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: number }),
      });
      await attachAuth0AccessToken(request);

      const response = await fetch(request);
      const delResp = await response.json() as DeleteMoldResponse;
      // console.log(delResp)

      toast({
        title: "Success",
        description: `Mold ${number} deleted successfully`,
      })

      return delResp;
    } catch (e) {
      // Error occurred deleting mold
      console.log(e)

      toast({
        title: "Error",
        description: `An error occurred deleting mold ${number}`,
      })
    }
  };

  const updateMoldAuth = async (number: string, existingMold: Partial<Mold>): Promise<Mold | undefined> => {
    try {
      const request = new Request("/api/molds", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: number, mold: existingMold }),
      });
      await attachAuth0AccessToken(request);

      const response = await fetch(request);
      const updatedMold = await response.json() as Mold;
      // console.log(updatedMold)

      toast({
        title: "Success",
        description: `Mold ${number} updated successfully`,
      })

      return updatedMold;
    } catch (e) {
      // Error occurred updating molds
      console.log(e)

      toast({
        title: "Error",
        description: `An error occurred updating mold ${number}`,
      })
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
      setMolds([...molds]);
    }
  };

  const addMold = async (mold: Omit<Mold, "id">) => {
    // Create new mold in database
    await createMoldAuth(mold);

    // Update molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds]);
    }
  }

  const updateMold = async (number: string, updatedMold: Partial<Mold>) => {
    // Update mold in database
    await updateMoldAuth(number, updatedMold)

    // Get molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds]);
    }
  }

  const deleteMold = async (number: string) => {
    // Delete mold in database
    await deleteMoldAuth(number);

    // Get molds from API
    const molds = await getMoldsAuth();
    if (molds) {
      // update molds
      setMolds([...molds]);
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

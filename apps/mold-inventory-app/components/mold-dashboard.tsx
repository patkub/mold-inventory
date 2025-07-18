"use client"

import { useState } from "react"
import { useMolds } from "@/components/mold-provider"
import { MoldList } from "@/components/mold-list"
import { MoldDetail } from "@/components/mold-detail"
import { MoldForm } from "@/components/mold-form"
import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package2, Plus, Search } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"

export function MoldDashboard() {
  const { molds } = useMolds()
  const { user } = useAuth0()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMoldId, setSelectedMoldId] = useState<string | null>(null)
  const [isAddingMold, setIsAddingMold] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredMolds = molds.filter((mold) => {
    const matchesSearch =
      mold.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mold.number.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && mold.status === "Active"
    if (activeTab === "maintenance") return matchesSearch && mold.status === "Maintenance"
    if (activeTab === "retired") return matchesSearch && mold.status === "Retired"

    return matchesSearch
  })

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Package2 className="mr-2" /> Mold Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Welcome, {user?.name}! Track and manage your mold inventory efficiently
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setIsAddingMold(true)
              setSelectedMoldId(null)
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Mold
          </Button>
          <UserMenu />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search molds..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="retired">Retired</TabsTrigger>
              </TabsList>
            </Tabs>

            <MoldList
              molds={filteredMolds}
              onSelect={(id) => {
                setSelectedMoldId(id)
                setIsAddingMold(false)
              }}
              selectedMoldId={selectedMoldId}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            {isAddingMold ? (
              <MoldForm onCancel={() => setIsAddingMold(false)} />
            ) : selectedMoldId ? (
              <MoldDetail moldId={selectedMoldId} onClose={() => setSelectedMoldId(null)} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Mold Selected</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                  Select a mold from the list to view details or click the &quot;Add New Mold&quot; button to create a new entry.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

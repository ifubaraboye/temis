import { useState, useEffect, useMemo, useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Navbar } from "@/components/Navbar"
import { StatsCard } from "@/components/StatsCard"
import { TablePicker } from "@/components/TablePicker"
import { TableWidget } from "@/components/TableWidget"
import { Button } from "@/components/ui/button"
import { clearStoredConvexUrl, getStoredConvexUrl, getConvexClient } from "@/lib/convexClient"
import { Database, Search, Plus, Loader2 } from "lucide-react"

interface TableDocument {
  _id: string
  _creationTime: number
  [key: string]: unknown
}

interface TableInfo {
  name: string
  documentCount: number
}

export function DashboardPage() {
  const navigate = useNavigate()
  const deploymentUrl = getStoredConvexUrl() || ""
  const client = getConvexClient()

  const [tables, setTables] = useState<TableInfo[]>([])
  const [selectedTables, setSelectedTables] = useState<string[]>([])
  const [tableData, setTableData] = useState<Map<string, TableDocument[]>>(new Map())
  const [tableErrors, setTableErrors] = useState<Map<string, Error>>(new Map())
  const [tableLoading, setTableLoading] = useState<Map<string, boolean>>(new Map())
  const [mutationCount, setMutationCount] = useState(0)
  const [previousData, setPreviousData] = useState<Map<string, TableDocument[]>>(new Map())
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoadingTables, setIsLoadingTables] = useState(true)

  useEffect(() => {
    if (!deploymentUrl) {
      navigate({ to: "/" })
    }
  }, [deploymentUrl, navigate])

  const fetchTables = useCallback(async () => {
    if (!client) return
    
    setIsLoadingTables(true)
    try {
      const result = await client.query("api:listTables", {})
      const tableNames: TableInfo[] = result.map((t: { tableName?: string; name?: string }) => ({
        name: t.tableName || t.name || "",
        documentCount: 0,
      }))
      setTables(tableNames)
    } catch (err) {
      console.error("Failed to fetch tables:", err)
    } finally {
      setIsLoadingTables(false)
    }
  }, [client])

  useEffect(() => {
    fetchTables()
  }, [fetchTables])

  useEffect(() => {
    if (tables.length > 0 && selectedTables.length === 0) {
      const defaultSelected = tables.slice(0, 2).map((t) => t.name)
      setSelectedTables(defaultSelected)
    }
  }, [tables, selectedTables.length])

  useEffect(() => {
    const fetchTableData = async (tableName: string) => {
      if (!client) return

      setTableLoading((prev) => new Map(prev).set(tableName, true))
      setTableErrors((prev) => {
        const next = new Map(prev)
        next.delete(tableName)
        return next
      })

      try {
        const prevData = tableData.get(tableName) || []
        setPreviousData((prev) => new Map(prev).set(tableName, prevData))

        const result = await client.query("api:listTable", { tableName })
        
        setTableData((prev) => new Map(prev).set(tableName, result))
        
        if (prevData.length > 0 && JSON.stringify(prevData) !== JSON.stringify(result)) {
          setMutationCount((c) => c + 1)
        }
      } catch (err) {
        setTableErrors((prev) => new Map(prev).set(tableName, err as Error))
      } finally {
        setTableLoading((prev) => new Map(prev).set(tableName, false))
      }
    }

    selectedTables.forEach((tableName) => {
      fetchTableData(tableName)
    })

    const interval = setInterval(() => {
      selectedTables.forEach((tableName) => {
        fetchTableData(tableName)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedTables, client])

  const handleDisconnect = useCallback(() => {
    clearStoredConvexUrl()
    navigate({ to: "/" })
  }, [navigate])

  const handleToggleTable = useCallback((tableName: string) => {
    setSelectedTables((prev) => {
      if (prev.includes(tableName)) {
        return prev.filter((t) => t !== tableName)
      }
      return [...prev, tableName]
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === "Escape") {
        setSearchOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredTables = useMemo(() => {
    if (!searchQuery) return tables
    return tables.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [tables, searchQuery])

  const totalDocuments = useMemo(() => {
    let total = 0
    tableData.forEach((docs) => {
      total += docs.length
    })
    return total
  }, [tableData])

  if (!deploymentUrl) return null

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar
        deploymentUrl={deploymentUrl}
        mutationCount={mutationCount}
        onDisconnect={handleDisconnect}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Tables" 
            value={isLoadingTables ? <Loader2 className="h-5 w-5 animate-spin" /> : tables.length} 
          />
          <StatsCard title="Total Documents" value={totalDocuments} />
          <StatsCard title="Mutations" value={mutationCount} subtitle="Since connected" />
          <StatsCard title="Watching" value={selectedTables.length} subtitle="Tables active" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold">Tables</h2>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search</span>
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>

        <TablePicker
          tables={tables}
          selectedTables={selectedTables}
          onToggleTable={handleToggleTable}
        />

        {selectedTables.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-zinc-900/50 flex items-center justify-center">
              <Database className="h-10 w-10 text-zinc-600" />
            </div>
            <h3 className="font-heading text-lg font-medium text-zinc-300 mb-2">
              No tables selected
            </h3>
            <p className="text-sm text-zinc-500 max-w-sm">
              Select tables from the picker above to start monitoring your database in real-time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {selectedTables.map((tableName) => (
              <TableWidget
                key={tableName}
                tableName={tableName}
                documents={tableData.get(tableName)}
                isLoading={tableLoading.get(tableName) ?? false}
                error={tableErrors.get(tableName) ?? null}
                onRemove={() => handleToggleTable(tableName)}
                previousDocuments={previousData.get(tableName)}
              />
            ))}
          </div>
        )}
      </main>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 outline-none text-sm"
                autoFocus
              />
              <kbd className="text-xs text-zinc-500">ESC</kbd>
            </div>
            <div className="max-h-64 overflow-auto p-2">
              {filteredTables.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No tables found
                </div>
              ) : (
                filteredTables.map((table) => {
                  const isSelected = selectedTables.includes(table.name)
                  return (
                    <button
                      key={table.name}
                      onClick={() => {
                        handleToggleTable(table.name)
                        if (!isSelected) setSearchOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 text-left"
                    >
                      <span className="font-mono text-sm text-zinc-200">{table.name}</span>
                      {isSelected ? (
                        <Plus className="h-4 w-4 text-violet-400 rotate-45" />
                      ) : (
                        <Plus className="h-4 w-4 text-zinc-500" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

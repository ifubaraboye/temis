import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, Loader2 } from "lucide-react"
import { formatValue } from "@/lib/formatValue"
import { cn } from "@/lib/utils"

interface Document {
  _id: string
  _creationTime: number
  [key: string]: unknown
}

interface TableWidgetProps {
  tableName: string
  documents: Document[] | undefined
  isLoading: boolean
  error: Error | null
  onRemove: () => void
  previousDocuments?: Document[]
}

export function TableWidget({
  tableName,
  documents,
  isLoading,
  error,
  onRemove,
  previousDocuments = [],
}: TableWidgetProps) {
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!documents || !previousDocuments.length) return

    const prevIds = new Set(previousDocuments.map((d) => d._id))
    const newOrUpdated = documents.filter((d) => !prevIds.has(d._id) || JSON.stringify(d) !== JSON.stringify(previousDocuments.find((p) => p._id === d._id)))

    if (newOrUpdated.length > 0) {
      const newIds = new Set(newOrUpdated.map((d) => d._id))
      setFlashIds(newIds)

      const timer = setTimeout(() => {
        setFlashIds(new Set())
      }, 1200)

      return () => clearTimeout(timer)
    }
  }, [documents, previousDocuments])

  const columns = useMemo(() => {
    if (!documents?.length) return []
    const firstDoc = documents[0]
    return Object.keys(firstDoc)
      .filter((key) => key !== "_id" && key !== "_creationTime")
      .slice(0, 7)
  }, [documents])

  if (error) {
    return (
      <Card className="bg-zinc-900/50 border-red-900/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-mono text-sm text-red-400">{tableName}</CardTitle>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Failed to load: {error.message}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-3 sticky top-0 bg-zinc-900/95 backdrop-blur z-10 border-b border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="font-mono text-sm text-zinc-200">{tableName}</CardTitle>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Badge variant="secondary" className="text-[10px] bg-zinc-800">
                {documents?.length ?? 0}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
            <X className="h-4 w-4 text-zinc-500 hover:text-zinc-300" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
          </div>
        ) : !documents?.length ? (
          <div className="flex items-center justify-center py-12 text-zinc-500 text-sm">
            No documents
          </div>
        ) : (
          <div className="overflow-auto max-h-[400px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-zinc-800/50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider font-mono"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc._id}
                    className={cn(
                      "border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors",
                      flashIds.has(doc._id) && "animate-flash"
                    )}
                  >
                    {columns.map((col) => (
                      <td key={col} className="px-4 py-2 text-sm">
                        {formatValue(doc[col], col)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface TableInfo {
  name: string
  documentCount: number
}

interface TablePickerProps {
  tables: TableInfo[]
  selectedTables: string[]
  onToggleTable: (tableName: string) => void
}

export function TablePicker({ tables, selectedTables, onToggleTable }: TablePickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tables.map((table) => {
        const isSelected = selectedTables.includes(table.name)
        return (
          <Button
            key={table.name}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleTable(table.name)}
            className={cn(
              "gap-2 font-mono text-xs",
              isSelected && "bg-violet-600 hover:bg-violet-700"
            )}
          >
            <span>{table.name}</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded text-[10px]",
              isSelected ? "bg-white/20" : "bg-zinc-700"
            )}>
              {table.documentCount}
            </span>
          </Button>
        )
      })}
    </div>
  )
}

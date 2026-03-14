import { Badge } from "@/components/ui/badge"

export function formatValue(value: unknown, fieldName?: string): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-zinc-500">null</span>
  }

  if (typeof value === "boolean") {
    return (
      <Badge variant={value ? "default" : "secondary"} className={value ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-zinc-700/50 text-zinc-400 border-zinc-600/30"}>
        {value ? "true" : "false"}
      </Badge>
    )
  }

  if (fieldName) {
    if (fieldName === "status") {
      const statusColors: Record<string, string> = {
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        delivered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
        active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        inactive: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30",
        failed: "bg-red-500/20 text-red-400 border-red-500/30",
        completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      }
      const colorClass = statusColors[String(value).toLowerCase()] || "bg-zinc-700/50 text-zinc-400 border-zinc-600/30"
      return (
        <Badge variant="outline" className={colorClass}>
          {String(value)}
        </Badge>
      )
    }

    if (fieldName === "price" || fieldName === "total" || fieldName === "amount") {
      const num = typeof value === "number" ? value : parseFloat(String(value))
      if (!isNaN(num)) {
        return <span className="text-emerald-400 font-mono">${num.toLocaleString()}</span>
      }
    }

    if (fieldName.endsWith("At") || fieldName === "timestamp" || fieldName === "expiresAt" || fieldName === "createdAt" || fieldName === "updatedAt") {
      const date = new Date(Number(value) * 1000)
      if (!isNaN(date.getTime())) {
        return <span className="text-zinc-300 font-mono text-sm">{date.toLocaleString()}</span>
      }
    }
  }

  if (typeof value === "number") {
    return <span className="text-blue-400 font-mono">{value.toLocaleString()}</span>
  }

  if (typeof value === "string") {
    if (value.length > 50) {
      return (
        <span className="text-zinc-300 font-mono text-sm" title={value}>
          {value.slice(0, 50)}...
        </span>
      )
    }
    return <span className="text-zinc-300 font-mono text-sm">{value}</span>
  }

  if (Array.isArray(value)) {
    return <span className="text-zinc-500 font-mono text-sm">[{value.length} items]</span>
  }

  if (typeof value === "object") {
    return <span className="text-zinc-500 font-mono text-sm">{`{...}`}</span>
  }

  return String(value)
}

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Database, Copy, Check, LogOut } from "lucide-react"

interface NavbarProps {
  deploymentUrl: string
  mutationCount: number
  onDisconnect: () => void
}

export function Navbar({ deploymentUrl, mutationCount, onDisconnect }: NavbarProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(deploymentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-600/20">
            <Database className="h-5 w-5 text-violet-400" />
          </div>
          <h1 className="font-heading text-xl font-bold tracking-tight">ConvexView</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-zinc-400 text-xs">{deploymentUrl}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800/50 border border-zinc-700/50">
            <span className="text-xs text-zinc-400">Mutations:</span>
            <span className="font-mono text-sm text-violet-400">{mutationCount}</span>
          </div>

          <Button variant="outline" size="sm" onClick={onDisconnect} className="gap-2">
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </div>
    </header>
  )
}

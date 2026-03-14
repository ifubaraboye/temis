import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Database, Loader2 } from "lucide-react"
import { createConvexClient, setStoredConvexUrl, isValidConvexUrl } from "@/lib/convexClient"

export function ConnectPage() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const trimmedUrl = url.trim()
    if (!trimmedUrl) {
      setError("Please enter a Convex deployment URL")
      return
    }

    if (!isValidConvexUrl(trimmedUrl)) {
      setError("Invalid URL. Must be a Convex Cloud deployment (e.g., https://your-app.convex.cloud)")
      return
    }

    setIsLoading(true)

    try {
      createConvexClient(trimmedUrl)
      setStoredConvexUrl(trimmedUrl)
      navigate({ to: "/dashboard" })
    } catch (err) {
      setError("Failed to connect. Please check the URL and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900/80 border-zinc-800 backdrop-blur">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30">
            <Database className="h-7 w-7 text-violet-400" />
          </div>
          <CardTitle className="font-heading text-2xl">ConvexView</CardTitle>
          <CardDescription className="text-zinc-400">
            Connect to your Convex deployment to explore your database in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="convex-url" className="text-sm font-medium text-zinc-300">
                Convex Deployment URL
              </label>
              <Input
                id="convex-url"
                type="url"
                placeholder="https://your-app.convex.cloud"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="font-mono text-sm"
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-900/30 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

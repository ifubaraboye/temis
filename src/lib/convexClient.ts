import { ConvexReactClient } from "convex/react"
import { GenericId } from "convex/values"

const STORAGE_KEY = "convex_url"

export function getStoredConvexUrl(): string | null {
  return localStorage.getItem(STORAGE_KEY)
}

export function setStoredConvexUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY, url)
}

export function clearStoredConvexUrl(): void {
  localStorage.removeItem(STORAGE_KEY)
}

let convexClient: ConvexReactClient | null = null

export function createConvexClient(url: string): ConvexReactClient {
  convexClient = new ConvexReactClient(url)
  return convexClient
}

export function getConvexClient(): ConvexReactClient | null {
  return convexClient
}

export function isValidConvexUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" && parsed.hostname.endsWith(".convex.cloud")
  } catch {
    return false
  }
}

export async function queryConvex<T>(client: ConvexReactClient, queryName: string, args: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${client.serverUrl}/api/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: queryName,
      args,
      requestTimeout: 10000,
    }),
  })

  if (!response.ok) {
    throw new Error(`Query failed: ${response.statusText}`)
  }

  const data = await response.json()
  
  if (data.error) {
    throw new Error(data.error.message || "Query failed")
  }
  
  return data.value
}

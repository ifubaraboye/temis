import { Map } from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/Header"

export function StoresPage() {
  return (
    <div className="min-h-screen bg-white">
     <Header />

      <main>

        <Card className="h-[83.7svh] rounded-none p-0 overflow-hidden">
          <Map center={[3.3792, 6.5244]} zoom={11}>
          </Map>
        </Card>
      </main>
    </div>
  )
}
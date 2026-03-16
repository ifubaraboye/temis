import { Map, MapMarker, MarkerContent } from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { MapPin } from "lucide-react";

const STORES = [
  { name: "Tésmi Lagos", address: "Victoria Island, Lagos", lng: 3.3792, lat: 6.5244 },
]

export function StoresPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main>
        <Card className="h-[83.7svh] rounded-none p-0 overflow-hidden">
          <Map center={[3.3792, 6.5244]} zoom={5}>
            {STORES.map((store) => (
              <MapMarker
                key={store.name}
                longitude={store.lng}
                latitude={store.lat}
              >
                <MarkerContent>
                  <div className="cursor-pointer">
                    <MapPin
                      className="fill-white stroke-black"
                      size={32}
                    />
                  </div>
                </MarkerContent>
              </MapMarker>
            ))}
          </Map>
        </Card>
      </main>
    </div>
  )
}
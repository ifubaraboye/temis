import { useState } from "react";
import { Link } from "react-router-dom";

export function InfoGrid() {
  const [touchHovered, setTouchHovered] = useState(false);
  const [storesHovered, setStoresHovered] = useState(false);

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Stores — hover reveals image */}
          <Link
            to="/stores"
            className="relative bg-[#D9D9D9] rounded-t-[50px] p-8 h-64 flex flex-col justify-between group cursor-pointer overflow-hidden transition-colors"
            onMouseEnter={() => setStoresHovered(true)}
            onMouseLeave={() => setStoresHovered(false)}
          >
            {/* Background image fades in */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: "url('/stores.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: storesHovered ? 1 : 0,
              }}
            />
            {/* Dark overlay so text stays readable */}
            <div
              className="absolute inset-0 duration-500"

            />
            <span className={`relative text-lg font-medium lowercase transition-colors duration-300 ${storesHovered ? "text-white" : "text-black"}`}>
              stores
            </span>
            <div className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 transform ${storesHovered ? "opacity-100 translate-y-0 border-white" : "opacity-0 translate-y-2 border-black"}`}>
              <img src="/back.svg" alt="" className={`w-4 h-4 rotate-180 ${storesHovered ? "brightness-0 invert" : ""}`} />
            </div>
          </Link>

          {/* Get in touch — hover reveals contact details */}
          <div
            className="bg-[#D9D9D9] rounded-t-[50px] p-8 h-64 flex flex-col justify-between cursor-pointer hover:bg-gray-200 transition-colors"
            onMouseEnter={() => setTouchHovered(true)}
            onMouseLeave={() => setTouchHovered(false)}
          >
            <span className="text-lg font-medium lowercase">get in touch</span>

            <div
              className="flex flex-col gap-1 transition-all duration-400"
              style={{
                opacity: touchHovered ? 1 : 0,
                transform: touchHovered ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 300ms ease, transform 300ms ease",
              }}
            >
              <p className="text-[11px] uppercase tracking-widest font-mono text-gray-700">+1 34565676886 (Whatsapp)</p>
              <p className="text-[11px] uppercase tracking-widest font-mono text-gray-700">+234 34565676886</p>
              <p className="text-[11px] uppercase tracking-widest font-mono text-gray-700">hello@tesmi.africa</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-[#D9D9D9] rounded-t-[50px] p-8 h-64 flex flex-col justify-between group cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="text-lg font-medium lowercase">faq</span>
            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <img src="/back.svg" alt="" className="w-4 h-4 rotate-180" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
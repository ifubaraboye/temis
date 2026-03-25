import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InfoGrid } from "@/components/InfoGrid";
import { NewsletterForm } from "@/components/Newsletter";

const PRODUCT_IMAGES = [
  "shirt.png",
  "trousers.png",
  "skirt.png",
  "shirt.png",
  "trousers.png",
  "skirt.png",
  "shirt.png",
  "trousers.png",
];

const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
const COLORS = [
  { name: "Olive", hex: "#7E6B5A" },
  { name: "Beige", hex: "#E2D9D2" },
];

const COMPLETE_THE_LOOK = [
  { id: 1, name: "LOREM IPSUM PASSAG EEDZX", price: "₦30,000", image: "trousers.png" },
  { id: 2, name: "LOREM IPSUM PASSAG EEDZX", price: "₦30,000", image: "shirt.png" },
  { id: 3, name: "LOREM IPSUM PASSAG EEDZX", price: "₦30,000", image: "skirt.png" },
];

export function ProductPage() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>("S");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [activeTab, setActiveTab] = useState<"description" | "delivery">("description");
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef(0);

  const descRef = useRef<HTMLButtonElement>(null);
  const delivRef = useRef<HTMLButtonElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (descRef.current) {
      setUnderline({ left: descRef.current.offsetLeft, width: descRef.current.offsetWidth });
    }
  }, []);

  useEffect(() => {
    const el = activeTab === "description" ? descRef.current : delivRef.current;
    if (el) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  // Keep ref in sync with state
  useEffect(() => {
    currentImageRef.current = currentImage;
  }, [currentImage]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    let isBusy = false;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      const idx = currentImageRef.current;
      const total = PRODUCT_IMAGES.length;

      // At the boundary and animation fully settled — return WITHOUT calling
      // preventDefault. The browser gets the event untouched and scrolls the
      // page natively, so the transition is perfectly seamless.
      if (e.deltaY > 0 && idx >= total - 1 && !isBusy) return;
      if (e.deltaY < 0 && idx <= 0 && !isBusy) return;

      // Still images to cycle through — take control from the browser.
      e.preventDefault();

      if (isBusy) return;

      if (e.deltaY > 0) {
        isBusy = true;
        const newIdx = idx + 1;
        currentImageRef.current = newIdx;
        setCurrentImage(newIdx);
        container.scrollTo({ top: newIdx * container.clientHeight, behavior: "smooth" });
        setTimeout(() => { isBusy = false; }, 600);
      } else {
        isBusy = true;
        const newIdx = idx - 1;
        currentImageRef.current = newIdx;
        setCurrentImage(newIdx);
        container.scrollTo({ top: newIdx * container.clientHeight, behavior: "smooth" });
        setTimeout(() => { isBusy = false; }, 600);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const itemHeight = container.scrollHeight / PRODUCT_IMAGES.length;
    const newIndex = Math.round(scrollTop / itemHeight);
    setCurrentImage(Math.min(Math.max(newIndex, 0), PRODUCT_IMAGES.length - 1));
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 lg:items-center min-h-[85vh] px-6 md:px-10">

          {/* Left - Image Gallery */}
          <div className="relative w-full">
            <div
              ref={imageContainerRef}
              onScroll={handleScroll}
              className="relative overflow-y-auto rounded-[40px] h-[60vh] md:h-[75vh] lg:h-[79vh] w-full bg-[#D9D9D9] snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
            >
              {PRODUCT_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 snap-center"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <img
                    src={`/${img}`}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              ))}
              <div className="sticky bottom-6 left-6 z-10 bg-white w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-mono font-medium shadow-sm">
                {currentImage + 1}/{PRODUCT_IMAGES.length}
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col font-mono max-w-[400px] w-full lg:ml-8">
            <h1 className="text-[28px] font-medium tracking-wide leading-snug">iwalewa padded jacket</h1>

            {/* Color Selector */}
            <div className="flex flex-col gap-2 pt-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider">color</span>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-[2.5px] transition-all cursor-pointer ${
                      selectedColor === color.name ? "border-white shadow-[0_0_0_1px_black]" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-2 mt-6">
              <span className="text-[12px] font-semibold uppercase tracking-wider">size</span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 rounded-full text-[10px] flex items-center justify-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#EAEAEA] text-black font-semibold"
                        : "bg-[#F7F7F7] text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 w-full py-4 bg-black text-white rounded-full flex justify-between items-center px-8 hover:bg-zinc-800 transition-colors cursor-pointer uppercase tracking-widest text-[11px] font-semibold">
              <span>add to cart</span>
              <span>₦95,000</span>
            </button>

            {/* Tabs */}
            <div className="relative flex gap-x-8 mt-5 border-b border-gray-200 pb-2 w-fit">
              <button
                ref={descRef}
                onClick={() => setActiveTab("description")}
                className={`text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "description" ? "text-black" : "text-gray-400"
                }`}
              >
                description
              </button>
              <button
                ref={delivRef}
                onClick={() => setActiveTab("delivery")}
                className={`text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "delivery" ? "text-black" : "text-gray-400"
                }`}
              >
                delivery and return policy
              </button>

              <div
                className="absolute -bottom-[1px] h-[1.5px] bg-black transition-all duration-300 ease-in-out"
                style={{ left: underline.left, width: underline.width }}
              />
            </div>

            {/* Tab Content */}
            <div className="mt-4 text-[10px] uppercase leading-[1.5] text-gray-800 tracking-wide min-h-[280px]">
              {activeTab === "description" ? (
                <div>
                  <p className="mb-1 font-semibold">Tesmi stamp cargo jacket</p>
                  <div>
                    <p>- Relaxed fit</p>
                    <p>- Balmain stamp logo embroidered on the chest pocket</p>
                    <p>- High collar with matching topstitching</p>
                    <p>- Removable zipped hood</p>
                    <p>- Hidden placket fastening on the front</p>
                    <p>- Nylon zip and 6 vintage metal press studs</p>
                    <p>- Long sleeves</p>
                    <p>- Adjustable cuffs, adjustable press-stud tab</p>
                    <p>- 2 flap pockets on the front, 2 side pockets with zips, cartridge pocket details</p>
                    <p>- Adjustable elasticated waist</p>
                    <p>- Model measures 189cm and wears a size 48</p>
                    <p>- Main material: 68% cotton 32% polyamide</p>
                    <p>- Made in Italy</p>
                    <p>- Item: GHOTI090C658</p>
                  </div>
                  <p className="mt-2 pt-1  text-[9px] uppercase leading-snug">
                    100% of the cotton fibres used to make this garment are certified and organically farmed
                  </p>
                </div>
              ) : (
                <div>
                  <p>- Free standard shipping on all orders over ₦50,000</p>
                  <p>- Express delivery available for Lagos residents</p>
                  <p>- Returns accepted within 14 days of delivery</p>
                  <p>- Items must be unworn and in original packaging</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        <section className="py-16 w-full px-6 md:px-10">
          <h2 className="text-lg lowercase mb-6">complete the look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMPLETE_THE_LOOK.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="flex flex-col gap-2 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[35px] bg-[#D9D9D9] aspect-[3/5]">
                  <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="block md:flex justify-between items-start md:pr-14">
                  <span className="text-xs md:text-[13px] uppercase tracking-widest  line-clamp-1 md:line-clamp-none text-gray-800">{item.name}</span>
                  <span className="text-xs md:[13px] uppercase tracking-widest text-gray-600">{item.price}</span>
                </div>
              </Link>
            ))}

            <div className="flex items-center justify-start pl-2 md:pl-28">
              <button className="px-8 py-3 rounded-full bg-[#F4F4F4] text-[10px] font-medium uppercase tracking-widest text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer">
                load more
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10">
          <NewsletterForm />
        </section>

        <section>
          <InfoGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
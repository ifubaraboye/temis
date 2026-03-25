import { useState } from "react";
import { Link } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InfoGrid } from "@/components/InfoGrid";
import { NewsletterForm } from "@/components/Newsletter";
import { Categories } from "@/components/Categories";

const PRODUCTS = [
  { id: 1, name: "TESMI HANDBAG", price: "₦230,000", images: ["skirt.png", "shirt.png", "trousers.png", "skirt.png"], available: true },
  { id: 2, name: "TESMI CARGO JACKET", price: "₦85,000", images: ["shirt.png", "trousers.png", "skirt.png", "shirt.png"], available: true },
  { id: 3, name: "WOOL BLEND TROUSERS", price: "₦45,000", images: ["trousers.png", "skirt.png", "shirt.png", "trousers.png"], available: true },
  { id: 4, name: "COTTON OVERSIZED SHIRT", price: "₦55,000", images: ["skirt.png", "shirt.png", "trousers.png", "skirt.png"], available: true },
  { id: 5, name: "MIDI WRAP SKIRT", price: "₦38,000", images: ["shirt.png", "trousers.png", "skirt.png", "shirt.png"], available: true },
  { id: 6, name: "LEATHER BELT", price: "₦25,000", images: [], available: false },
  { id: 7, name: "STRUCTURED BLAZER", price: "₦95,000", images: ["trousers.png", "skirt.png", "shirt.png", "trousers.png"], available: true },
  { id: 8, name: "KNIT POLO SHIRT", price: "₦32,000", images: ["skirt.png", "shirt.png", "trousers.png", "skirt.png"], available: true },
  { id: 9, name: "WIDE LEG JEANS", price: "₦52,000", images: ["shirt.png", "trousers.png", "skirt.png", "shirt.png"], available: true },
  { id: 10, name: "SILK BLouse", price: "₦48,000", images: ["trousers.png", "skirt.png", "shirt.png", "trousers.png"], available: true },
  { id: 11, name: "QUILTED VEST", price: "₦65,000", images: ["skirt.png", "shirt.png", "trousers.png", "skirt.png"], available: true },
  { id: 12, name: "CASHMERE SCARF", price: "₦28,000", images: [], available: false },
];

const ProductCard = ({ product }: { product: typeof PRODUCTS[0] }) => {
  const hasImage = product.available && product.images.length > 0;

  const images = product.images;

  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [hovered, setHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (next: number) => {
    if (isAnimating || next === current) return;
    const dir = next > current ? "left" : "right";
    setSlideDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setSlideDir(null);
      setIsAnimating(false);
    }, 300);
  };

  const goPrev = () => {
    goTo((current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    goTo((current + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      goNext();
    } else if (diff < -50) {
      goPrev();
    }
    setTouchStart(null);
  };

  const getTransform = (idx: number) => {
    if (idx === current && slideDir) {
      return slideDir === "left" ? "translateX(100%)" : "translateX(-100%)";
    }
    if (idx === current) return "translateX(0)";
    return "translateX(100%)";
  };

  return (
    <Link to={`/product/${product.id}`} className="flex flex-col gap-2 cursor-pointer">
      <div
        className="relative overflow-hidden rounded-[35px] bg-[#D9D9D9] aspect-[3/5] w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hasImage ? (
          <>
            {images.map((img, idx) => {
              const isCurrent = idx === current;
              const isAnimatingThis = slideDir !== null;
              
              return (
                <img
                  key={idx}
                  src={img}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: getTransform(idx),
                    transition: isCurrent ? "transform 300ms ease-out" : "none",
                    zIndex: isCurrent ? 2 : (isAnimatingThis ? 1 : 0),
                    visibility: (!isCurrent && !isAnimatingThis) ? "hidden" : "visible",
                  }}
                />
              );
            })}

            {/* Mobile image indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Controls: arrows + indicator, inset from right, vertically centered */}
            <div
              className={`absolute right-5 inset-y-0 hidden md:flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
              style={{ width: "34px", zIndex: 2 }}
            >
              {/* Up arrow */}
              <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="p-0.5">
                <svg className="w-[30px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            
              {/* Segment indicator */}
              <div className="flex flex-col items-center gap-[6px] py-6">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className={`rounded-full transition-all duration-300 ${i === current ? "h-8 md:h-[60px]" : "h-6 md:h-[60px]"}`}
                    style={{
                      width: "3px",
                      backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            
              {/* Down arrow */}
              <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="p-0.5">
                <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <img src="/fav.svg" alt="" className="w-20 h-20 opacity-20 absolute inset-0 m-auto" />
        )}
      </div>

      <div className="md:flex justify-between md:pr-14 items-start">
        <span className={`text-xs md:text-[13px] line-clamp-1 md:line-clamp-none uppercase tracking-widest ${hasImage ? "text-gray-800" : "text-gray-400"}`}>
          {product.name}
        </span>
        <span className={`text-xs md:text-[13px] uppercase tracking-widest ${hasImage ? "text-gray-600" : "text-gray-400"}`}>
          {product.price}
        </span>
      </div>
    </Link>
  );
};

export function MenPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        {/* Header Section */}
        <section className="pt pb-4 px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="max-w-md">
              <h1 className="text-md font-medium font-dresden lowercase leading-tight">men</h1>
              <p className="text-[9px] uppercase font-medium font-dresden tracking-widest leading-tight text-gray-400">
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem
                ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled.
              </p>
            </div>
            <div className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-full w-36 focus-within:border-black transition-colors bg-white">
              <input
                type="text"
                placeholder="SEARCH"
                className="text-[10px] text-gray-400 placeholder:text-gray-400 bg-transparent focus:outline-none w-full tracking-widest"
              />
              <button className="flex-shrink-0 ml-2">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-4 md:px-8 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More / View All */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button className="px-8 py-3 rounded-full bg-[#E8E8E8] text-[10px] uppercase tracking-widest text-gray-700 hover:bg-gray-300 transition-colors">
              load more
            </button>
            <a href="#" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              view all
            </a>
          </div>
        </section>

        <section className="py-2">
          <Categories />
        </section>

        <section className="px-4 md:px-9">
          <NewsletterForm />
        </section>

        <section className="">
          <InfoGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Title: Tésmi Fashion Homepage - Split Panoramic Hero
 * filepath: App.jsx
 */

import { useState} from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

// --- Mock Data & Assets ---

const IMAGES = {
  // A wide panoramic fashion editorial — split across 4 panels
  heroPanorama: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=3000&auto=format&fit=crop",

  category1: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=1000&auto=format&fit=crop",
  category2: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop",
  category3: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&auto=format&fit=crop",

  collection1: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=2000&auto=format&fit=crop",
  collection2: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop",
};

// --- Components ---

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden md:block w-1/4">
          <p className="text-[10px] uppercase tracking-widest leading-tight text-[#3F3F3F]">
            Essential silhouettes, natural textures, and effortless layering for every season.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl font-serif tracking-tighter text-black" style={{ fontFamily: "'Times New Roman', serif" }}>
            Tésmi
          </h1>
        </div>

        <div className="w-1/4 flex justify-end">
          <div className="flex flex-col items-center gap-0.5">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-gray-100 rounded-full">
              {mobileMenuOpen ? <X size={24} /> : <Menu  width={35} />}
            </button>
            <span className="text-[10px] font-medium tracking-wide">for africa</span>
          </div>
        </div>
      </div>

      {/* Full-screen nav overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          pointerEvents: mobileMenuOpen ? 'all' : 'none',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'opacity 0.35s ease',
          background: 'rgba(80,100,120,0.45)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: '2.5rem',
          gap: '0.1rem',
        }}
      >
        {['new collection', 'for men', 'for women', 'trousers', 'skirts', 'shorts'].map((item, i) => (
          <a
            key={item}
            href="#"
            onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(false); }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 'clamp(1.5rem, 5vw, 2.4rem)',
              fontWeight: 400,
              color: 'white',
              textAlign: 'right',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              lineHeight: 1.55,
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(40px)',
              opacity: mobileMenuOpen ? 1 : 0,
              transition: `transform 0.4s ease ${i * 0.06}s, opacity 0.4s ease ${i * 0.06}s`,
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </header>
  );
};

// Individual hero panel — shows 1/N slice of the panorama using background-image
interface HeroPanelProps {
  index: number;
  totalPanels: number;
  image: string;
}

const HeroPanel = ({ index, totalPanels, image }: HeroPanelProps) => {
  const [hovered, setHovered] = useState(false);

  // background-size: N*100% makes the image span N panel-widths total.
  // background-position: index/(N-1)*100% picks the correct horizontal slice.
  const bgPos = `${(index / (totalPanels - 1)) * 100}% center`;

  return (
    <div
      className="relative overflow-hidden flex-1"
      style={{
        borderRadius: '28px 28px 0 0',
        height: '85vh',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background layer handles zoom via background-size change */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: `${totalPanels * (hovered ? 106 : 100)}% auto`,
          backgroundPosition: bgPos,
          backgroundRepeat: 'no-repeat',
          transition: 'background-size 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      {/* Subtle dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.18) 100%)',
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const Hero = () => {
  const PANEL_COUNT = 4;

  return (
    <section className="px-4 md:px-8">
      <div className="container mx-auto">
        {/* 4-panel split panorama — no bottom radius */}
        <div className="flex gap-3 md:gap-4">
          {Array.from({ length: PANEL_COUNT }).map((_, idx) => (
            <HeroPanel
              key={idx}
              index={idx}
              totalPanels={PANEL_COUNT}
              image={IMAGES.heroPanorama}
            />
          ))}
        </div>

        {/* Sub-hero Text Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-6 px-2 gap-4">
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-xl">Life of the highlanders</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Harmattan SS26</span>
          </div>
          <a href="#" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-60">
            Check out collection &gt;
          </a>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard = ({ title, image }: CategoryCardProps) => {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-6 px-1">
        <span className="text-sm font-medium tracking-wide lowercase">{title}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
          Shop now &gt;
        </span>
      </div>
    </div>
  );
};

const Categories = () => (
  <section className="py-12 px-4 md:px-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <CategoryCard title="trousers" image={IMAGES.category1} />
        <CategoryCard title="skirts"   image={IMAGES.category2} />
        <CategoryCard title="shirts"   image={IMAGES.category3} />
      </div>
    </div>
  </section>
);

interface FeatureRowProps {
  reversed?: boolean;
  image: string;
  title: string;
  subtitle: string;
}

const FeatureRow = ({ reversed = false, image, title, subtitle }: FeatureRowProps) => (
  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center py-3`}>
    <div className="w-full md: relative group overflow-hidden rounded-2xl">
      <img src={image} alt={title} className="w-full h-[400px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left px-4">
      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">{subtitle}</p>
      <h3 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">{title}</h3>
      <a href="#" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-60">
        Check out collection &gt;
      </a>
    </div>
  </div>
);

const Collections = () => (
  <section className="py-12 px-4 md:px-8 bg-white">
    <div className="container mx-auto">
      {/* Section header */}
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium lowercase">collections</span>
        <a href="#" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors">See all &gt;</a>
      </div>
      <FeatureRow reversed={false} image={IMAGES.collection1} subtitle="Harmattan SS26" title="fits of the highlanders" />
      <FeatureRow reversed image={IMAGES.collection2} subtitle="Heat SS26" title="highlife" />
    </div>
  </section>
);

const InfoGrid = () => (
  <section className="py-20 px-4 md:px-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['stores', 'get in touch', 'faq'].map((item) => (
          <div key={item} className="bg-[#D9D9D9] rounded-t-4xl p-8 h-64 flex flex-col justify-between group cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="text-lg font-medium lowercase">{item}</span>
            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-4 md:px-8 border-t border-gray-100">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-500">
        <a href="#" className="hover:text-black">Contact Us</a>
        <span>/</span>
        <a href="#" className="hover:text-black">Privacy Policy</a>
        <span>/</span>
        <a href="#" className="hover:text-black">Company</a>
        <span>/</span>
        <a href="#" className="hover:text-black">Team</a>
      </div>
      <div className="text-center md:text-right">
        <h2 className="text-2xl font-serif mb-2">Tésmi</h2>
        <p className="text-[10px] text-gray-400">© 2026. Tesmi Africa. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Collections />
        <InfoGrid />
      </main>
      <Footer />
    </div>
  );
}
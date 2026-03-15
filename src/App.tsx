'use client';

import { useState} from 'react';
import { ArrowRight } from 'lucide-react';

const IMAGES = {
  heroPanorama: "lisa.png",

  category1: "trousers.png",
  category2: "skirt.png",
  category3: "shirt.png",

  collection1: "shirtcloseup.png",
  collection2: "shirtcloseup.png",
};

const AnnouncementBar = () => (
  <div className="w-full bg-[#D9D9D9] py-1 px-6 text-center border-b ">
    <p className="text-xs uppercase tracking-widest text-[#3F3F3F]">
      Essential silhouettes, natural textures, and effortless layering for every season.
    </p>
  </div>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <header className="relative z-50 bg-white py-6 px-6">
        <div className="w-full flex justify-between items-center">
          <div className="hidden md:block w-1/4">
            <p className="text-[10px] uppercase tracking-widest leading-tight text-[#3F3F3F]">
              Essential silhouettes, natural textures, and <br className='hidden 2xl:inline-block' /> effortless layering for every season.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <img src="/logo.svg" alt="Tésmi" className="h-12" />
          </div>

          <div className="w-1/4 flex justify-end">
            <div className="flex flex-col items-center gap-0.5">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 cursor-pointer rounded-full">
                <img src="/burger.svg" alt="Menu" className="w-18 h-auto" />
              </button>
              <span className="text-sm font-medium tracking-wide">for africa</span>
            </div>
          </div>
        </div>

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
    </>
  );
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const panels = [
    { bgPos: '0% 50%' },
    { bgPos: '33.33% 50%' },
    { bgPos: '66.66% 50%' },
    { bgPos: '100% 50%' },
  ];

  return (
    <section className="pb-12 px-4">
      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {panels.map((panel, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl aspect-[9/16] cursor-pointer"
            >
              <img
                src={IMAGES.heroPanorama}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  objectPosition: panel.bgPos,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-6 px-2 gap-4">
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-xl">Life of the highlanders</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Harmattan SS26</span>
          </div>
          <a href="#" className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-60">
            Check out collection &gt;
          </a>
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
        <span className="text-lg font-medium tracking-wide lowercase">{title}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
          Shop now &gt;
        </span>
      </div>
    </div>
  );
};

const Categories = () => (
  <section className="py-12 px-4 md:px-8">
    <div className="w-full">
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
    <div className="w-full md:w-2/3 relative group overflow-hidden rounded-2xl">
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
    <div className="w-full">
      <div className="flex items-center gap-6">
        <span className="text-lg font-medium lowercase">collections</span>
        <a href="#" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors">See all &gt;</a>
      </div>
      <FeatureRow reversed={false} image={IMAGES.collection1} subtitle="Harmattan SS26" title="fits of the highlanders" />
      <FeatureRow reversed image={IMAGES.collection2} subtitle="Heat SS26" title="highlife" />
    </div>
  </section>
);

const InfoGrid = () => (
  <section className="py-20 px-4 md:px-8">
    <div className="w-full">
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
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
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
        <img src="/logo.svg" alt="Tésmi" className="h-10 mb-2 mx-auto md:mx-0" />
        <p className="text-[10px] text-gray-400">© 2026. Tesmi Africa. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default function Home() {
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
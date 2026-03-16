'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const IMAGES = {
  heroPanorama: "lisa.png",

  category1: "trousers.png",
  category2: "skirt.png",
  category3: "shirt.png",

  collection1: "shirtcloseup.png",
  collection2: "shirtcloseup.png",
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const panels = isMobile
    ? [
        { bgPos: '0% 50%', className: "h-[57vh]" },
        { bgPos: '33.33% 50%', className: "h-[57vh]" },
        { bgPos: '66.66% 50%', className: "h-[57vh]" },
        { bgPos: '100% 50%', className: "h-[57vh]" },
      ]
    : [
        { bgPos: '0% 50%', className: "h-[80vh] md:aspect-auto" },
        { bgPos: '44.44% 50%', className: "h-[80vh]" },
        { bgPos: '72.22% 50%', className: "h-[80vh]" },
        { bgPos: '100% 50%', className: "h-[80vh]" },
      ];

  return (
    <section className="pb-12 px-4">
      <div 
        className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-3 md:gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {panels.map((panel, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-[50px] group ${panel.className || ''}`}
            >
              <div 
                className="w-full h-full transition-transform duration-500"
                style={{
                  backgroundImage: `url(${IMAGES.heroPanorama})`,
                  backgroundSize: isMobile ? '400% auto' : (idx === 0 ? '287.5% auto' : '460% auto'),
                  backgroundPosition: panel.bgPos,
                  backgroundRepeat: 'no-repeat',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </div>
          ))}
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
      <div className="relative overflow-hidden rounded-[50px] aspect-[3/4] w-full">
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div className="flex items-center gap-4">
          <span className="font-serif italic text-xl">Life of the highlanders</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Harmattan SS26</span>
          <a href="#" className="text-[10px] uppercase tracking-widest border-black pb-1 hover:opacity-60">
            Check out collection &gt;
          </a>
        </div>
      </div>
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
    <div className="w-full md:w-2/3 relative group overflow-hidden rounded-[50px]">
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
        <Link to="/stores" className="bg-[#D9D9D9] rounded-t-[50px] p-8 h-64 flex flex-col justify-between group cursor-pointer hover:bg-gray-200 transition-colors">
          <span className="text-lg font-medium lowercase">stores</span>
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight size={14} />
          </div>
        </Link>
        {['get in touch', 'faq'].map((item) => (
          <div key={item} className="bg-[#D9D9D9] rounded-t-[50px] p-8 h-64 flex flex-col justify-between group cursor-pointer hover:bg-gray-200 transition-colors">
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selectionDresden Elektronik:bg-black selection:text-white">
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
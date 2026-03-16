'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => (
  <div className="w-full bg-[#D9D9D9] pt-[1px] px-6 text-center border-b border-black ">
    <p className="text-xs font-faktum uppercase tracking-widest text-[#3F3F3F]">
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
            <p className="text-[10px] uppercase font-medium tracking-widest leading-tight text-[#3F3F3F]">
              Essential silhouettes, natural textures, and <br className='hidden 2xl:inline-block' /> effortless layering for every season.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <Link to="/">
              <img src="/logo.svg" alt="Tésmi" className="h-12" />
            </Link>
          </div>

          <div className="w-1/4 flex justify-end">
            <div className="flex flex-col items-center gap-0.5">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 cursor-pointer rounded-full">
                <img src="/burger.svg" alt="Menu" className="w-18 md:w-18 2xl:w-24 h-auto" />
              </button>
              <span className="text-sm md:text-sm 2xl:text-xl font-medium tracking-wide">for africa</span>
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
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
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
                fontSize: 'clamp(1.5rem, 5vw, 1.7rem)',
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

export { Header };
'use client';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AnnouncementBar = () => (
  <div className="w-full bg-[#D9D9D9] pt-[1px] px-6 text-center border-b border-black ">
    <p className="text-xs font-faktum uppercase tracking-widest text-[#3F3F3F]">
      Essential silhouettes, natural textures, and effortless layering for every season.
    </p>
  </div>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <>
      {/*<AnnouncementBar />*/}
      <header className="relative z-50 bg-white py-4 md:py-6 px-4 md:px-6">
        <div className="w-full flex justify-between items-center">
          <div className="hidden md:block w-1/4">
            {isHome ? (
              <div className="flex flex-col">
                <span className="text-md font-medium font-dresden lowercase leading-tight">for africa</span>
                <p className="text-[9px] uppercase font-medium font-dresden tracking-widest leading-tight text-gray-400">
                  ESSENTIAL SILHOUETTES, NATURAL TEXTURES, AND EFFORTLESS
                </p>
              </div>
            ) : (
              <button onClick={() => navigate(-1)} className="flex items-center hover:opacity-60 transition-opacity">
                <img src="/back.svg" alt="Back" className="w-10 h-10 cursor-pointer" />
              </button>
            )}
          </div>

          <div className="flex-1 flex justify-start md:justify-center">
            <Link to="/">
              <img src="/logo.svg" alt="Tésmi" className="h-10 md:h-12 cursor-pointer" />
            </Link>
          </div>

          <div className="w-auto md:w-1/4 flex justify-end">
            <div className="flex flex-col items-center gap-0.5">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 cursor-pointer rounded-full">
                <img src="/burger.svg" alt="Menu" className="w-12 md:w-18 2xl:w-18 h-auto" />
              </button>
              {/*<span className="text-xs md:text-sm  font-medium tracking-wide">for africa</span>*/}
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
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: '2.5rem',
            gap: '0.1rem',
          }}
        >
          {[
            { label: 'new collection', href: '#' },
            { label: 'for men', href: '/men' },
            { label: 'for women', href: '#' },
            { label: 'trousers', href: '#' },
            { label: 'skirts', href: '#' },
            { label: 'shorts', href: '#' },
          ].map((item, i) => (
            <Link
              key={item.label}
              to={item.href}
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
              {item.label}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
};

export { Header };
const Footer = () => (
  <footer className="py-12 px-4 md:px-8 ">
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex flex-col gap-6">
        {/* Social Media Icons */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:opacity-60 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="hover:opacity-60 transition-opacity">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>
        {/* Links */}
        <div className="flex text-[#3F3F3F] font-semibold gap-4 text-[10px] uppercase tracking-wider">
          <a href="#" className="hover:text-black">CONTACT US</a>
          <span>/</span>
          <a href="#" className="hover:text-black">PRIVACY POLICY</a>
          <span>/</span>
          <a href="#" className="hover:text-black">COMPANY</a>
          <span>/</span>
          <a href="#" className="hover:text-black">TEAM</a>
        </div>
      </div>
      <div className="hidden md:flex flex-1 pr-48 justify-center">
        <img src="/fav.svg" alt="" className="h-8 scale-160" />
      </div>
      <div className="text-center md:text-right">
        <img src="/logo.svg" alt="Tésmi" className="h-10 mb-2 mx-auto md:mx-0 mb-5" />
        <p className="text-[10px] font-faktum text-gray-400">© 2026. Tesmi Africa. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export { Footer };
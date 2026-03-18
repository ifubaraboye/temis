const Footer = () => (
  <footer className="py-12 px-4 md:px-8 ">
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex text-[#3F3F3F] font-semibold gap-6 text-[10px] uppercase">
        <a href="#" className="hover:text-black">Contact Us</a>
        <span>/</span>
        <a href="#" className="hover:text-black">Privacy Policy</a>
        <span>/</span>
        <a href="#" className="hover:text-black">Company</a>
        <span>/</span>
        <a href="#" className="hover:text-black">Team</a>
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
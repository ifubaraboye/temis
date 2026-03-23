export function NewsletterForm() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <span className="text-sm md:text-base text-gray-800 lowercase whitespace-nowrap">get news & update from tesmi</span>
      <div className="flex items-center gap-4 flex-1 w-full">
        <input
          type="text"
          placeholder="NAME"
          className="flex-[1] min-w-0 px-8 py-4 rounded-full border border-gray-300 bg-[#F5F5F5] text-sm placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase focus:outline-none focus:border-black transition-colors"
        />
        <input
          type="email"
          placeholder="EMAIL"
          className="flex-[2] min-w-0 px-8 py-4 rounded-full border border-gray-300 bg-[#F5F5F5] text-sm placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase focus:outline-none focus:border-black transition-colors"
        />
        <button className="px-12 py-4 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
          subscribe
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <>
      {/* Global Header */}
      <header className="sticky top-0 z-40 bg-fog border-b border-mist">
        <div className="w-full px-6 lg:px-8 h-20 flex items-center gap-5">

          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-ink flex items-center justify-center text-paper font-bold text-xl select-none">
              GS
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-ink tracking-tight whitespace-nowrap">
                  GEOSYNC
                </span>
              </div>

              <span className="text-[11px] font-bold tracking-eyebrow text-deep-teal uppercase -mt-0.5 whitespace-nowrap">
               Landslide pridictor
              </span>
            </div>
          </div>

          {/* Location Search */}
          <div className="hidden md:flex flex-1 min-w-0 max-w-none items-center relative">
            <span className="material-symbols-outlined absolute left-3.5 text-deep-teal text-[20px]">
              search
            </span>

            <input
              className="w-full h-11 pl-11 pr-14 bg-paper rounded-lg border border-mist text-xs text-ink placeholder:text-deep-teal/60 focus:outline-none focus:border-ink transition-colors"
              placeholder="Search state, district, or city in India..."
              type="text"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden xl:flex items-center gap-0 text-sm font-bold text-deep-teal tracking-tight shrink-0">

            <a
              className="px-1.5 py-2.5 whitespace-nowrap hover:text-ink hover:underline underline-offset-4 transition-colors"
              href="#section-risk-map"
            >
              Risk Map
            </a>

            <a
              className="px-1.5 py-2.5 whitespace-nowrap hover:text-ink hover:underline underline-offset-4 transition-colors"
              href="#section-analytics"
            >
              7-Day Forecast
            </a>

            <a
              className="px-1.5 py-2.5 whitespace-nowrap hover:text-ink hover:underline underline-offset-4 transition-colors"
              href="#section-simulator"
            >
              3D Simulator
            </a>

            <a
              className="px-1.5 py-2.5 whitespace-nowrap hover:text-ink hover:underline underline-offset-4 transition-colors"
              href="#section-bulletins"
            >
              Disaster Intel
            </a>

            <a
              className="px-1.5 py-2.5 whitespace-nowrap hover:text-ink hover:underline underline-offset-4 transition-colors"
              href="#section-ai-guidance"
            >
              AI Guidance
            </a>

          </nav>

          {/* Emergency CTA */}
          <div className="flex items-center shrink-0">
            <a
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper font-semibold text-xs tracking-wide hover:bg-deep-teal transition-all whitespace-nowrap"
              href="#section-risk-map"
            >
              <span className="material-symbols-outlined text-[16px] text-terracotta">
                crisis_alert
              </span>

              <span>Emergency Mode</span>
            </a>
          </div>

        </div>
      </header>
    </>
  );
}

export default Navbar;
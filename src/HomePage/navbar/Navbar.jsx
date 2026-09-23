function Navbar() {
  return (
    <>
      {/* Glassmorphism Header */}
      <header className="sticky top-0 z-40 bg-fog/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="w-full px-6 lg:px-8 h-20 flex items-center">

          {/* ================= BRAND ================= */}
          <div className="flex items-center gap-3 shrink-0">

            <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center text-paper font-bold text-xl select-none shadow-sm">
              GS
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-lg text-ink tracking-tight whitespace-nowrap">
                GEOSYNC
              </span>

              <span className="text-[11px] font-bold tracking-eyebrow text-deep-teal uppercase -mt-0.5 whitespace-nowrap">
                Landslide Predictor
              </span>
            </div>

          </div>


          {/* ================= CENTER NAVIGATION ================= */}
          <div className="hidden xl:flex flex-1 items-center justify-center">

            {/* Rounded Glass Navigation Bar */}
            <nav
              className="
                flex items-center gap-1
                px-2 py-2
                rounded-full
                bg-white/90
                backdrop-blur-md
                border border-white
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              "
            >

              <a
                className="
                  px-4 py-2.5
                  rounded-full
                  text-sm font-bold
                  text-deep-teal
                  whitespace-nowrap
                  transition-all duration-200
                  hover:bg-white/60
                  hover:text-ink
                "
                href="#section-risk-map"
              >
                Risk Map
              </a>

              <a
                className="
                  px-4 py-2.5
                  rounded-full
                  text-sm font-bold
                  text-deep-teal
                  whitespace-nowrap
                  transition-all duration-200
                  hover:bg-white/60
                  hover:text-ink
                "
                href="#section-analytics"
              >
                7-Day Forecast
              </a>

              <a
                className="
                  px-4 py-2.5
                  rounded-full
                  text-sm font-bold
                  text-deep-teal
                  whitespace-nowrap
                  transition-all duration-200
                  hover:bg-white/60
                  hover:text-ink
                "
                href="#section-simulator"
              >
                3D Simulator
              </a>

              <a
                className="
                  px-4 py-2.5
                  rounded-full
                  text-sm font-bold
                  text-deep-teal
                  whitespace-nowrap
                  transition-all duration-200
                  hover:bg-white/60
                  hover:text-ink
                "
                href="#section-bulletins"
              >
                Disaster Intel
              </a>

              <a
                className="
                  px-4 py-2.5
                  rounded-full
                  text-sm font-bold
                  text-deep-teal
                  whitespace-nowrap
                  transition-all duration-200
                  hover:bg-white/60
                  hover:text-ink
                "
                href="#section-ai-guidance"
              >
                AI Guidance
              </a>

            </nav>

          </div>


          {/* ================= EMERGENCY MODE ================= */}
          <div className="shrink-0">

            <a
              className="
                inline-flex items-center gap-2
                px-5 py-2.5
                rounded-full
                bg-ink
                text-paper
                font-semibold
                text-xs
                tracking-wide
                shadow-md
                transition-all duration-200
                hover:bg-deep-teal
                hover:shadow-lg
                hover:-translate-y-0.5
                whitespace-nowrap
              "
              href="#section-risk-map"
            >

              <span className="material-symbols-outlined text-[16px] text-terracotta">
                crisis_alert
              </span>

              <span>
                Emergency Mode
              </span>

            </a>

          </div>

        </div>
      </header>
    </>
  );
}

export default Navbar;

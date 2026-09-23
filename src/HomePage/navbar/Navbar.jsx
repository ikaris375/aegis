import { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Array to map navigation links cleanly for both Desktop and Mobile views
  const navLinks = [
    { name: "Route Map", href: "#section-risk-map" },
    { name: "Weekly Forecast", href: "#section-analytics" },
    { name: "Disaster Updates", href: "#section-bulletins" },
    { name: "AI Analyse & Guidance", href: "#section-ai-guidance" },
  ];

  return (
    <>
      {/* Glassmorphism Header */}
      <header className="sticky top-0 z-40 bg-fog/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
        {/* Added justify-between to keep Logo on the left and actions on the right */}
        <div className="w-full px-4 lg:px-8 h-20 flex items-center justify-between gap-4">

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

          {/* ================= CENTER NAVIGATION (DESKTOP) ================= */}
          <div className="hidden xl:flex flex-1 items-center justify-center">
            {/* Rounded Glass Navigation Bar */}
            <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2.5 rounded-full text-sm font-bold text-deep-teal whitespace-nowrap transition-all duration-200 hover:bg-white/60 hover:text-ink"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* ================= RIGHT SIDE ACTIONS ================= */}
          <div className="flex items-center gap-3 shrink-0">
            {/* EMERGENCY MODE BUTTON */}
            <a
              href="#section-risk-map"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-ink text-paper font-semibold text-[11px] sm:text-xs tracking-wide shadow-md transition-all duration-200 hover:bg-deep-teal hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px] text-terracotta">
                crisis_alert
              </span>
              {/* Hide text on very small screens to prevent overflow, keep icon */}
              <span className="hidden sm:block">Emergency Mode</span>
              <span className="block sm:hidden">SOS</span>
            </a>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-ink hover:bg-white/80 transition-colors"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* ================= MOBILE NAVIGATION DROPDOWN ================= */}
        {/* Rendered only on screens smaller than xl when state is true */}
        <div 
          className={`xl:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                className="block px-4 py-3 rounded-xl text-base font-bold text-deep-teal hover:bg-gray-100 hover:text-ink transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;

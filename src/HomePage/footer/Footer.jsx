function Footer() {
  return (
    <footer className="w-full bg-fog border-t border-mist pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-mist">
          {/* Column 1 */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-ink text-paper font-bold flex items-center justify-center text-sm">
                GS
              </div>
              <span className="font-bold text-ink text-base tracking-tight">
                GEOSYNC
              </span>
            </div>
            <p className="text-xs text-graphite leading-relaxed">
              Sayandip Roy
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-deep-teal">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>14,892 SENSORS ACTIVE</span>
            </div>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="text-[11px] font-bold tracking-eyebrow uppercase text-ink mb-3.5">
              Tactical Platforms
            </h4>
            <ul className="space-y-2 text-xs text-graphite font-medium">
              <li>
                <a
                  className="hover:text-ink transition-colors"
                  href="#section-risk-map"
                >
                  Geospatial Heat Index
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink transition-colors"
                  href="#section-risk-map"
                >
                  River Basin Hydrology
                </a>
              </li>

              <li>
                <a
                  className="hover:text-ink transition-colors"
                  href="#section-analytics"
                >
                  Cyclone Trajectory ML
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink transition-colors"
                  href="#section-simulator"
                >
                  Urban Inundation Simulator
                </a>
              </li>

            </ul>

          </div>
          {/* Column 3 */}
          <div>
            <h4 className="text-[11px] font-bold tracking-eyebrow uppercase text-ink mb-3.5">
              Institutional Feeds
            </h4>
            <ul className="space-y-2 text-xs text-graphite font-medium">
              <li>
                <span className="hover:text-ink cursor-default">
                  IMD Doppler Radars
                </span>
              </li>
              <li>
                <span className="hover:text-ink cursor-default">
                  CWC Gauge Network
                </span>
              </li>

              <li>
                <span className="hover:text-ink cursor-default">
                  ISRO Bhuvan Geo-Portal
                </span>
              </li>

              <li>
                <span className="hover:text-ink cursor-default">
                  INCOIS Ocean Buoys
                </span>
              </li>

            </ul>

          </div>


          {/* Column 4 */}

          <div>

            <h4 className="text-[11px] font-bold tracking-eyebrow uppercase text-ink mb-3.5">
              Statutory Support
            </h4>

            <ul className="space-y-2 text-xs text-graphite font-medium">

              <li>
                <span className="hover:text-ink cursor-default">
                  SDRF Direct Dispatch
                </span>
              </li>

              <li>
                <span className="hover:text-ink cursor-default">
                  National Incident Command
                </span>
              </li>

              <li>
                <span className="hover:text-ink cursor-default">
                  CAP Common Alerting Protocol
                </span>
              </li>
              <li>
                <span className="hover:text-ink cursor-default">
                  Public Broadcast Matrix
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
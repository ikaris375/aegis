import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../services/mapService";
import heroBackground from "../../assets/images/background_image.png";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Home() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchSuggestionsRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [simulationState, setSimulationState] = useState("idle");

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      try {
        const { Map, AdvancedMarkerElement } = await loadGoogleMaps();

        if (cancelled || !mapRef.current) return;

        const defaultCenter = { lat: 22.5726, lng: 88.3639 };

        const map = new Map(mapRef.current, {
          center: defaultCenter,
          zoom: 12,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapId: "DEMO_MAP_ID",
        });

        mapInstanceRef.current = map;
        markerRef.current = new AdvancedMarkerElement({
          map,
          position: defaultCenter,
          title: "Selected location",
        });
        setMapReady(true);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              if (cancelled || !mapInstanceRef.current || !markerRef.current) return;

              const position = { lat: coords.latitude, lng: coords.longitude };
              mapInstanceRef.current.setCenter(position);
              mapInstanceRef.current.setZoom(15);
              markerRef.current.position = position;
            },
            () => {
              // Keep Kolkata as the fallback when location permission is denied.
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
          );
        }
      } catch (error) {
        console.error("Google Maps failed to load:", error);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !searchInputRef.current) return;

    let active = true;
    let debounceTimer;

    const handleInput = (event) => {
      const value = event.target.value.trim();
      clearTimeout(debounceTimer);

      if (!value) {
        setSearchSuggestions([]);
        return;
      }

      debounceTimer = setTimeout(async () => {
        try {
          const { AutocompleteSuggestion } = await google.maps.importLibrary("places");
          const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: value,
            includedRegionCodes: ["in"],
            language: "en",
            region: "in",
          });

          if (active) setSearchSuggestions(suggestions.slice(0, 5));
        } catch (error) {
          console.error("Place search failed:", error);
          if (active) setSearchSuggestions([]);
        }
      }, 250);
    };

    const input = searchInputRef.current;
    input.addEventListener("input", handleInput);

    return () => {
      active = false;
      clearTimeout(debounceTimer);
      input.removeEventListener("input", handleInput);
    };
  }, [mapReady]);

  const selectLocation = async (suggestion) => {
    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["displayName", "formattedAddress", "location"] });

      if (!place.location || !mapInstanceRef.current || !markerRef.current) return;

      const position = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };

      mapInstanceRef.current.panTo(position);
      mapInstanceRef.current.setZoom(15);
      markerRef.current.position = position;

      if (searchInputRef.current) {
        searchInputRef.current.value = place.formattedAddress || place.displayName || "";
      }

      setSearchSuggestions([]);
    } catch (error) {
      console.error("Location selection failed:", error);
    }
  };

  const runSimulation = () => {
    setSimulationState("computing");

    setTimeout(() => {
      setSimulationState("synced");

      setTimeout(() => {
        setSimulationState("idle");
      }, 2000);
    }, 800);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">

        {/* ============================================================= */}
        {/* HERO SECTION */}
        {/* ============================================================= */}

        <section
        className="relative w-full overflow-hidden py-20"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-fog pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-[60px] text-ink tracking-[-0.03em] leading-[1.08] max-w-4xl text-balance mb-6">
              Understand Risk.
              <br />
              <span className="text-deep-teal">
                Prepare Before It Happens.
              </span>
            </h1>

            <p className="text-base sm:text-[18px] text-deep-teal leading-[1.5] max-w-[680px] mb-8">
              Sovereign AI-driven environmental telemetry across 28 States and
              8 Union Territories. Predict multi-hazard trajectories, simulate
              worst-case terrain inundation, and dispatch verified incident
              advisories.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">

              <a
                className="px-7 py-3 rounded-lg bg-ink text-paper font-bold text-xs hover:bg-deep-teal transition-all inline-flex items-center gap-2"
                href="#section-risk-map"
              >
                <span className="material-symbols-outlined text-[18px]">
                  explore
                </span>

                <span>Explore Risk Map</span>
              </a>

              <a
                className="px-7 py-3 rounded-lg bg-paper text-ink border border-mist font-bold text-xs hover:bg-fog transition-all inline-flex items-center gap-2"
                href="#section-ai-guidance"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chat_bubble
                </span>

                <span>Ask AI Assistant</span>
              </a>

            </div>

            <div className="w-full max-w-4xl bg-paper rounded-[24px] border border-mist p-6 md:p-9 flex flex-wrap items-center justify-around gap-6 text-left">

              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-[24px] text-terracotta shrink-0">
                  cloud
                </span>

                <div>
                  <div className="font-bold text-2xl text-ink leading-none">
                    2,840+
                  </div>

                  <div className="text-[11px] font-bold tracking-eyebrow uppercase text-graphite mt-1.5">
                    Weather Stations
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-mist hidden sm:block"></div>

              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-[24px] text-sky shrink-0">
                  radar
                </span>

                <div>
                  <div className="font-bold text-2xl text-ink leading-none">
                    74 Doppler Radars
                  </div>

                  <div className="text-[11px] font-bold tracking-eyebrow uppercase text-graphite mt-1.5">
                    Operational Array
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-mist hidden sm:block"></div>

              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-[24px] text-terracotta shrink-0">
                  sync
                </span>

                <div>
                  <div className="font-bold text-2xl text-ink leading-none">
                    Live Sync
                  </div>

                  <div className="text-[11px] font-bold tracking-eyebrow uppercase text-graphite mt-1.5">
                    IMD • CWC • INCOIS • ISRO
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ============================================================= */}
        {/* INTERACTIVE INDIA RISK MAP */}
        {/* ============================================================= */}

        <section
          className="max-w-7xl mx-auto px-4 md:px-8 py-20"
          id="section-risk-map"
        >

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">

            <div>
              <h2 className="font-bold text-3xl md:text-[36px] text-ink tracking-[-0.02em] leading-tight">
                Multi-Hazard Geospatial Intelligence
              </h2>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* MAP */}

            <div className="lg:col-span-7 h-full bg-paper rounded-[24px] border border-mist p-6 md:p-9 flex flex-col gap-5">

              {/* Map Header */}
              <h3 className="font-bold text-lg md:text-xl text-ink tracking-tight">
                Search your location for upcoming weather and disaster risks.
              </h3>

              {/* Location Search */}
              <div className="w-full pb-5 border-b border-mist">
                <div className="relative w-full">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-deep-teal text-[20px]">
                    search
                  </span>

                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search state, district or city in India..."
                    className="w-full h-11 pl-11 pr-4 bg-fog rounded-lg border border-mist text-xs text-ink placeholder:text-deep-teal/60 focus:outline-none focus:border-ink transition-colors"
                    autoComplete="off"
                  />

                  {searchSuggestions.length > 0 && (
                    <div
                      ref={searchSuggestionsRef}
                      className="absolute left-0 right-0 top-12 z-30 bg-paper border border-mist rounded-lg shadow-lg overflow-hidden"
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={`${suggestion.placePrediction.placeId}-${index}`}
                          type="button"
                          onClick={() => selectLocation(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-fog border-b border-mist last:border-b-0"
                        >
                          <span className="block text-xs font-bold text-ink">
                            {suggestion.placePrediction.mainText?.text || suggestion.placePrediction.text?.text}
                          </span>
                          <span className="block text-[10px] text-graphite mt-0.5">
                            {suggestion.placePrediction.secondaryText?.text || "India"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="relative w-full h-[500px] bg-fog rounded-[16px] overflow-hidden border border-mist">

                {/* Real Google Map */}
                <div ref={mapRef} className="w-full h-full" aria-label="Google map" />

                {/* Custom Zoom Controls */}
                <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => mapInstanceRef.current?.setZoom((mapInstanceRef.current.getZoom() || 12) + 1)}
                    className="w-10 h-10 rounded-lg bg-paper text-ink flex items-center justify-center hover:bg-mist border border-mist shadow-sm"
                    aria-label="Zoom in"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => mapInstanceRef.current?.setZoom((mapInstanceRef.current.getZoom() || 12) - 1)}
                    className="w-10 h-10 rounded-lg bg-paper text-ink flex items-center justify-center hover:bg-mist border border-mist shadow-sm"
                    aria-label="Zoom out"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                </div>

              </div>

            </div>


            {/* LOCATION INTELLIGENCE */}

            <div className="lg:col-span-5 h-full bg-paper rounded-[24px] border border-mist p-6 md:p-9 flex flex-col justify-between gap-6">

              <div className="space-y-6">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <h3 className="font-bold text-2xl text-ink tracking-tight">
                      Kolkata, West Bengal
                    </h3>

                    <p className="text-xs font-mono text-graphite mt-0.5">
                      22.5726° N, 88.3639° E
                    </p>
                  </div>

                  <span className="font-bold text-3xl text-ink shrink-0">
                    31°C
                  </span>

                </div>


                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-fog p-3 rounded-[16px] border border-mist">

                  <div className="p-1">
                    <span className="text-[10px] font-bold uppercase tracking-eyebrow text-graphite block">
                      Air Quality
                    </span>

                    <span className="font-bold text-sm text-ink">
                      126 AQI
                    </span>

                    <span className="text-[10px] text-terracotta block font-bold">
                      Moderate
                    </span>
                  </div>

                  <div className="p-1">
                    <span className="text-[10px] font-bold uppercase tracking-eyebrow text-graphite block">
                      Wind SSW
                    </span>

                    <span className="font-bold text-sm text-ink">
                      14 km/h
                    </span>

                    <span className="text-[10px] text-deep-teal block">
                      Gusts 28
                    </span>
                  </div>

                  <div className="p-1">
                    <span className="text-[10px] font-bold uppercase tracking-eyebrow text-graphite block">
                      Humidity
                    </span>

                    <span className="font-bold text-sm text-ink">
                      72%
                    </span>

                    <span className="text-[10px] text-deep-teal block">
                      Dew pt 25°C
                    </span>
                  </div>

                  <div className="p-1">
                    <span className="text-[10px] font-bold uppercase tracking-eyebrow text-graphite block">
                      Hooghly Stage
                    </span>

                    <span className="font-bold text-sm text-ink">
                      4.8m
                    </span>

                    <span className="text-[10px] text-emerald-700 block font-bold">
                      Safe (&lt;6.2m)
                    </span>
                  </div>

                </div>


                {/* Risk Projections */}

                <div className="space-y-3">

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-eyebrow uppercase text-ink">
                      7-Day Risk Projections
                    </span>

                    <span className="text-xs font-mono text-graphite">
                      Confidence 84%
                    </span>
                  </div>


                  <div className="space-y-1">

                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-ink flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky"></span>
                        Riverine &amp; Pluvial Flood
                      </span>

                      <span className="font-bold text-ink">
                        64% — Moderate
                      </span>
                    </div>

                    <div className="w-full bg-fog rounded-full h-2 overflow-hidden border border-mist">
                      <div
                        className="bg-sky h-2 rounded-full"
                        style={{ width: "64%" }}
                      ></div>
                    </div>

                  </div>


                  <div className="space-y-1">

                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-ink flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-terracotta"></span>
                        Heat Index Anomaly
                      </span>

                      <span className="font-bold text-ink">
                        42% — Low
                      </span>
                    </div>

                    <div className="w-full bg-fog rounded-full h-2 overflow-hidden border border-mist">
                      <div
                        className="bg-terracotta h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>

                  </div>


                  <div className="space-y-1">

                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-ink flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-deep-teal"></span>
                        Convective Squall / Wind
                      </span>

                      <span className="font-bold text-ink">
                        18% — Low
                      </span>
                    </div>

                    <div className="w-full bg-fog rounded-full h-2 overflow-hidden border border-mist">
                      <div
                        className="bg-deep-teal h-2 rounded-full"
                        style={{ width: "18%" }}
                      ></div>
                    </div>

                  </div>


                  <div className="space-y-1">

                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-ink flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-lavender"></span>
                        Slope / Landslide
                      </span>

                      <span className="font-bold text-ink">
                        8% — Very Low
                      </span>
                    </div>

                    <div className="w-full bg-fog rounded-full h-2 overflow-hidden border border-mist">
                      <div
                        className="bg-lavender h-2 rounded-full"
                        style={{ width: "8%" }}
                      ></div>
                    </div>

                  </div>

                </div>


                {/* AI Summary */}

                <div className="bg-mist p-4 rounded-[16px] border border-mist space-y-1.5">

                  <div className="flex items-center gap-1.5 text-deep-teal font-bold text-xs tracking-wide">

                    <span className="material-symbols-outlined text-[16px]">
                      psychology
                    </span>

                    <span>
                      Prognostic AI Insight (Next 72 Hours)
                    </span>

                  </div>

                  <p className="text-xs text-graphite leading-relaxed">
                    Heavy monsoon rainfall over the Gangetic basin may increase
                    localized waterlogging in low-lying ward precincts. High
                    tide in Hooghly at 16:40 IST may slow gravity drainage
                    gates.
                  </p>

                  <div className="text-[10px] font-mono text-deep-teal font-semibold pt-0.5">
                    Peak Inundation Window: Sept 7, 03:00 - Sept 10, 18:00 IST
                  </div>

                </div>

              </div>


              <div className="pt-2">

                <a
                  className="w-full py-3 rounded-lg bg-ink text-paper font-bold text-xs flex items-center justify-center gap-2 hover:bg-deep-teal transition-all"
                  href="#section-ai-guidance"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    forum
                  </span>

                  <span>Ask AI About Kolkata Risks</span>
                </a>

              </div>

            </div>

          </div>

        </section>


        {/* ============================================================= */}
        {/* ANALYTICS + AI */}
        {/* ============================================================= */}

        <section
          className="w-full bg-fog py-20 border-t border-b border-mist"
          id="section-analytics"
        >

          <div className="max-w-7xl mx-auto px-4 md:px-8">

            <div className="max-w-3xl mb-8">

              <h2 className="font-bold text-3xl md:text-[36px] text-ink tracking-[-0.02em] leading-tight">
                What's Likely to Happen Next?
              </h2>

              <p className="text-[16px] text-deep-teal leading-[1.5] mt-2">
                Explore environmental trends and multi-hazard probabilistic
                trajectories for Kolkata, West Bengal (KMC Metropolitan Zone).
              </p>

            </div>


            {/* Forecast Card */}

            <div className="bg-paper rounded-[24px] border border-mist p-6 md:p-9 space-y-6">

              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-mist">

                <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-deep-teal">

                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky"></span>
                    <span>Flood Likelihood (%)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-terracotta"></span>
                    <span>Heat Index (%)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-deep-teal"></span>
                    <span>Rainfall Vol (mm)</span>
                  </div>

                </div>

                <div className="text-xs font-mono text-graphite font-medium">
                  SYNOPTIC RUN: ECMWF-IFS 06Z ENSEMBLE
                </div>

              </div>


              <div className="w-full overflow-x-auto">

                <div className="min-w-[650px] h-60 relative flex flex-col justify-between">

                  <svg
                    className="w-full h-44 overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 700 180"
                  >

                    <line
                      stroke="#f0f4f7"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="20"
                      y2="20"
                    />

                    <line
                      stroke="#f0f4f7"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="70"
                      y2="70"
                    />

                    <line
                      stroke="#f0f4f7"
                      strokeWidth="1"
                      x1="0"
                      x2="700"
                      y1="120"
                      y2="120"
                    />

                    <line
                      stroke="#e1edf2"
                      strokeWidth="1.5"
                      x1="0"
                      x2="700"
                      y1="160"
                      y2="160"
                    />

                    <path
                      d="M 50,130 L 150,100 L 250,75 L 350,35 L 450,50 L 550,105 L 650,140 L 650,160 L 50,160 Z"
                      fill="#e1edf2"
                      opacity="0.7"
                    />

                    <path
                      d="M 50,130 L 150,100 L 250,75 L 350,35 L 450,50 L 550,105 L 650,140"
                      fill="none"
                      stroke="#10242f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />

                    <path
                      d="M 50,115 L 150,105 L 250,92 L 350,82 L 450,98 L 550,120 L 650,126"
                      fill="none"
                      stroke="#e39a4d"
                      strokeDasharray="4,3"
                      strokeWidth="2"
                    />

                    <circle
                      cx="350"
                      cy="35"
                      fill="#06040e"
                      r="5"
                    />

                    <rect
                      fill="#06040e"
                      height="20"
                      rx="10"
                      width="70"
                      x="315"
                      y="8"
                    />

                    <text
                      fill="#ffffff"
                      fontFamily="Plus Jakarta Sans"
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                      x="350"
                      y="22"
                    >
                      PEAK 78%
                    </text>

                    <circle
                      cx="50"
                      cy="130"
                      fill="#10242f"
                      r="3.5"
                    />

                    <circle
                      cx="150"
                      cy="100"
                      fill="#10242f"
                      r="3.5"
                    />

                    <circle
                      cx="250"
                      cy="75"
                      fill="#10242f"
                      r="3.5"
                    />

                    <circle
                      cx="450"
                      cy="50"
                      fill="#10242f"
                      r="3.5"
                    />

                    <circle
                      cx="550"
                      cy="105"
                      fill="#10242f"
                      r="3.5"
                    />

                    <circle
                      cx="650"
                      cy="140"
                      fill="#10242f"
                      r="3.5"
                    />

                  </svg>


                  <div className="grid grid-cols-7 text-center pt-3 text-xs border-t border-mist font-medium">

                    <div>
                      <span className="font-bold text-ink block">MON</span>
                      <span className="text-[11px] text-graphite">
                        32% • 18mm
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-ink block">TUE</span>
                      <span className="text-[11px] text-graphite">
                        48% • 34mm
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-ink block">WED</span>
                      <span className="text-[11px] text-graphite">
                        61% • 62mm
                      </span>
                    </div>

                    <div className="bg-mist rounded-lg py-1">
                      <span className="font-bold text-deep-teal block">
                        THU (MAX)
                      </span>

                      <span className="text-[11px] text-deep-teal font-bold">
                        78% • 114mm
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-ink block">FRI</span>
                      <span className="text-[11px] text-graphite">
                        72% • 85mm
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-ink block">SAT</span>
                      <span className="text-[11px] text-graphite">
                        45% • 24mm
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-ink block">SUN</span>
                      <span className="text-[11px] text-graphite">
                        28% • 6mm
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            </div>


            {/* AI Guidance */}

            <div
              className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
              id="section-ai-guidance"
            >

              <div className="lg:col-span-5 bg-paper rounded-[24px] border border-mist p-6 md:p-9 space-y-4">

                <div className="flex items-center gap-2">

                  <span className="material-symbols-outlined text-ink text-[22px]">
                    verified
                  </span>

                  <h3 className="font-bold text-xl text-ink">
                    Aegis AI Tactical Guidance
                  </h3>

                </div>

                <p className="text-xs text-graphite leading-relaxed">
                  Query actionable response directives, evacuation protocols,
                  or severity estimates for your municipal precinct.
                </p>

                <div className="relative pt-1">

                  <input
                    className="w-full h-11 pl-4 pr-11 rounded-lg bg-fog border border-mist text-xs text-ink placeholder:text-deep-teal/60 focus:outline-none focus:border-ink"
                    type="text"
                    defaultValue="What should I do if flooding starts in Kolkata?"
                  />

                  <button className="absolute right-1.5 top-2.5 w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center hover:bg-deep-teal transition-all">
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_upward
                    </span>
                  </button>

                </div>


                <div className="space-y-2 pt-2">

                  <span className="text-[10px] font-bold tracking-eyebrow uppercase text-graphite block">
                    Suggested Tactical Prompts
                  </span>

                  <button className="w-full text-left p-3 rounded-lg bg-fog hover:bg-mist text-xs font-medium text-deep-teal transition-colors truncate block border border-mist">
                    → Which arterial underpasses flood first in North Kolkata?
                  </button>

                  <button className="w-full text-left p-3 rounded-lg bg-fog hover:bg-mist text-xs font-medium text-deep-teal transition-colors truncate block border border-mist">
                    → SDRF boat staging points nearest to Salt Lake Sector V?
                  </button>

                  <button className="w-full text-left p-3 rounded-lg bg-fog hover:bg-mist text-xs font-medium text-deep-teal transition-colors truncate block border border-mist">
                    → Potable water tanker dispatch schedule for Alipore?
                  </button>

                </div>

              </div>


              <div className="lg:col-span-7 bg-cream rounded-[24px] border border-mist p-6 md:p-9 space-y-4">

                <div className="flex items-center justify-between border-b border-terracotta/20 pb-3">

                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>

                    <span className="font-bold text-sm text-ink">
                      Verified AI Response Dossier
                    </span>

                  </div>

                  <span className="text-[11px] font-mono text-graphite font-bold">
                    PROTOCOL CAP-IN-2024
                  </span>

                </div>


                <div className="space-y-1">

                  <span className="text-[10px] font-bold tracking-eyebrow uppercase text-ink">
                    Directive for Citizens &amp; Ward Leaders
                  </span>

                  <p className="text-xs text-graphite leading-relaxed">
                    Based on current flood projections for Kolkata, avoid
                    low-lying arterial underpasses (
                    <strong className="text-ink font-bold">
                      Park Circus 7-Point, Ultadanga, Lake Gardens
                    </strong>
                    ). Secure ground-floor electrical terminals and store
                    minimum 72-hour emergency potable water. Official NDMA
                    State Emergency Command helpline:{" "}
                    <strong className="text-ink font-bold">
                      1070
                    </strong>
                    .
                  </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">

                  <div className="p-3.5 rounded-2xl bg-paper border border-mist space-y-1">

                    <div className="flex items-center gap-1.5 text-ink font-bold text-xs">

                      <span className="material-symbols-outlined text-[16px] text-sky">
                        check_circle
                      </span>

                      <span>Actions Required</span>

                    </div>

                    <p className="text-[11px] text-graphite leading-normal">
                      Relocate fragile inventory above 1.5m datum. Move
                      vehicles away from trunk drains.
                    </p>

                  </div>


                  <div className="p-3.5 rounded-2xl bg-paper border border-mist space-y-1">

                    <div className="flex items-center gap-1.5 text-ink font-bold text-xs">

                      <span className="material-symbols-outlined text-[16px] text-terracotta">
                        warning
                      </span>

                      <span>Warning Signs</span>

                    </div>

                    <p className="text-[11px] text-graphite leading-normal">
                      Back-flow bubbling in domestic sinks; Hooghly sluice
                      closure flags raised.
                    </p>

                  </div>


                  <div className="p-3.5 rounded-2xl bg-paper border border-mist space-y-1">

                    <div className="flex items-center gap-1.5 text-ink font-bold text-xs">

                      <span className="material-symbols-outlined text-[16px] text-lavender">
                        medical_services
                      </span>

                      <span>Emergency Kit</span>

                    </div>

                    <p className="text-[11px] text-graphite leading-normal">
                      ORS packets, water purification tabs, fully-charged power
                      banks, waterproof deed bag.
                    </p>

                  </div>

                </div>


                <p className="text-[10px] text-graphite italic pt-1">
                  Decision-support intelligence only. Generated via Aegis
                  Sovereign Engine. Follow NDMA / WB-SDMA official directives
                  during civil declarations.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* ============================================================= */}
        {/* SCENARIO SIMULATOR */}
        {/* ============================================================= */}

        <section
          className="max-w-7xl mx-auto px-4 md:px-8 py-20"
          id="section-simulator"
        >

          <div className="max-w-3xl mb-8">

            <h2 className="font-bold text-3xl md:text-[36px] text-ink tracking-[-0.02em] leading-tight">
              What If Conditions Get Worse?
            </h2>

            <p className="text-[16px] text-deep-teal leading-[1.5] mt-2">
              Explore how compounding climate and weather thresholds affect
              urban and riverine terrain using our high-resolution Digital
              Elevation Model (DEM).
            </p>

          </div>


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* DEM */}

            <div className="lg:col-span-8 bg-deep-teal rounded-[24px] border border-deep-teal p-6 md:p-9 flex flex-col justify-between min-h-[440px] text-paper">

              <div className="flex items-center justify-between border-b border-paper/10 pb-3">

                <div className="flex items-center gap-2">

                  <span className="px-2.5 py-0.5 rounded-2xl bg-paper/15 text-paper text-[10px] font-mono font-bold uppercase">
                    DEM GRID: GANGETIC DELTA 1:5000
                  </span>

                  <span className="text-paper/70 text-[11px] font-mono">
                    HYDRAULIC MESH v3.2
                  </span>

                </div>

                <button className="px-3 py-1 rounded-lg bg-paper/10 hover:bg-paper/20 text-paper text-xs font-semibold transition-colors">
                  Topographic Contours
                </button>

              </div>


              <div className="w-full my-auto flex items-center justify-center py-4">

                <svg
                  className="w-full h-56 select-none"
                  viewBox="0 0 600 240"
                >

                  <g transform="translate(30, 20)">

                    <path
                      d="M 20,180 Q 150,130 280,160 T 520,140"
                      fill="none"
                      stroke="#416371"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M 20,150 Q 150,100 280,130 T 520,110"
                      fill="none"
                      stroke="#416371"
                      strokeDasharray="4,4"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M 20,120 Q 150,70 280,100 T 520,80"
                      fill="none"
                      stroke="#a5c8d8"
                      strokeWidth="1.5"
                    />


                    <polygon
                      fill="#a5c8d8"
                      opacity="0.8"
                      points="160,110 190,95 190,75 160,90"
                    />

                    <polygon
                      fill="#416371"
                      opacity="0.9"
                      points="190,95 230,115 230,95 190,75"
                    />

                    <polygon
                      fill="#e1edf2"
                      points="160,90 190,75 230,95 200,110"
                    />


                    <polygon
                      fill="#e39a4d"
                      points="320,130 350,115 350,85 320,100"
                    />

                    <polygon
                      fill="#c0782e"
                      points="350,115 390,135 390,105 350,85"
                    />

                    <polygon
                      fill="#f6ddc4"
                      points="320,100 350,85 390,105 360,120"
                    />


                    <path
                      d="M 20,165 Q 150,125 280,150 T 520,125 L 520,200 L 20,200 Z"
                      fill="#a5c8d8"
                      fillOpacity="0.35"
                    />

                    <line
                      stroke="#a5c8d8"
                      strokeLinecap="round"
                      strokeWidth="2"
                      x1="20"
                      x2="520"
                      y1="165"
                      y2="125"
                    />


                    <text
                      fill="#f6ddc4"
                      fontFamily="Plus Jakarta Sans"
                      fontSize="10"
                      fontWeight="700"
                      x="360"
                      y="75"
                    >
                      SUBSTATION SUBMERGED (-0.4m)
                    </text>

                    <text
                      fill="#ffffff"
                      fontFamily="Plus Jakarta Sans"
                      fontSize="11"
                      fontWeight="600"
                      x="100"
                      y="190"
                    >
                      HOOGHLY ESTUARY SURGE +0.8m
                    </text>

                  </g>

                </svg>

              </div>


              <div className="flex items-center justify-between text-xs text-paper/70 border-t border-paper/10 pt-3">

                <span>
                  SECTOR: KOLKATA METRO DRAINAGE BASIN 4
                </span>

                <span className="font-mono text-[10px]">
                  CELL RES: 5m • RUNTIME: 142ms
                </span>

              </div>

            </div>


            {/* CONTROLS */}

            <div className="lg:col-span-4 bg-paper rounded-[24px] border border-mist p-6 md:p-9 flex flex-col justify-between gap-6">

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <h3 className="font-bold text-xl text-ink">
                    Climate Stressors
                  </h3>

                  <span className="text-[10px] font-mono text-graphite uppercase font-bold tracking-eyebrow">
                    Parametric
                  </span>

                </div>


                <div className="space-y-1.5">

                  <div className="flex justify-between text-xs">

                    <span className="text-graphite font-semibold">
                      Precipitation Volume
                    </span>

                    <span className="font-bold text-ink font-mono">
                      +35% (142 mm)
                    </span>

                  </div>

                  <input
                    className="w-full cursor-pointer h-2 bg-fog rounded-lg appearance-none"
                    max="100"
                    min="0"
                    type="range"
                    defaultValue="35"
                  />

                </div>


                <div className="space-y-1.5">

                  <div className="flex justify-between text-xs">

                    <span className="text-graphite font-semibold">
                      Astronomical Tidal Surge
                    </span>

                    <span className="font-bold text-ink font-mono">
                      +0.8m
                    </span>

                  </div>

                  <input
                    className="w-full cursor-pointer h-2 bg-fog rounded-lg appearance-none"
                    max="25"
                    min="0"
                    type="range"
                    defaultValue="8"
                  />

                </div>


                <div className="space-y-1.5">

                  <div className="flex justify-between text-xs">

                    <span className="text-graphite font-semibold">
                      Sustained Wind Speed
                    </span>

                    <span className="font-bold text-ink font-mono">
                      +20% (68 km/h)
                    </span>

                  </div>

                  <input
                    className="w-full cursor-pointer h-2 bg-fog rounded-lg appearance-none"
                    max="100"
                    min="0"
                    type="range"
                    defaultValue="20"
                  />

                </div>


                <button
                  onClick={runSimulation}
                  className={`w-full py-3 rounded-lg bg-ink text-paper text-xs font-bold hover:bg-deep-teal transition-all flex items-center justify-center gap-2 mt-3 ${
                    simulationState === "computing"
                      ? "opacity-75"
                      : ""
                  }`}
                >

                  {simulationState === "computing" ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">
                        sync
                      </span>

                      <span>Computing Hydrology Model...</span>
                    </>
                  ) : simulationState === "synced" ? (
                    <>
                      <span className="material-symbols-outlined text-[16px]">
                        done
                      </span>

                      <span>Scenario Model Synced</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">
                        play_arrow
                      </span>

                      <span>Run Scenario Simulation</span>
                    </>
                  )}

                </button>

              </div>


              {/* Impact Summary */}

              <div className="bg-fog rounded-2xl p-4 border border-mist space-y-2">

                <span className="text-[10px] font-bold tracking-eyebrow uppercase text-ink block">
                  Scenario Estimated Impact
                </span>

                <div className="space-y-2 pt-1 text-xs">

                  <div className="flex justify-between">
                    <span className="text-graphite font-medium">
                      Affected Urban Area
                    </span>

                    <span className="font-bold text-ink font-mono">
                      12.4 km² (+18%)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-graphite font-medium">
                      Population in Hazard Zone
                    </span>

                    <span className="font-bold text-ink font-mono">
                      ~142,000 residents
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-graphite font-medium">
                      Critical Utilities at Risk
                    </span>

                    <span className="font-bold text-deep-teal font-mono">
                      2 Sub-stations, 4 Hosps
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ============================================================= */}
        {/* DISASTER INTELLIGENCE */}
        {/* ============================================================= */}

        <section
          className="w-full bg-fog py-20 border-t border-b border-mist"
          id="section-bulletins"
        >

          <div className="max-w-7xl mx-auto px-4 md:px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">

              <div>

                <h2 className="font-bold text-3xl md:text-[36px] text-ink tracking-[-0.02em] leading-tight">
                  Disaster Intelligence &amp; Early Warnings
                </h2>

                <p className="text-[16px] text-deep-teal leading-[1.5] mt-2">
                  Verified bulletins synthesized from IMD, CWC, and NDMA feeds.
                </p>

              </div>

              <a
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-deep-teal transition-colors"
                href="#"
              >
                <span>View All Bulletins</span>

                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </a>

            </div>


            {/* Filters */}

            <div className="flex flex-wrap items-center gap-2 mb-10">

              <button className="px-4 py-2 rounded-lg text-xs font-bold bg-ink text-paper">
                All Hazards
              </button>

              <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-paper border border-mist text-deep-teal hover:bg-mist">
                Flood &amp; Inundation
              </button>

              <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-paper border border-mist text-deep-teal hover:bg-mist">
                Cyclone &amp; Depression
              </button>

              <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-paper border border-mist text-deep-teal hover:bg-mist">
                Landslide
              </button>

              <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-paper border border-mist text-deep-teal hover:bg-mist">
                Heatwave
              </button>

            </div>


            {/* Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Card 1 */}

              <article className="bg-paper rounded-[56px] border border-mist p-9 flex flex-col justify-between hover:border-ink transition-colors space-y-6">

                <div className="space-y-4">

                  <div className="flex items-center justify-between">

                    <span className="px-3 py-1 rounded-2xl bg-cream text-ink text-[10px] font-bold tracking-eyebrow uppercase border border-mist">
                      Critical Alert
                    </span>

                    <span className="text-xs font-mono text-graphite font-medium">
                      2h ago
                    </span>

                  </div>

                  <div className="text-[11px] font-mono font-bold text-terracotta uppercase">
                    West Bengal • Gangetic Basin
                  </div>

                  <h3 className="font-bold text-xl text-ink leading-snug">
                    Heavy to very heavy rainfall forecast across Kolkata &amp;
                    Gangetic West Bengal
                  </h3>

                  <p className="text-xs text-graphite leading-relaxed">
                    IMD issues red alert for South 24 Parganas, Howrah, and
                    Kolkata municipal sectors. 120-180mm accumulation expected
                    within 18 hours.
                  </p>

                </div>

                <div className="flex items-center justify-between pt-4 border-t border-mist text-xs">

                  <span className="font-bold text-terracotta">
                    SDRF High Alert
                  </span>

                  <span className="material-symbols-outlined text-ink text-[18px]">
                    arrow_forward
                  </span>

                </div>

              </article>


              {/* Card 2 */}

              <article className="bg-paper rounded-[56px] border border-mist p-9 flex flex-col justify-between hover:border-ink transition-colors space-y-6">

                <div className="space-y-4">

                  <div className="flex items-center justify-between">

                    <span className="px-3 py-1 rounded-2xl bg-mist text-deep-teal text-[10px] font-bold tracking-eyebrow uppercase border border-sky/30">
                      Depression Watch
                    </span>

                    <span className="text-xs font-mono text-graphite font-medium">
                      4h ago
                    </span>

                  </div>

                  <div className="text-[11px] font-mono font-bold text-deep-teal uppercase">
                    Odisha &amp; Andhra Coast
                  </div>

                  <h3 className="font-bold text-xl text-ink leading-snug">
                    Low pressure area over East Central Bay of Bengal
                    concentrating into depression
                  </h3>

                  <p className="text-xs text-graphite leading-relaxed">
                    System moving west-northwestwards at 14 km/h. Sea
                    conditions rough to very rough. Fishermen advised not to
                    venture along Puri &amp; Visakhapatnam.
                  </p>

                </div>

                <div className="flex items-center justify-between pt-4 border-t border-mist text-xs">

                  <span className="font-bold text-deep-teal">
                    Port Signal 3 Hoisted
                  </span>

                  <span className="material-symbols-outlined text-ink text-[18px]">
                    arrow_forward
                  </span>

                </div>

              </article>


              {/* Card 3 */}

              <article className="bg-paper rounded-[56px] border border-mist p-9 flex flex-col justify-between hover:border-ink transition-colors space-y-6">

                <div className="space-y-4">

                  <div className="flex items-center justify-between">

                    <span className="px-3 py-1 rounded-2xl bg-lavender/60 text-plum text-[10px] font-bold tracking-eyebrow uppercase border border-lavender">
                      Landslide Warning
                    </span>

                    <span className="text-xs font-mono text-graphite font-medium">
                      5h ago
                    </span>

                  </div>

                  <div className="text-[11px] font-mono font-bold text-plum uppercase">
                    Sikkim &amp; Darjeeling Hills
                  </div>

                  <h3 className="font-bold text-xl text-ink leading-snug">
                    High landslide susceptibility along NH-10 due to continuous
                    slope saturation
                  </h3>

                  <p className="text-xs text-graphite leading-relaxed">
                    Teesta river discharge elevated. Debris slides reported at
                    29th Mile. Alternate route via Kalimpong activated by border
                    roads authority.
                  </p>

                </div>

                <div className="flex items-center justify-between pt-4 border-t border-mist text-xs">

                  <span className="font-bold text-plum">
                    BRO Clearance Active
                  </span>

                  <span className="material-symbols-outlined text-ink text-[18px]">
                    arrow_forward
                  </span>

                </div>

              </article>

            </div>

          </div>

        </section>


        {/* ============================================================= */}
        {/* PREPAREDNESS CTA */}
        {/* ============================================================= */}

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">

          <div className="bg-ink text-paper rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-cream opacity-15 pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl space-y-3.5 text-left">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-paper/15 text-[10px] font-bold tracking-eyebrow uppercase text-cream">
                Sovereign Emergency Readiness
              </div>

              <h2 className="font-bold text-3xl md:text-4xl text-paper tracking-tight leading-tight">
                Preparedness Starts With Awareness.
              </h2>

              <p className="text-xs sm:text-sm text-paper/85 leading-relaxed max-w-xl">
                Connect your state, municipality, or relief operations squad
                to India's unified real-time disaster intelligence grid.
                Seamlessly deploy alerts, evaluate simulations, and protect
                vulnerable communities.
              </p>

            </div>


            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">

              <a
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-paper text-ink font-bold text-xs text-center hover:bg-cream transition-all"
                href="#section-risk-map"
              >
                Launch National Risk Map
              </a>

              <a
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-paper/15 text-paper border border-paper/25 font-bold text-xs text-center hover:bg-paper/25 transition-all"
                href="#section-ai-guidance"
              >
                Consult Aegis AI Assistant
              </a>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;  
let googleMapsPromise = null;

export function loadGoogleMaps() {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const apiKey = import.meta.env.VITE_MAP_API_KEY;

  console.log("Google Maps API key loaded:", !!apiKey);

  if (!apiKey) {
    return Promise.reject(
      new Error("VITE_MAP_API_KEY is missing from .env")
    );
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[data-aegis-google-maps]'
    );

    if (existing) {
      existing.addEventListener("load", () => {
        resolve(window.google.maps);
      });

      existing.addEventListener("error", () => {
        reject(new Error("Google Maps script failed to load."));
      });

      return;
    }

    const script = document.createElement("script");

    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&v=weekly`;

    script.async = true;
    script.defer = true;

    script.dataset.aegisGoogleMaps = "true";

    script.onload = () => {
      console.log("Google Maps script loaded.");

      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error("Google Maps loaded but window.google.maps is missing."));
      }
    };

    script.onerror = () => {
      reject(new Error("Google Maps JavaScript API failed to load."));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}
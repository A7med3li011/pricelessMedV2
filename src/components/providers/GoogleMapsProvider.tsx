"use client";

import { useLoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyBODRGUBdifg8y_ZunuYBPgHalUWcoEgz4";

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return (
      <div className="w-full h-[700px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-red-500">Error loading maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[700px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading Maps...</p>
      </div>
    );
  }

  return <>{children}</>;
}

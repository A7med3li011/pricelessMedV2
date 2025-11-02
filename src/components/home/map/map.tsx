"use client";

import dynamic from "next/dynamic";
import GoogleMapsProvider from "@/src/components/providers/GoogleMapsProvider";

interface MapProps {
  long: number;
  lat: number;
}

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[700px] bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function Map({ long, lat }: MapProps) {
  return (
    <GoogleMapsProvider>
      <MapContent lat={lat} long={long} />
    </GoogleMapsProvider>
  );
}

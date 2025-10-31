"use client";
import { useEffect, useState } from "react";
import Map from "./map";

export default function MapLayout() {
  const [location, setLocation] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: null, long: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      // Set default location (Dubai, UAE)
      setLocation({ lat: 25.2048, long: 55.2708 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
        // Set default location on error
        setLocation({ lat: 25.2048, long: 55.2708 });
      }
    );
  }, []);

  if (!location.lat || !location.long) {
    return (
      <div className="w-full h-[700px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading location...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-2 p-2 bg-yellow-100 text-yellow-800 text-sm rounded">
          {error} - Using default location
        </div>
      )}
      <Map lat={location.lat} long={location.long} />
    </div>
  );
}

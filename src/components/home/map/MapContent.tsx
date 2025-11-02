"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";
import { useEffect, useState, useCallback } from "react";
import { NearestService, NearestFacility } from "@/src/app/actions/map.action";
import MapSlider from "./mapSlider";
import { Plus, Minus, Search, Settings, SlidersHorizontal } from "lucide-react";

// Inline SVG for selected facility pin (purple pin)
const SELECTED_PIN_SVG = `data:image/svg+xml;base64,${btoa(`
<svg width="20" height="48" viewBox="0 0 20 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 9.84046C0 8.48093 0.253565 7.20771 0.760694 6.02081C1.26782 4.83391 1.96917 3.79268 2.86474 2.89711C3.76031 1.99075 4.80154 1.28401 5.98844 0.776879C7.17534 0.25896 8.44855 0 9.80809 0C11.1676 0 12.4408 0.25896 13.6277 0.776879C14.8146 1.28401 15.8559 1.99075 16.7514 2.89711C17.647 3.79268 18.343 4.83391 18.8393 6.02081C19.3464 7.20771 19.6 8.48093 19.6 9.84046C19.6 11.2863 19.3087 12.6405 18.726 13.9029C18.1541 15.1545 17.3611 16.2389 16.3468 17.1561C15.3434 18.0732 14.1834 18.7476 12.8671 19.1792V39.3295C12.8671 40.4193 12.7538 41.4659 12.5272 42.4694C12.3114 43.4836 12.0362 44.39 11.7017 45.1884C11.3672 45.9869 11.0274 46.6181 10.6821 47.0821C10.3368 47.5461 10.0455 47.778 9.80809 47.778C9.55992 47.778 9.2632 47.5461 8.91792 47.0821C8.57264 46.6181 8.22736 45.9815 7.88208 45.1723C7.54759 44.3738 7.26705 43.4674 7.04046 42.4532C6.81387 41.4497 6.70058 40.4085 6.70058 39.3295V19.1792C5.39499 18.7368 4.24046 18.057 3.23699 17.1399C2.23353 16.2227 1.44046 15.1383 0.857804 13.8867C0.285935 12.6351 0 11.2863 0 9.84046ZM7.07283 10.4555C8.00077 10.4555 8.78844 10.121 9.43584 9.45202C10.094 8.77225 10.4231 7.98459 10.4231 7.08902C10.4231 6.17187 10.094 5.3842 9.43584 4.72601C8.78844 4.06782 8.00077 3.73873 7.07283 3.73873C6.47938 3.73873 5.92909 3.88979 5.42197 4.19191C4.91484 4.49403 4.50482 4.89865 4.19191 5.40578C3.879 5.91291 3.72254 6.47399 3.72254 7.08902C3.72254 7.68247 3.879 8.23815 4.19191 8.75607C4.50482 9.2632 4.91484 9.67322 5.42197 9.98613C5.92909 10.299 6.47938 10.4555 7.07283 10.4555Z" fill="#8A44D9"/>
</svg>
`)}`;

interface MapContentProps {
  long: number;
  lat: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy",
  clickableIcons: false,
};

export default function MapContent({ long, lat }: MapContentProps) {
  const [facilities, setFacilities] = useState<NearestFacility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<
    NearestFacility[]
  >([]);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = { lat, lng: long };

  useEffect(() => {
    async function fetchFacilities() {
      setLoading(true);
      const res = await NearestService(long, lat);
      if (res?.data) {
        setFacilities(res.data);
        setFilteredFacilities(res.data);
      }
      setLoading(false);
    }
    fetchFacilities();
  }, [long, lat]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleFacilitySelect = (
    coords: [number, number],
    facilityId?: string
  ) => {
    const newCoords = { lat: coords[0], lng: coords[1] };
    setSelectedCoords(newCoords);
    setSelectedFacilityId(facilityId || null);

    // Animate to selected location with smooth transition
    if (map) {
      map.panTo(newCoords);
      // Use a slight delay to ensure smooth animation
      setTimeout(() => {
        if (map) {
          map.setZoom(16);
        }
      }, 300);
    }
  };

  const handleMarkerClick = (facilityId: string, coords: [number, number]) => {
    setActiveMarker(facilityId);
    handleFacilitySelect(coords, facilityId);
  };

  // Effect to handle map updates when selectedCoords change
  useEffect(() => {
    if (selectedCoords && map) {
      map.panTo(selectedCoords);
      setTimeout(() => {
        if (map) {
          map.setZoom(16);
        }
      }, 300);
    }
  }, [selectedCoords, map]);

  // Zoom control functions
  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom() || 13;
      map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom() || 13;
      map.setZoom(currentZoom - 1);
    }
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Search clicked");
  };

  const handleSettings = () => {
    // TODO: Implement settings functionality
    console.log("Settings clicked");
  };

  return (
    <section className="w-full h-[700px] relative overflow-hidden rounded-lg">
      {/* Top Left Controls - Search and Settings */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-x-3">
        <button
          onClick={handleSearch}
          className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-[#4EC0FC]" />
        </button>
        <button
          onClick={handleSettings}
          className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
          aria-label="Settings"
        >
          <SlidersHorizontal className="w-5 h-5 text-[#4EC0FC]" />
        </button>
      </div>

      {/* Top Right Controls - Zoom In and Zoom Out */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 bg-white rounded-full py-3 px-1 shadow-2xl ">
        <button
          onClick={handleZoomIn}
          className="mb-2 cursor-pointer"
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5 text-[#4EC0FC]" />
        </button>
        <button
          onClick={handleZoomOut}
          className=" cursor-pointer"
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5 text-[#4EC0FC]" />
        </button>
      </div>

      {/* Google Map Container */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
          {/* Purple circle border around selected facility */}
          {selectedCoords && (
            <Circle
              center={selectedCoords}
              radius={50}
              options={{
                strokeColor: "#8A44D9",
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: "#8A44D9",
                fillOpacity: 0.1,
              }}
            />
          )}

          {/* User location marker (blue default marker) */}
          <Marker
            position={center}
            title="Your Location"
            onClick={() => setActiveMarker("user")}
          />

          {activeMarker === "user" && (
            <InfoWindow
              position={center}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="text-sm">
                <strong>Your Location</strong>
                <br />
                {lat.toFixed(4)}, {long.toFixed(4)}
              </div>
            </InfoWindow>
          )}

          {/* Facility markers */}
          {filteredFacilities.map((facility) => {
            const position = {
              lat: facility.location.coordinates[1],
              lng: facility.location.coordinates[0],
            };
            const isSelected = selectedFacilityId === facility._id;

            // Define icon configuration using object literals instead of constructors
            const iconConfig = isSelected
              ? {
                  url: SELECTED_PIN_SVG,
                  scaledSize: { width: 20, height: 48 },
                  anchor: { x: 10, y: 48 },
                }
              : {
                  url: `data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626" width="32" height="32">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  `)}`,
                  scaledSize: { width: 32, height: 32 },
                  anchor: { x: 16, y: 32 },
                };

            return (
              <Marker
                key={facility._id}
                position={position}
                title={facility.organization}
                icon={iconConfig}
                onClick={() =>
                  handleMarkerClick(facility._id, [
                    facility.location.coordinates[1],
                    facility.location.coordinates[0],
                  ])
                }
              />
            );
          })}

          {/* Info windows for facilities */}
          {filteredFacilities.map((facility) => {
            if (activeMarker !== facility._id) return null;

            const position = {
              lat: facility.location.coordinates[1],
              lng: facility.location.coordinates[0],
            };

            return (
              <InfoWindow
                key={`info-${facility._id}`}
                position={position}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="text-sm">
                  <strong>{facility.organization}</strong>
                  <br />
                  <span className="text-gray-600">{facility.facilityType}</span>
                  <br />
                  <span className="text-gray-500">
                    {facility.area}, {facility.city}
                  </span>
                  {facility.estimatedMinutes && (
                    <>
                      <br />
                      <span className="text-blue-600 font-medium">
                        {facility.estimatedMinutes} mins away
                      </span>
                    </>
                  )}
                </div>
              </InfoWindow>
            );
          })}
      </GoogleMap>

      {/* Slider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-gradient-to-t from-black/20 to-transparent pb-4">
        <MapSlider
          facilities={filteredFacilities}
          onFacilitySelect={handleFacilitySelect}
          loading={loading}
          selectedFacilityId={selectedFacilityId}
        />
      </div>
    </section>
  );
}

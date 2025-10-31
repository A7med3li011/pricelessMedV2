"use client";

import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import { useEffect, useState, useCallback } from "react";
import { NearestService, NearestFacility } from "@/src/app/actions/map.action";
import MapSlider from "./mapSlider";

const GOOGLE_MAPS_API_KEY = "AIzaSyBODRGUBdifg8y_ZunuYBPgHalUWcoEgz4";

interface MapContentProps {
  long: number;
  lat: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  gestureHandling: "greedy",
  clickableIcons: false,
};

export default function MapContent({ long, lat }: MapContentProps) {
  const [facilities, setFacilities] = useState<NearestFacility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<
    NearestFacility[]
  >([]);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
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

  return (
    <section className="w-full h-[700px] relative overflow-hidden rounded-lg">
      {/* Google Map Container */}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
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
                  url: "/assets/home/pin.svg",
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
      </LoadScript>

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

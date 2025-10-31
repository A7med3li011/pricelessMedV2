"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { NearestService, NearestFacility } from "@/src/app/actions/map.action";
import MapSlider from "./mapSlider";

// Fix for default marker icon issue in Next.js
const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icon for facilities
const facilityIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Custom pin icon for selected facility using custom SVG
const selectedFacilityIcon = L.icon({
  iconUrl: "/assets/home/pin.svg",
  iconSize: [20, 48],
  iconAnchor: [10, 48],
  popupAnchor: [0, -48],
});

// Component to update map center when selectedFacility changes
function MapUpdater({
  selectedCoords,
}: {
  selectedCoords: [number, number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedCoords) {
      map.flyTo(selectedCoords, 16, {
        duration: 1.5,
      });
    }
  }, [selectedCoords, map]);

  return null;
}

interface MapContentProps {
  long: number;
  lat: number;
}

export default function MapContent({ long, lat }: MapContentProps) {
  const [facilities, setFacilities] = useState<NearestFacility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<
    NearestFacility[]
  >([]);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Fix for marker icon in production
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  const handleFacilitySelect = (
    coords: [number, number],
    facilityId?: string
  ) => {
    setSelectedCoords(coords);
    setSelectedFacilityId(facilityId || null);
  };

  return (
    <section className="w-full h-[700px] relative overflow-hidden rounded-lg">
      {/* Map Container */}
      <MapContainer
        center={[lat, long]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full rounded-lg z-0"
      >
        <MapUpdater selectedCoords={selectedCoords} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Purple circle border around selected facility */}
        {selectedCoords && (
          <Circle
            center={selectedCoords}
            radius={50}
            pathOptions={{
              color: "#8A44D9",
              fillColor: "#8A44D9",
              fillOpacity: 0.1,
              weight: 3,
            }}
          />
        )}

        {/* User location marker */}
        <Marker position={[lat, long]} icon={userIcon}>
          <Popup>
            <div className="text-sm">
              <strong>Your Location</strong>
              <br />
              {lat.toFixed(4)}, {long.toFixed(4)}
            </div>
          </Popup>
        </Marker>

        {/* Facility markers */}
        {filteredFacilities.map((facility) => {
          const isSelected = selectedFacilityId === facility._id;
          return (
            <Marker
              key={facility._id}
              position={[
                facility.location.coordinates[1],
                facility.location.coordinates[0],
              ]}
              icon={isSelected ? selectedFacilityIcon : facilityIcon}
              eventHandlers={{
                click: () => {
                  handleFacilitySelect(
                    [
                      facility.location.coordinates[1],
                      facility.location.coordinates[0],
                    ],
                    facility._id
                  );
                },
              }}
            >
              <Popup>
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
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

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

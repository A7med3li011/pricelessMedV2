"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { NearestFacility } from "@/src/app/actions/map.action";

interface MapSliderProps {
  facilities: NearestFacility[];
  onFacilitySelect: (coords: [number, number]) => void;
  loading?: boolean;
}

export default function MapSlider({
  facilities,
  onFacilitySelect,
  loading = false,
}: MapSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleCardClick = (facility: NearestFacility) => {
    onFacilitySelect([
      facility.location.coordinates[1],
      facility.location.coordinates[0],
    ]);
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] h-[220px] bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (facilities.length === 0) {
    return (
      <div className="w-full px-4 py-6 text-center">
        <p className="text-gray-500">No facilities found nearby</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 lg:px-8">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-2 mb-2">
        <button
          onClick={scrollPrev}
          className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 pb-2">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="flex-shrink-0 transition-transform hover:scale-[1.02] cursor-pointer"
              style={{ width: "280px" }}
              onClick={() => handleCardClick(facility)}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-xl transition-shadow">
                {/* Image Section */}
                <div className="relative w-full h-[160px] bg-gray-100">
                  <Image
                    className="object-cover"
                    src={facility.coverImage}
                    fill
                    alt={facility.organization || "Facility image"}
                    sizes="280px"
                  />
                  {facility.estimatedMinutes && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {facility.estimatedMinutes} mins
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-3">
                  {/* Organization Name */}
                  <div className="text-sm font-semibold text-gray-800 flex items-center gap-1 mb-1">
                    <p className="truncate">{facility.organization}</p>
                    {!facility.organization
                      ?.toLowerCase()
                      .includes(facility.facilityType?.toLowerCase() || "") && (
                      <span className="text-xs text-gray-500 font-normal">
                        ({facility.facilityType})
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="text-xs text-gray-600 flex items-center gap-1 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span className="truncate">
                      {facility.area}, {facility.city}
                    </span>
                  </div>

                  {/* Distance */}
                  {facility.distanceKm && (
                    <div className="text-xs text-gray-500">
                      {facility.distanceKm.toFixed(1)} km away
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { LoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyBODRGUBdifg8y_ZunuYBPgHalUWcoEgz4";

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} loadingElement={<div>Loading Maps...</div>}>
      {children}
    </LoadScript>
  );
}

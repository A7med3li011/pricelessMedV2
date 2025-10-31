// Types for Nearest Facilities
export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface NearestFacility {
  _id: string;
  location: Location;
  address: string;
  area: string;
  city: string;
  coverImage: string;
  organization: string;
  facilityType: string;
  distance: number;
  distanceKm: number;
  estimatedMinutes: number;
  // Optional Arabic translations
  address_ar?: string;
  area_ar?: string;
  city_ar?: string;
}

export interface NearestServiceResponse {
  data: NearestFacility[] | null;
  success: boolean;
  error: {
    message: string;
    status: number;
  } | null;
}

export async function NearestService(
  long: number,
  lat: number
): Promise<NearestServiceResponse> {
  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/nearby-facilities?longitude=${55.270782}&latitude=${25.204849}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch nearest services: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

    // Debug: Log the API response to check if estimatedMinutes is included
    console.log("API Response:", JSON.stringify(result, null, 2));

    return {
      data: result.data || [],
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      success: false,
      error: {
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        status: 500,
      },
    };
  }
}

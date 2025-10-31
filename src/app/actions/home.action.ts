import { cacheLife, cacheTag } from "next/cache";
import {
  Tag,
  Banner,
  PopularService,
  ApiResponse,
  FAQ,
  News,
} from "@/src/types/tag.types";

export async function getTags(lang: string): Promise<ApiResponse<Tag[]>> {
  "use cache";
  cacheTag(`tags-${lang}`);
  cacheLife({ stale: 86400 }); // 1 hour cache lifetime

  console.log(new Date(), lang);

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/tags?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch tags: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

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
export async function getBanners(lang: string): Promise<ApiResponse<Banner[]>> {
  "use cache";
  cacheTag(`banner-${lang}`);
  cacheLife({ stale: 3600 }); // 1 hour cache lifetime

  console.log(new Date(), lang, "banner");

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/banners?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch banners: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

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
export async function getPopularService(
  lang: string
): Promise<ApiResponse<PopularService[]>> {
  "use cache";
  cacheTag(`popular-service-${lang}`);
  cacheLife({ stale: 3600 }); // 1 hour cache lifetime

  console.log(new Date(), lang, "service");

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/popular-offers?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch popular services: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

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
export async function getHospitalService(
  lang: string
): Promise<ApiResponse<PopularService[]>> {
  "use cache";
  cacheTag(`popular-service-${lang}`);
  cacheLife({ stale: 3600 }); // 1 hour cache lifetime

  console.log(new Date(), lang, "service");

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/new-facilities?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch hospital services: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

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
export async function getFAQ(lang: string): Promise<ApiResponse<FAQ[]>> {
  "use cache";
  cacheTag(`FAQ-service-${lang}`);
  cacheLife({ stale: 86400 }); // 24 hours cache lifetime

  console.log(new Date(), lang, "FAQ");

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/faq?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch FAQ: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

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
export async function LatestNews(lang: string): Promise<ApiResponse<News[]>> {
  "use cache";
  cacheTag(`latest-news-${lang}`);
  cacheLife({ stale: 3600 }); // 24 hours cache lifetime

  console.log(new Date(), lang, "News");

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/latest-press?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch NEWs: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

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

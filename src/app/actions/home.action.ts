import { cacheLife, cacheTag } from "next/cache";
import {
  Tag,
  Banner,
  PopularService,
  ApiResponse,
  FAQ,
  News,
  Blog,
  Partner,
} from "@/src/types/tag.types";

export async function getTags(lang: string): Promise<ApiResponse<Tag[]>> {
  "use cache";
  cacheTag(`tags-${lang}`);
  cacheLife({ stale: 86400 }); // 1 hour cache lifetime

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
export async function getBlogs(lang: string): Promise<ApiResponse<Blog[]>> {
  "use cache";
  cacheTag(`blogs-${lang}`);
  cacheLife({ stale: 3600 }); // 1 hour cache lifetime

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/latest-blogs?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch blogs: ${response.statusText}`,
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
export async function getBlogsDynamic(
  lang: string,
  page: number,
  pageLimit: number
): Promise<ApiResponse<Blog[]>> {
  "use server";

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/blogs?lang=${lang}&page=${page}&pageLimit=${
        pageLimit || 8
      }`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch blogs: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

    return {
      data: result.data || [],
      pagination: result.pagination,
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
export async function getNewsDynamic(
  lang: string,
  page: number,
  pageLimit: number
): Promise<ApiResponse<Blog[]>> {
  "use server";

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/press?lang=${lang}&page=${page}&pageLimit=${pageLimit}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch press: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

    return {
      data: result.data || [],
      pagination: result.pagination,
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

export async function getPartners(
  lang: string
): Promise<ApiResponse<Partner[]>> {
  "use cache";
  cacheTag(`partner-${lang}`);
  cacheLife({ stale: 3600 }); // 1 hour cache lifetime

  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/our-partners?lang=${lang}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch partners: ${response.statusText}`,
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

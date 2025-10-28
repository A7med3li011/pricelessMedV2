// lib/api/base.ts
import axios from "axios";
import { cacheLife, cacheTag } from "next/cache";
// import axiosInstance from "@/lib/axios";

/**
 * Base API call with caching support
 */
export async function cachedApiCall<T>({
  endpoint,
  lang,
  token,
  cacheKey,
  cacheDuration = 600, // 10 minutes default
  method = "GET",
  data,
}: {
  endpoint: string;
  lang: string;
  token?: string;
  cacheKey: string;
  cacheDuration?: number;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
}) {
  "use cache: private";

  // Tag with both general and language-specific tags
  cacheTag(cacheKey);
  cacheTag(`${cacheKey}-${lang}`);

  cacheLife({
    stale: cacheDuration,
    revalidate: cacheDuration * 2,
  });

  try {
    const url = `${endpoint}${endpoint.includes("?") ? "&" : "?"}lang=${lang}`;

    const config = {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    let response;
    switch (method) {
      case "POST":
        response = await axios.post(
          `https://pricelessmed.com/api${url}`,
          data,
          config
        );
        break;
      case "PUT":
        response = await axios.put(
          `https://pricelessmed.com/api${url}`,
          data,
          config
        );
        break;
      case "DELETE":
        response = await axios.delete(
          `https://pricelessmed.com/api${url}`,
          config
        );
        break;
      default:
        response = await axios.get(
          `https://pricelessmed.com/api${url}`,
          config
        );
    }

    return {
      data: response.data,
      success: true,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      success: false,
      error: {
        message: err?.response?.data?.message || `Failed to fetch ${cacheKey}`,
        status: err?.response?.status || 500,
      },
    };
  }
}

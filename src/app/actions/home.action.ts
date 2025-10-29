import { cacheLife, cacheTag } from "next/cache";
import { Tag, ApiResponse } from "@/src/types/tag.types";

export async function getTags(lang: string): Promise<ApiResponse<Tag[]>> {
  "use cache";
  cacheTag(`tags-${lang}`);
  cacheLife({ stale: 3600 }); // 1 hour cache lifetime

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

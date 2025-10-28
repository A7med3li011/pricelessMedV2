import { cachedApiCall } from "@/src/utils/cach-cheef";
import { ApiResponse, TagsResponse } from "@/src/types/tag.types";

export async function getTags(lang: string, token?: string): Promise<ApiResponse<TagsResponse>> {
  return cachedApiCall<TagsResponse>({
    endpoint: "/website/tags",
    lang,
    token,
    cacheKey: "tags",
    cacheDuration: 900,
  });
}

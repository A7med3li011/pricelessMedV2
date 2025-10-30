export interface Tag {
  id: string | number;
  title: string;
  imageUrl: string;
  slug?: string;
  description?: string;
}

export interface Banner {
  id: string | number;
  title: string;
  imageUrl: string;
  link?: string;
  description?: string;
}

export interface PopularService {
  id: string | number;
  imageUrl: string;
  discount: number;
  price: number;
  discountPrice: number;
  upperText: string;
  lowerText: string;
  tag: string;
  facilityCity: string;
  facilityArea: string;
  link?: string;
}

export interface TagsResponse {
  data: Tag[];
  success: boolean;
  message?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  error: {
    message: string;
    status: number;
  } | null;
}

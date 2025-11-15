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
  // Additional fields for hospitals/clinics (new facilities)
  coverImage?: string;
  organization?: string;
  facilityType?: string;
  area?: string;
  city?: string;
}

export interface TagsResponse {
  data: Tag[];
  success: boolean;
  message?: string;
}

export interface FAQ {
  id: string | number;
  question: string;
  answer: string;
}

export interface News {
  id: string | number;
  _id: string | number;
  title: string;
  imageUrl: string;
  date: string;
  content?: string;
  category?: string;
}

export interface Blog {
  id: string | number;
  _id: string | number;
  title: string;
  imageUrl: string;
  date: string;
  content?: string;
  category?: string;
  author?: string;
  excerpt?: string;
}

export interface Partner {
  id: string | number;
  imageUrl: string;
  organization: string;
  description?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageLimit?: number;
}

export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  error: {
    message: string;
    status: number;
  } | null;
  pagination?: PaginationInfo;
}

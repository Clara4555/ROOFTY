export interface PropertyFilters {
  type?: string;
  propertyType?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface SearchFormData {
  location: string;
  propertyType: string;
  priceRange: string;
  type: string;
}

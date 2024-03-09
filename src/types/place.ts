import {Category, ProductCategory} from './category';
import {Special} from './specials';

export interface OpeningHours {
  [K: string]: {
    closed?: boolean;
    openAllDay?: boolean;
    ranges?: {from: string; to: string}[];
  };
  // @ts-ignore
  id: string;
  // @ts-ignore
  createdAt: string;
  // @ts-ignore
  updatedAt: string;
  // @ts-ignore
  deletedAt: string | null;
}
export interface Place {
  name: string;
  id: string;
  email: string;
  phone: string;
  address: string;
  longitude: string;
  latitude: string;
  website?: string;
  logo: string;
  mainImage: string;
  category: Category;
  averagePrice: number;
  rating: number;
  total_reviews: number;
  deliveryFee?: number;
  minPrepTime?: number;
  maxPrepTime?: number;
  placeAdminFullName: string;
  placeAdminPhone: string;
  placeAdminPassword: string;
  openingHours: OpeningHours;
}

export interface PlaceService {
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
  photo: string;
  name: string;
  price: number;
  productCategory: ProductCategory;
}

export interface PlaceProducts {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  description: string;
  photo: string | null;
  name: string;
  price: number;
  offers: Special[];
}
export interface PlaceMenu {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  slug: string;
  products: PlaceProducts[];
}

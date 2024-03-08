import {User} from './auth';
import {Booking} from './booking';
import {Place} from './place';

export type Status =
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'delivered'
  | 'cancelled';
export interface Query {
  [key: string]: string | number;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Likes {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user: User;
  place: Place;
}

export interface UserLocation {
  description: string;
  main_text: string;
  display_name: string;
  lat?: number;
  lng?: number;
  reference: string;
  place_id: string;
}

export interface Review {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  comment: string;
  rating: number;
  date: string;
  user: User;
  booking: Booking;
}

export interface PaginationMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

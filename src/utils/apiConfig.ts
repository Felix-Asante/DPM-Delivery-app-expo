import {toQuery} from './helpers';
import {Query} from '../types';

export const apiConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  auth: {
    login: () => `/auth/login`,
    register: () => `/auth/signup`,
    forgot_password: () => `/auth/forgotPassword`,
    reset_password: (code: string) => `/auth/resetPassword/${code}`,
    change_password: () => `/users/change-password`,
    verify_otp: (code: string) => `/auth/verify-account/${code}`,
  },
  user: {
    root: () => `/users`,
    me: () => `/users/me`,
    likes: () => `/users/likes`,
  },
  places: {
    root: () => `/places`,
    get: (id: string) => `/places/${id}`,
    new: () => `/places/new`,
    place_service: (id: string) => `/places/${id}/products`,
    like: (id: string) => `/places/${id}/like`,
    dislike: (id: string) => `/places/${id}/dislike`,
    with_offers: () => `/offers/place-offers`,
    popular: (query?: Query) =>
      `/places/popular/locations${toQuery(query ?? {})}`,
    search: (query?: Query) => `places/search${toQuery(query ?? {})}`,
  },
  categories: {
    root: () => `/categories`,
  },
  bookings: {
    root: () => `bookings`,
    mine: (query?: Query) => `users/bookings${toQuery(query ?? {})}`,
    rate: (bookingId: string) => `bookings/${bookingId}/rate`,
  },
  offers: {
    root: () => `/offers`,
    place_offers: () => `/offers/place-offers`,
    product_offers: () => `/offers/product-offers`,
  },
};

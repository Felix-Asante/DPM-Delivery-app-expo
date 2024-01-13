import {toQuery} from './helpers';
import {Query} from '../types';

export const apiConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  auth: {
    login: () => `/auth/login`,
    register: () => `/auth/signup`,
    forgot_password: () => `/auth/forgotPassword`,
    reset_password: (code: string) => `/auth/resetPassword/${code}`,
    change_password: () => `/auth/change-password`,
    verify_otp: (code: string) => `/auth/verify-account/${code}`,
  },
  user: {
    root: () => `/users`,
    me: () => `/users/me`,
  },
  places: {
    root: () => `/places`,
    get: (id: string) => `/places/${id}`,
    new: () => `/places/new`,
    popular: (query?: Query) =>
      `/places/popular/locations${toQuery(query ?? {})}`,
  },
  categories: {
    root: () => `/categories`,
  },
  bookings: {
    root: () => `bookings`,
    mine: (query?: Query) => `users/bookings${query ?? {}}`,
  },
  offers: {
    root: () => `/offers`,
    place_offers: () => `/offers/place-offers`,
    product_offers: () => `/offers/product-offers`,
  },
};

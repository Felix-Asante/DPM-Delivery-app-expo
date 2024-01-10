import {toQuery} from './helpers';
import {Query} from '../types';

export const apiConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  auth: {
    login: () => `/auth/login`,
    register: () => `/auth/signup`,
    forgot_password: () => `/auth/forgotPassword`,
    reset_password: () => `/auth/resetPassword`,
    change_password: () => `/auth/change-password`,
  },
  user: {
    root: () => `/users`,
    me: () => `/users/me`,
  },
  places: {
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
};

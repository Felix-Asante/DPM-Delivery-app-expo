import {makeApiRequest} from './apiHandler';
import {Status} from '../types';
import {Booking, BookingDto} from '../types/booking';
import {apiConfig} from '../utils/apiConfig';
import {ratingDto} from '../validations';

export function createBooking(data: BookingDto) {
  const endpoint = apiConfig.bookings.root();
  return makeApiRequest({endpoint, method: 'post', data});
}

export function getUserBooking(status: Status): Promise<Booking[]> {
  const endpoint = apiConfig.bookings.mine({status});
  return makeApiRequest({endpoint, method: 'get'});
}
export function rateBooking(payload: ratingDto & {bookingId: string}) {
  const endpoint = apiConfig.bookings.rate(payload.bookingId);
  return makeApiRequest({endpoint, method: 'post', data: payload});
}

import {makeApiRequest} from './apiHandler';
import {Status} from '../types';
import {Booking, BookingDto} from '../types/booking';
import {apiConfig} from '../utils/apiConfig';

export function createBooking(data: BookingDto) {
  const endpoint = apiConfig.bookings.root();
  return makeApiRequest({endpoint, method: 'post', data});
}

export function getUserBooking(status: Status): Promise<Booking[]> {
  const endpoint = apiConfig.bookings.mine({status});
  console.log(endpoint);
  return makeApiRequest({endpoint, method: 'get'});
}

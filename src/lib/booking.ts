import {makeApiRequest} from './apiHandler';
import {BookingDto} from '../types/booking';
import {apiConfig} from '../utils/apiConfig';

export function createBooking(data: BookingDto) {
  const endpoint = apiConfig.bookings.root();
  return makeApiRequest({endpoint, method: 'post', data});
}

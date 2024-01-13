import {makeApiRequest} from './apiHandler';
import {Query} from '../types';
import {Place} from '../types/place';
import {apiConfig} from '../utils/apiConfig';

export function getNewPlaces(): Promise<Place[]> {
  const endpoint = apiConfig.places.new();
  return makeApiRequest({endpoint, method: 'get'});
}
export function getPopularPlaces(query?: Query): Promise<Place[]> {
  const endpoint = apiConfig.places.popular(query);
  return makeApiRequest({endpoint, method: 'get'});
}
export function getPlace(id: string): Promise<Place> {
  const endpoint = apiConfig.places.get(id);
  return makeApiRequest({endpoint, method: 'get'});
}

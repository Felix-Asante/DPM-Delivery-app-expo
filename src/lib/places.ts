import {makeApiRequest} from './apiHandler';
import {Likes, Query} from '../types';
import {Place, PlaceMenu} from '../types/place';
import {apiConfig} from '../utils/apiConfig';

export function getNewPlaces(): Promise<Place[]> {
  const endpoint = apiConfig.places.new();
  return makeApiRequest({endpoint, method: 'get'});
}
export function getPopularPlaces(query?: Query): Promise<Place[]> {
  const endpoint = apiConfig.places.popular(query);
  return makeApiRequest({endpoint, method: 'get'});
}
export function getPlaceService(id: string): Promise<PlaceMenu[]> {
  const endpoint = apiConfig.places.place_service(id);
  return makeApiRequest({endpoint, method: 'get'});
}
export function getPlace(id: string): Promise<Place> {
  const endpoint = apiConfig.places.get(id);
  return makeApiRequest({endpoint, method: 'get'});
}
export const likePlace = (placeId: string): Promise<Likes> => {
  const endpoint = apiConfig.places.like(placeId);
  return makeApiRequest({endpoint, method: 'put'});
};
export const disLikePlace = (placeId: string) => {
  const endpoint = apiConfig.places.dislike(placeId);
  return makeApiRequest({endpoint, method: 'put'});
};
export const searchPlaces = (query: Query): Promise<Place[]> => {
  const endpoint = apiConfig.places.search(query);
  return makeApiRequest({endpoint, method: 'get'});
};

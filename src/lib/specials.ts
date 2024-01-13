import {makeApiRequest} from './apiHandler';
import {PlaceProducts} from '../types/place';
import {Special} from '../types/specials';
import {apiConfig} from '../utils/apiConfig';

export function getPlacesWithOffers(): Promise<Special[]> {
  const endpoint = apiConfig.offers.place_offers();
  return makeApiRequest({endpoint, method: 'get'});
}
export function getProductOffers(): Promise<PlaceProducts[]> {
  const endpoint = apiConfig.offers.product_offers();
  return makeApiRequest({endpoint, method: 'get'});
}

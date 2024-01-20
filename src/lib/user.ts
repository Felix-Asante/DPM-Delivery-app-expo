import {makeApiRequest} from './apiHandler';
import {Place} from '../types/place';
import {apiConfig} from '../utils/apiConfig';

interface GetUserLikesResponse {
  id: string;
  place: Place;
}
export function getUserLikes(): Promise<GetUserLikesResponse[]> {
  const endpoint = apiConfig.user.likes();
  return makeApiRequest({method: 'get', endpoint});
}

import {makeApiRequest} from './apiHandler';
import {Category} from '../types/category';
import {apiConfig} from '../utils/apiConfig';

export const getAllCategories = (): Promise<Category[]> => {
  const endpoint = apiConfig.categories.root();
  return makeApiRequest({endpoint, method: 'get'});
};

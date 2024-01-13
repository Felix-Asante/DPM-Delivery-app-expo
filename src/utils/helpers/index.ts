import * as SecureStore from 'expo-secure-store';

import {Query} from '../../types';
export function mergeClassNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export async function isSecureStoreAvailable() {
  return await SecureStore.isAvailableAsync();
}

export async function saveToSecureStore(key: string, value: any) {
  if (await isSecureStoreAvailable()) {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getFromSecureStore(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}
export async function deleteFromSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export function toQuery(queryObj: Query) {
  if (!queryObj || !Object.keys(queryObj).length) return '';
  const queries: string[] = [];
  Object.keys(queryObj).forEach(key => {
    if (queryObj[key]) {
      queries.push(`${key}=${queryObj[key]}`);
    }
  });
  return queries.length ? `?${queries.join('&')}` : '';
}

export function getErrorMessage(error: any) {
  if (!error?.response && !error?.message) {
    return 'Network error';
  }
  const {statusCode, data, message = ''} = error?.response;
  if (statusCode === 403) {
    // logout
    console.log('logout');
  }
  console.log(JSON.stringify(error));

  return data?.message || message;
}

export const calculateDiscount = (
  originalPrice: number,
  reductionPercent: number,
) => {
  if (originalPrice < 0 || reductionPercent < 0 || reductionPercent > 100) {
    throw new Error('Invalid input values');
  }

  const discountAmount = (reductionPercent / 100) * originalPrice;
  return originalPrice - discountAmount;
};

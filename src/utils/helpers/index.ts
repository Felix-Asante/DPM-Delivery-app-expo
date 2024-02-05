import {type ClassValue, clsx} from 'clsx';
import * as SecureStore from 'expo-secure-store';
import * as Sharing from 'expo-sharing';
import {twMerge} from 'tailwind-merge';

import {Query} from '../../types';
import {toastErrorMessage} from '../toast';

export function mergeClassNames(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
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
  try {
    const result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    console.log('store error', error);
  }
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

export async function share(url: string, options: Sharing.SharingOptions) {
  try {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(url, options);
    }
  } catch (error: any) {
    toastErrorMessage(error?.message);
  }
}

export function getInitials(text: string) {
  if (!text) return '';
  const [first, last] = text.split(' ');
  if (!last || !first) return text?.charAt(0);
  return `${first.charAt(0).toUpperCase()} ${last.charAt(0).toUpperCase()}`;
}

export function shorten(text: string, length = 21) {
  const actualLength = text?.length;
  return `${text?.substring(0, length)} ${actualLength > 21 ? '...' : ''}`;
}

export function formatNumber(value: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  if (!value) return 0;
  return formatter.format(value);
}
export function pluralize(value: string, total: number, pluralForm = '') {
  return total > 1 ? (pluralForm ? pluralForm : `${value}s`) : value;
}

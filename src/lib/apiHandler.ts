import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

import {TOKEN_KEY} from '../constants';
import {apiConfig} from '../utils/apiConfig';
import {getFromSecureStore} from '../utils/helpers';

const API_BASE_URL = apiConfig.baseUrl;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getFromSecureStore(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

type HttpMethods = 'get' | 'post' | 'put' | 'delete';
type ApiHandler = {
  endpoint: string;
  method: HttpMethods;
  data?: any;
};
export const makeApiRequest = async <T>(config: ApiHandler): Promise<T> => {
  const {endpoint, method, data} = config;
  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      data,
    });

    return response.data as T;
  } catch (error) {
    throw error;
  }
};

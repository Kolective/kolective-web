/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';

let baseURL = process.env.NEXT_PUBLIC_API_URL || '';
if (baseURL && !baseURL.endsWith('/')) {
  baseURL += '/';
}

const apiSet = axios.create({
  baseURL
});

const api = {
  get: <T = any>(endpoint: string): Promise<T> =>
    apiSet.get<T>(endpoint).then((res: AxiosResponse<T>) => res.data),

  post: <T = any, B = Record<string, any>>(endpoint: string, body?: B): Promise<T> =>
    apiSet.post<T>(endpoint, body).then((res: AxiosResponse<T>) => res.data),
};

export default api;

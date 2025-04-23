import axios, { InternalAxiosRequestConfig } from 'axios';

import { getFromLocalStorage, STORAGE_KEY } from '../../utils';

const instance = axios.create({
  baseURL: '',
});

// intercept request
instance.interceptors.request.use(
  async (reqConfig: InternalAxiosRequestConfig) => {
    let { headers = {} } = reqConfig;
    // add token related info here..
    const token = await getFromLocalStorage(STORAGE_KEY.AUTH_TOKEN);
    if (!token) {
      headers = {
        ...headers,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      };
    }

    return { ...reqConfig, headers } as InternalAxiosRequestConfig;
  },
);

export default instance;

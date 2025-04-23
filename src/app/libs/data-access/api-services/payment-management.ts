/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from 'axios';

import { IRequestParamsOptions } from './types';

const API_URL = {
  CREATE_PAYMENT: `/b2b/payment-mgmt/payment/`,
  GET_PAYMENT_LIST: `/b2b/payment-mgmt/payment/?`,
};

export async function makePaymentService<R = any, D = any>(
  requestParamsOptions: IRequestParamsOptions<D>,
): Promise<AxiosResponse<R>> {
  const { api, data } = requestParamsOptions;

  try {
    const requestUrl = API_URL.CREATE_PAYMENT;
    const response = await api.post(requestUrl, data);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(error.message);
    }

    return Promise.reject(error);
  }
}

export async function getPaymentListService<R = any, D = any>(
  requestParamsOptions: IRequestParamsOptions<D>,
): Promise<AxiosResponse<R>> {
  const { api, url } = requestParamsOptions;

  try {
    const requestUrl = API_URL.GET_PAYMENT_LIST + url;
    const response = await api.get(requestUrl);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(error.message);
    }

    return Promise.reject(error);
  }
}

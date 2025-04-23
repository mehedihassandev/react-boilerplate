/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @method useAxios
 * @description Hook to use axios
 * @param {Object} axios - axios instance
 * @returns {Object} - response , loading , error & fetchData
 * (fetch data is a function to fetch data, we can use it to trigger fetch again)
 *
 * @example
 * import {useAxios} from "./path/to/useAxios";
 * const {response, isLoading, error, fetchData} = useAxios({
 *  api: instance,
 *  method: "get",
 *  url: "/users",
 * });
 *
 */

import { useCallback, useEffect, useState } from 'react';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

interface AxiosHookOptions<TData = any, TConfig = any> {
  api: AxiosInstance;
  method: keyof AxiosInstance;
  url: string;
  data?: TData;
  config?: TConfig;
}

interface AxiosHookResponse<TResponse = any, TError = any> {
  response: TResponse | null;
  error: TError | string;
  isLoading: boolean;
  fetchData: () => Promise<void>;
}

export const useAxios = <TResponseData = any, TConfig = any>(
  options: AxiosHookOptions<TConfig>,
): AxiosHookResponse<TResponseData> => {
  const { api, method, url, data = null, config = null } = options;

  const [response, setResponse] = useState<TResponseData | null>(null);
  const [error, setError] = useState<any | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const requestData: AxiosRequestConfig = {
        method,
        url,
        data: data ? JSON.parse(JSON.stringify(data)) : null,
        ...(config ? JSON.parse(JSON.stringify(config)) : {}),
      };

      const result: AxiosResponse<TResponseData> = await api.request(
        requestData,
      );

      setResponse(result.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [api, config, data, method, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, isLoading, fetchData };
};

/*Explanation:

1.We define two generic interfaces AxiosHookOptions and AxiosHookResponse. AxiosHookOptions takes two type parameters TData (for request data) and TConfig (for request configuration), which default to any.

2.The useAxios hook takes an options object with the AxiosHookOptions type, allowing us to pass typed data and config.

3.Inside the hook, we use useState with explicit types for response, error, and isLoading.

4.We define fetchData as a useCallback function with a return type of Promise<void>.

5.In the fetchData function, we construct the requestData object with the proper request data and configuration before making the axios request using api.request.

6.The response state is set with the parsed data from the axios response.

7.Errors are caught and stored in the error state if any occur.

8.The useEffect hook is used to trigger the fetchData function on component mount.

9.The hook returns the response, error, isLoading, and fetchData function as part of the AxiosHookResponse type.
*/

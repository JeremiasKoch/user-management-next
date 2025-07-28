import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';

export const axiosRequest = async <T>(
  option: AxiosRequestConfig
): Promise<T> => {
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;

    return data;
  };

  const onError = (error: AxiosError): never => {
    throw new Error(error.message);
  };

  return axiosInstance(option).then(onSuccess).catch(onError);
};

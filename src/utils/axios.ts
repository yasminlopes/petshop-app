import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const response = await axiosInstance.get(url, config);

  return response.data;
};

export const post = async (url: string, data: any) => {
  const response = await axiosInstance.post(url, data);

  return response.data;
};

export const put = async (url: string, data: any) => {
  const response = await axiosInstance.put(url, data);

  return response.data;
};

export const destroy = async (url: string, config?: AxiosRequestConfig) => {
  await axiosInstance.delete(url, config);
};
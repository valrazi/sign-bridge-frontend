import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type APIResolved<T> = (response: T) => void;
type APIRejected = (error: AxiosError) => void;

const api = <T>(payload: AxiosRequestConfig) => {
  return new Promise((resolve: APIResolved<T>, reject: APIRejected) => {
    const env = import.meta.env;
    const baseClient = axios.create({
      baseURL: env.VITE_API_URL,
      validateStatus: (status: number) => status >= 200 && status < 300,
    });

    baseClient.interceptors.request.use((config) => {
      return config;
    });

    baseClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    baseClient<T>(payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        if (error.response) {
          resolve(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

export default api;

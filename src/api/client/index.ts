import axios, { AxiosError, AxiosRequestConfig } from "axios";

type APIResolved<T> = (response: T) => void;
type APIRejected = (error: AxiosError) => void;

const api = <T>(payload: AxiosRequestConfig) => {
  return new Promise((resolve: APIResolved<T>, reject: APIRejected) => {
    const baseClient = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com",
    });

    baseClient.interceptors.request.use((config) => {
      return config;
    });

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

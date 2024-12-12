import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWS_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

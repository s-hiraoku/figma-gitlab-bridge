import { API_URL } from "@config";
import Axios, { AxiosRequestConfig } from "axios";

export type RequestConfig = Omit<AxiosRequestConfig, "url">;

export const apiClient = Axios.create({
  baseURL: API_URL,
});

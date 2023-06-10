import { AxiosRequestConfig } from "axios";

export type RequestConfig = Omit<AxiosRequestConfig, "url">;

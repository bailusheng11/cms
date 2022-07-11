import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface CLRequestInterface<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (config: any) => any
}

export interface CLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CLRequestInterface<T>
  showLoading?: boolean
}

declare module 'axios' {
  interface AxiosResponse<T = any> {
    data: T & {
      success?: boolean;
      message?: string;
      [key: string]: any;
    }
  }
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  [key: string]: any;
}
import axios, { AxiosStatic } from "axios";
import { toast } from "react-toastify";
import autobind from "autobind-decorator";
import { NavigateFunction } from "react-router-dom";

@autobind
export class AxiosInterceptor {
  public AxiosInstance: AxiosStatic = axios

  constructor(
    private readonly _navigate: NavigateFunction,
    private readonly _redirect401: boolean = true
  ) {
    this.AxiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;
    this.AxiosInstance.defaults.params = {};
    this.AxiosInstance.defaults.headers.common.Authorization = sessionStorage.getItem('app-token') ? `Bearer ${sessionStorage.getItem('app-token')}` : ''
    this.AxiosInstance.interceptors.request.use(this.handleRequestSuccess, this.handleRequestError);
    this.AxiosInstance.interceptors.response.use(this.handleResponseSuccess, this.handleResponseError);
  }

  private handleRequestSuccess(request: any) {
    return request
  }

  private handleRequestError(error: any) {
    throw error;
  }

  private handleResponseSuccess(response: any) {
    return response;
  }

  private handleResponseError(error: XMLHttpRequest) {
    console.log(error);

    switch (error.response.status) {
      case 401:
        if (this._redirect401) {
          this._navigate('/')
        }
        break;
      case 403:
        break;
      default:

    }

    toast(error.response.data, {
      type: 'error'
    })
    throw error;
  }

}
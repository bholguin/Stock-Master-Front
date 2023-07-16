import axios from "axios";
import { useEffect } from "react";


export const AxiosApi = axios.create({
  baseURL:  process.env.REACT_APP_API_URL
})

export const useAxiosConfig = () => { 

  useEffect(() => {
    AxiosApi.defaults.baseURL = process.env.REACT_APP_API_URL;
    AxiosApi.defaults.params = {};
    AxiosApi.defaults.headers.common.Authorization = sessionStorage.getItem('app-token') ? `Bearer ${sessionStorage.getItem('app-token')}` : ''
  }, [])

}
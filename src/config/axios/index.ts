import axios from "axios";
import { useEffect } from "react";

export const useAxiosConfig = () => { 

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.params = {};
    axios.defaults.headers.common.Authorization = sessionStorage.getItem('app-token') ? `Bearer ${sessionStorage.getItem('app-token')}` : ''
  }, [])

}
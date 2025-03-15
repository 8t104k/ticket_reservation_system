// api/client.js - Axiosインスタンス設定
import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT } from './config'

export const apiClient = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token){
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers
  })
};

  export const api = {
    events:{},
    reservations:{},
    profiles:{},
    collaborators:{}
  }
  
  export default apiClient
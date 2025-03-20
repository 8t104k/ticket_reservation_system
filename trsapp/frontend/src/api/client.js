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

//エンドポイント定義
export const ENDPOINTS = {
  EVENTS: {
    BASE: '/events',
    DETAIL: (token) => `/events/${token}`,
    UPDATE: (token) => `/events/${token}`,
    COLLABORATORS: (token) => `/events/${token}/collaborators`,
    EXPORT: (token, format) => `/events/${token}/export?format=${format}`
  },
  RESERVATIONS: {
    DETAIL: (id) => `/reservations/${id}`,
    INDEX: (token) => `/events/${token}/reservations`,
  },
  USERS: {
    DETAIL: (token) => `/users/${username}`
  },
}
  
  export default apiClient
// api/client.js - Axiosインスタンス設定
import axios from 'axios'

export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://production-api.com/api/v1'
  : 'http://localhost:3000/api/v1'

export const API_TIMEOUT = 30000 // 30秒

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

//エンドポイント定義
export const ENDPOINTS = {
  PROFILE: {
    BASE: '/events',
    DETAIL: (token) => `/events/${token}`,
    UPDATE: (token) => `/events/${token}`,
    COLLABORATORS: (token) => `/events/${token}/collaborators`,
    EXPORT: (token, format) => `/events/${token}/export?format=${format}`
  },
  RESERVATIONS: {
    BASE: (token) => `/events/${token}/reservations`,
  },
  COLLABORATORS: {
    BASE: (token) => `/events/${token}/collaborators`,
  },
  RESERVATIONSHARES: {
    BASE: (token) => `/events/${token}/reservation_share`,
  },
  INVITATION: {
    BASE: (details_token) => `/invite/${details_token}`
  },
  PROFILE: {
    BASE:  (username) => `/profiles/${username}`
  }
}
  
  export default apiClient
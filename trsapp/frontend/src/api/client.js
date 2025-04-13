// api/client.js - Axiosインスタンス設定
import axios from 'axios'

//export const API_BASE_URL = process.env.NODE_ENV === 'production'
//  ? 'https://production-api.com/api/v1'
//  : 'http://localhost:3000/api/v1'

//export const API_BASE_URL ={
//  production:'https://production-api.com/api/v1',
//  staging:'https://trsapp-stg.onrender.com/api/v1',
//  development: 'http://localhost:3000/api/v1'
//}[import.meta.env.MODE];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

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
  EVENT: {
    BASE: '/events',
    DETAIL: (token) => `/events/${token}`,
    UPDATE: (token) => `/events/${token}`,
    COLLABORATORS: (token) => `/events/${token}/collaborators`,
    EXPORT: (token, format) => `/events/${token}/export?format=${format}`
  },
  RESERVATION: {
    BASE: (token) => `/events/${token}/reservations`,
  },
  COLLABORATOR: {
    BASE: (token) => `/events/${token}/collaborators`,
    CURRENCLBR: (token) => `/events/${token}/current_clbr`,
  },
  RESERVATIONSHARE: {
    BASE: (token) => `/events/${token}/reservation_share`,
  },
  INVITATION: {
    BASE: (rs_token) => `/invite/${rs_token}`
  },
  PROFILE: {
    BASE:  (username) => `/profiles/${username}`
  },
  GROUP: {
    BASE: () => `/groups/`,
    DETAILS: (token) => `/groups/${token}`,
    EVENT_GROUP: (event_token) => `/events/${event_token}/group`,
    CHANGE: (event_token) => `/events/${event_token}/update_group`
  }
}
  
  export default apiClient
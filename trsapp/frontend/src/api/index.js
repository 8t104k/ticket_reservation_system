// api/index.js - メインエクスポート
import apiClient from './client'
import axios from 'axios'
import { eventService } from './services/eventService'
import { reservationService } from './services/reservationService'

// API先の設定
export const RAILS_API_BASE_URL = 'http://localhost:3000/api/v1'
export const API_TIMEOUT = 30000 // 30秒

//rails APIのクライアント
export const railsApiClient = axios.create({
  baseURL: RAILS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

railsApiClient.interceptors.request.use()


export {
  apiClient,
  eventService,
  reservationService
}
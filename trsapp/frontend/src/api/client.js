// api/client.js - Axiosインスタンス設定
import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT } from './config'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  // リクエストインターセプター
apiClient.interceptors.request.use(
    (config) => {
      // 認証トークンの追加などの共通処理
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  
  // レスポンスインターセプター
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // エラーハンドリング共通処理
      if (error.response) {
        // サーバーからのエラーレスポンス
        if (error.response.status === 401) {
          // 認証エラー時の処理
          console.log('認証エラー')
        }
      } else if (error.request) {
        // リクエストは送信されたがレスポンスがない
        console.log('ネットワークエラー')
      } else {
        // リクエスト設定時のエラー
        console.log('設定エラー')
      }
      return Promise.reject(error)
    }
  )
  
  export default apiClient
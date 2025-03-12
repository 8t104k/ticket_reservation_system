// api/client.js - Axiosインスタンス設定
import axios from 'axios'
import router from '../router'
import { useAuthStore } from '../stores/auth'
import { API_BASE_URL, API_TIMEOUT } from './config'
import { supabase } from '../lib/supabase'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  // リクエストインターセプター
apiClient.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore();
      // 認証トークンの追加などの共通処理
      //const token = localStorage.getItem('auth_token')
      const token = (supabase.auth.getSession()).data.session?.access_token
      if (token) {
        //config.headers.Authorization = `Bearer ${token}`
        //config.headers.Authorization = `Bearer ${authStore.token}`
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  );
  
  // レスポンスインターセプター
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // エラーハンドリング共通処理
      if (error.response && error.response.status == 401) {
        const authStore = useAuthStore();
        authStore.logout();
        router.push('/login');
      } else if (error.request) {
        // リクエストは送信されたがレスポンスがない
        console.log('ネットワークエラー')
      } else {
        // リクエスト設定時のエラー
        console.log('設定エラー')
      }
      return Promise.reject(error)
    }
  );

  export const api = {
    events:{},
    reservations:{},
    profiles:{},
    collaborators:{}
  }
  
  export default apiClient
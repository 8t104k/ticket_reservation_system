// api/config.js - 基本設定
export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://production-api.com/api/v1'
  : 'http://localhost:3000/api/v1'

export const API_TIMEOUT = 30000 // 30秒
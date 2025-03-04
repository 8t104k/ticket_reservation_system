// api/services/eventService.js - イベント関連API
import apiClient from '../client'
import { ENDPOINTS } from '../endpoints'

export const eventService = {
  // イベント情報を取得
  getEvent(token) {
    return apiClient.get(ENDPOINTS.EVENTS.DETAIL(token))
  },
  
  // イベント情報を更新
  updateEvent(token, eventData) {
    return apiClient.put(ENDPOINTS.EVENTS.DETAIL(token), eventData)
  },
  
  // イベントの予約一覧を取得
  getEventReservations(token) {
    return apiClient.get(ENDPOINTS.EVENTS.RESERVATIONS(token))
  },
  
  // イベントの共演者一覧を取得
  getEventCollaborators(token) {
    return apiClient.get(ENDPOINTS.EVENTS.COLLABORATORS(token))
  },
  
  // イベントデータをエクスポート
  exportEventData(token, format, options = {}) {
    return apiClient.get(ENDPOINTS.EVENTS.EXPORT(token, format), {
      params: options,
      responseType: 'blob'
    })
  }
}
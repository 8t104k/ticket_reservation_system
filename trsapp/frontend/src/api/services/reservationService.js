// api/services/reservationService.js - 予約関連API
import apiClient from '../client'
import { ENDPOINTS } from '../old/endpoints'

export const reservationService = {
  // 新規予約を作成
  createReservation(eventToken, reservationData) {
    return apiClient.post(ENDPOINTS.EVENTS.RESERVATIONS(eventToken), reservationData)
  },
  
  // 予約情報を更新
  updateReservation(id, reservationData) {
    return apiClient.put(ENDPOINTS.RESERVATIONS.DETAIL(id), reservationData)
  },
  
  // 予約を削除
  deleteReservation(id) {
    return apiClient.delete(ENDPOINTS.RESERVATIONS.DETAIL(id))
  }
}
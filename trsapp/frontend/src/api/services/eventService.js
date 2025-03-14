// api/services/eventService.js - イベント関連API
import apiClient from '../client'
import { ENDPOINTS } from '../endpoints'
import { supabase } from '../../lib/supabase'

export const eventService = {
  // イベント情報を取得
  async getEventDetails(eventToken) {
    //const authToken = localStorage.getItem("session")
    const {data} = await supabase.auth.getSession()
    const authToken = data.session.access_token
    return apiClient(authToken).get(ENDPOINTS.EVENTS.DETAIL(eventToken))
  },
  
  // イベント情報を更新
  //updateEvent(eventToken, eventData) {
  //  return apiClient.put(ENDPOINTS.EVENTS.DETAIL(eventToken), eventData)
  //},
  
  // イベントの予約一覧を取得
  getEventReservations(eventToken) {
    return apiClient(authToken).get(ENDPOINTS.EVENTS.RESERVATIONS(eventToken))
  },
  
  // イベントの共演者一覧を取得
  getEventCollaborators(eventToken) {
    return apiClient(authToken).get(ENDPOINTS.EVENTS.COLLABORATORS(eventToken))
  },
  
  // イベントデータをエクスポート
  //exportEventData(eventToken, format, options = {}) {
  //  return apiClient.get(ENDPOINTS.EVENTS.EXPORT(eventToken, format), {
  //    params: options,
  //    responseType: 'blob'
  //  })
  //}
}
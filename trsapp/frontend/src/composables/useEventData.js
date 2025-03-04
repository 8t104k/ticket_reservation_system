// composables/useEventData.js
import { ref } from 'vue'
import { eventService } from '../api'

/**
 * イベント情報を取得・管理するためのComposable
 * @returns {Object} イベントデータと関連メソッド
 */
export function useEventData() {
  // 状態の定義
  const event = ref({})
  const loading = ref(true)
  const error = ref(false)
  const errorMessage = ref('')

  /**
   * イベント情報を取得
   * @param {string} token イベントのトークン
   */
  const fetchEvent = async (token) => {
    loading.value = true
    error.value = false
    errorMessage.value = ''
    
    try {
      const response = await eventService.getEvent(token)
      event.value = response.data
      return response.data
    } catch (err) {
      console.error('Error fetching event data:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || 'イベント情報の取得に失敗しました'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * イベント情報を更新
   * @param {string} token イベントのトークン
   * @param {Object} eventData 更新するイベントデータ
   */
  const updateEvent = async (token, eventData) => {
    loading.value = true
    error.value = false
    errorMessage.value = ''
    
    try {
      const response = await eventService.updateEvent(token, eventData)
      event.value = response.data
      return response.data
    } catch (err) {
      console.error('Error updating event:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || 'イベント情報の更新に失敗しました'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    event,
    loading,
    error,
    errorMessage,
    fetchEvent,
    updateEvent
  }
}


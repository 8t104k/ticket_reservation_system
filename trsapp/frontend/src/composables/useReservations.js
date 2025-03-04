// composables/useReservations.js
import { ref, computed } from 'vue'
import { eventService, reservationService } from '../api'

/**
 * 予約データを取得・管理するためのComposable
 * @returns {Object} 予約データと関連メソッド
 */
export function useReservations() {
  // 状態の定義
  const reservations = ref([])
  const loading = ref(true)
  const error = ref(false)
  const errorMessage = ref('')
  
  // 計算プロパティ
  const reservationCount = computed(() => {
    return reservations.value.reduce((total, reservation) => {
      return total + parseInt(reservation.quantity || 0)
    }, 0)
  })

  /**
   * イベントの予約一覧を取得
   * @param {string} eventToken イベントのトークン
   * @param {boolean} useDummyData 取得失敗時にダミーデータを使用するかどうか
   */
  const fetchReservations = async (eventToken, useDummyData = false) => {
    loading.value = true
    error.value = false
    errorMessage.value = ''
    
    try {
      const response = await eventService.getEventReservations(eventToken)
      reservations.value = response.data
      return response.data
    } catch (err) {
      console.error('Error fetching reservations:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || '予約データの取得に失敗しました'
      
      // 開発用のダミーデータ（オプション）
      if (useDummyData && process.env.NODE_ENV !== 'production') {
        reservations.value = [
          {
            id: 1,
            name: '山田 太郎',
            quantity: 2,
            reservationDate: '2025-06-10',
            notes: '車椅子席希望'
          },
          {
            id: 2,
            name: '佐藤 花子',
            quantity: 4,
            reservationDate: '2025-06-12',
            notes: ''
          }
        ]
      }
      
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * 新規予約を作成
   * @param {string} eventToken イベントのトークン
   * @param {Object} reservationData 予約データ
   */
  const createReservation = async (eventToken, reservationData) => {
    try {
      const response = await reservationService.createReservation(eventToken, reservationData)
      reservations.value.push(response.data)
      return response.data
    } catch (err) {
      console.error('Error creating reservation:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || '予約の作成に失敗しました'
      throw err
    }
  }

  /**
   * 予約情報を更新
   * @param {number} id 予約ID
   * @param {Object} reservationData 更新する予約データ
   */
  const updateReservation = async (id, reservationData) => {
    try {
      const response = await reservationService.updateReservation(id, reservationData)
      
      // 予約リストの更新
      const index = reservations.value.findIndex(r => r.id === id)
      if (index !== -1) {
        reservations.value[index] = response.data
      }
      
      return response.data
    } catch (err) {
      console.error('Error updating reservation:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || '予約の更新に失敗しました'
      throw err
    }
  }

  /**
   * 予約を削除
   * @param {number} id 予約ID
   */
  const deleteReservation = async (id) => {
    try {
      await reservationService.deleteReservation(id)
      
      // 予約リストから削除
      const index = reservations.value.findIndex(r => r.id === id)
      if (index !== -1) {
        reservations.value.splice(index, 1)
      }
      
      return true
    } catch (err) {
      console.error('Error deleting reservation:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || '予約の削除に失敗しました'
      throw err
    }
  }

  return {
    reservations,
    loading,
    error,
    errorMessage,
    reservationCount,
    fetchReservations,
    createReservation,
    updateReservation,
    deleteReservation
  }
}


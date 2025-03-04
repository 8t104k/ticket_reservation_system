// composables/useEvents.js
import { ref } from 'vue'
import axios from 'axios'

/**
 * イベント一覧を取得・管理するためのComposable
 * @returns {Object} イベント一覧データと関連メソッド
 */
export function useEvents() {
  // 状態の定義
  const events = ref([])
  const loading = ref(true)
  const error = ref(false)
  const errorMessage = ref('')

  /**
   * イベント一覧を取得
   * @param {boolean} useDummyData 取得失敗時にダミーデータを使用するかどうか
   */
  const fetchEvents = async (useDummyData = false) => {
    loading.value = true
    error.value = false
    errorMessage.value = ''
    
    try {
      const response = await axios.get('http://localhost:3000/api/v1/events')
      events.value = response.data
      return response.data
    } catch (err) {
      console.error('Error fetching events:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || 'イベント一覧の取得に失敗しました'
      
      // 開発用のダミーデータ（オプション）
      if (useDummyData && process.env.NODE_ENV !== 'production') {
        events.value = [
          {
            id: 1,
            event_name: 'サマーフェスティバル2025',
            event_date: '2025-07-15',
            status: 1
          },
          {
            id: 2,
            event_name: 'ウィンターコンサート2025',
            event_date: '2025-12-20',
            status: 0
          },
          {
            id: 3,
            event_name: 'スプリングライブ2025',
            event_date: '2025-04-10',
            status: 2
          }
        ]
      }
      
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    loading,
    error,
    errorMessage,
    fetchEvents
  }
}

/**
 * 日付フォーマットのためのComposable
 */
export function useFormatters() {
    /**
     * 日付をフォーマット
     * @param {string|Date} date フォーマットする日付
     * @return {string} フォーマットされた日付文字列
     */
    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleString('ja-JP')
    }
  
    /**
     * ステータスの表示テキストを取得
     * @param {number} status ステータスコード
     * @return {string} ステータスの表示テキスト
     */
    const getStatusText = (status) => {
      const statusMap = {
        0: '準備中',
        1: '開催中',
        2: '終了'
      }
      return statusMap[status] || '不明'
    }
  
    /**
     * ステータスの表示色を取得
     * @param {number} status ステータスコード
     * @return {string} ステータスの表示色
     */
    const getStatusColor = (status) => {
      const colorMap = {
        0: 'orange',
        1: 'green',
        2: 'grey'
      }
      return colorMap[status] || 'black'
    }
  
    return {
      formatDate,
      getStatusText,
      getStatusColor
    }
  }
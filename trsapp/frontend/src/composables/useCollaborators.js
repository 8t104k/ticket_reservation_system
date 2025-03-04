// composables/useCollaborators.js
import { ref } from 'vue'
import { eventService } from '../api'

/**
 * 共演者データを取得・管理するためのComposable
 * @returns {Object} 共演者データと関連メソッド
 */
export function useCollaborators() {
  // 状態の定義
  const collaborators = ref([])
  const loading = ref(true)
  const error = ref(false)
  const errorMessage = ref('')

  /**
   * イベントの共演者一覧を取得
   * @param {string} eventToken イベントのトークン
   * @param {boolean} useDummyData 取得失敗時にダミーデータを使用するかどうか
   */
  const fetchCollaborators = async (eventToken, useDummyData = false) => {
    loading.value = true
    error.value = false
    errorMessage.value = ''
    
    try {
      const response = await eventService.getEventCollaborators(eventToken)
      collaborators.value = response.data
      return response.data
    } catch (err) {
      console.error('Error fetching collaborators:', err)
      error.value = true
      errorMessage.value = err.response?.data?.message || '共演者データの取得に失敗しました'
      
      // 開発用のダミーデータ（オプション）
      if (useDummyData && process.env.NODE_ENV !== 'production') {
        collaborators.value = [
          { name: '田中 優', role: '主催者' },
          { name: '高橋 誠', role: '共同主催者' }
        ]
      }
      
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    collaborators,
    loading,
    error,
    errorMessage,
    fetchCollaborators
  }
}
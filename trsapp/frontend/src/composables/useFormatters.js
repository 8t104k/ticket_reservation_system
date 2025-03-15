
//日付フォーマット
export function useFormatters() {
    /**
     * 日付をフォーマット
     * @param {string|Date} date フォーマットする日付
     * @return {string} フォーマットされた日付文字列
     */
    const formatDate = (date) => {
        const options = { 
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric'
            };
        if (!date) return ''
        return new Date(date).toLocaleString('ja-JP',options)
    }
  
    const getStatusText = (status) => {
      const statusMap = {
        0: '準備中',
        1: '開催中',
        2: '終了'
      }
      return statusMap[status] || '不明'
    }
  
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

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
        draft: '準備中',
        open: '公開中',
        close: '公開終了'
      }
      return statusMap[status] || '不明'
    }
  
    const getStatusColor = (status) => {
      const colorMap = {
        "draft": 'orange',
        "open": 'green',
        "close": 'grey'
      }
      return colorMap[status] || 'black'
    }
  
    return {
      formatDate,
      getStatusText,
      getStatusColor
    }
  }
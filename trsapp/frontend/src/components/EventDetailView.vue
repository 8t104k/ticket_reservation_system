<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

// データの定義
const event = ref([])
const loading = ref(true)
const route = useRoute()

// マウント時の処理
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/events/${route.params.token}`)
    event.value = response.data
  } catch (error) {
    console.error('Error fetching events:', error)
  } finally {
    loading.value = false
  }
})

// メソッドの定義
const formatDate = (date) => {
  return new Date(date).toLocaleString('ja-JP')
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
</script>

<template>
    <h1>{{ event.event_name }}</h1>
    
    <v-card></v-card>
</template>
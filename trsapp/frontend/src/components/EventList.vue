<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEvents, useFormatters } from '../composables/useEvents'

// Composablesを使用
const { events, loading, error, errorMessage, fetchEvents } = useEvents()
const { formatDate, getStatusText, getStatusColor } = useFormatters()

// 検索用の状態
const search = ref('')

// 検索結果のフィルタリング
const filteredEvents = computed(() => {
  if (!search.value) return events.value
  
  const searchTerm = search.value.toLowerCase()
  return events.value.filter(event => {
    return (
      event.event_name.toLowerCase().includes(searchTerm) ||
      formatDate(event.event_date).includes(searchTerm) ||
      getStatusText(event.status).toLowerCase().includes(searchTerm)
    )
  })
})

// マウント時にデータを取得
onMounted(async () => {
  try {
    await fetchEvents(true) // 第1引数はダミーデータを使用するかどうか
  } catch (error) {
    console.error('コンポーネントレベルのエラー:', error)
  }
})

// イベント詳細ページに遷移 - トークンを使用
const navigateToEvent = (eventToken) => {
  // Vue Routerを使用して遷移
  // （Vue Routerが設定されていれば）
  // router.push(`/events/${eventToken}`)
  
  // リンクで移動する場合（仮実装）
  window.location.href = `/events/${eventToken}`
}
</script>

<template>
  <v-card>
    <v-card-title>
      イベント一覧
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="検索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <!-- ローディング表示 -->
    <div v-if="loading" class="d-flex justify-center align-center pa-4">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </div>
    
    <!-- エラー表示 -->
    <v-alert v-else-if="error" type="error" class="ma-4">
      {{ errorMessage }}
      <v-btn text color="error" @click="fetchEvents(true)">再読み込み</v-btn>
    </v-alert>
    
    <!-- イベント一覧表示 -->
    <div v-else class="pa-4">
      <!-- 検索結果がない場合 -->
      <v-alert
        v-if="filteredEvents.length === 0"
        type="info"
        class="mb-4"
      >
        検索条件に一致するイベントはありません
      </v-alert>
      
      <!-- イベントカード -->
      <v-card
        v-for="event in filteredEvents"
        :key="event.id"
        class="mb-4"
        @click="navigateToEvent(event.token)"
        elevation="2"
        hover
      >
        <v-card-title>{{ event.event_name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="d-flex align-center">
                <v-icon small class="mr-1">mdi-calendar</v-icon>
                開催日: {{ formatDate(event.event_date) }}
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-end">
              <v-chip
                :color="getStatusColor(event.status)"
                text-color="white"
              >
                {{ getStatusText(event.status) }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <!-- 新規イベント作成ボタン（管理者向け） -->
      <v-btn
        color="primary"
        class="mt-4"
        prepend-icon="mdi-plus"
      >
        新規イベント作成
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.v-card:hover {
  cursor: pointer;
  transform: translateY(-2px);
  transition: all 0.2s ease-in-out;
}
</style>
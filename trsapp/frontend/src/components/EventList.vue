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
    <!-- イベント一覧 -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else>
      <v-card
        v-for="event in events"
        :key="event.id"
        class="mb-4"
      >
        <v-card-title>{{ event.event_name }}</v-card-title>
        <v-card-text>
          <div>
            開催日: {{ formatDate(event.event_date) }}
            <v-chip
            :color="getStatusColor(event.status)"
            >
            {{ getStatusText(event.status) }}
            </v-chip>
          </div>

        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      events: [],
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/events')
      this.events = response.data
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('ja-JP')
    },
    getStatusText(status) {
      const statusMap = {
        0: '準備中',
        1: '開催中',
        2: '終了'
      }
      return statusMap[status] || '不明'
    },
    getStatusColor(status) {
      const colorMap = {
        0: 'orange',
        1: 'green',
        2: 'grey'
      }
      return colorMap[status] || 'black'
    }
  }
}
</script>
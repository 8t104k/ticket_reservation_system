<script setup>
import { ref } from 'vue'

const events = ref([
  {
    event_id: 1,
    event_name: 'テストイベント１',
    event_date: '2025-05-15T09:00:00',
    status: '準備中',
  },
  {
    event_id: 2,
    event_name: 'テストイベント2',
    event_date: '2025-05-15T09:00:00',
    status: '準備中',
  },
  {
    event_id: 3,
    event_name: 'テストイベント3',
    event_date: '2025-05-15T09:00:00',
    status: '準備中',
  }
]
)
</script>

<template>
<v-row>
  <v-col cols="12" md="4">
    <v-card class="mb-4">
      <v-card-title class="text-h6 d-flex align-center">未処理の申請</v-card-title>
      <v-spacer></v-spacer>
    </v-card>
    <v-card class="mb-4">
      <v-card-title class="text-h6 d-flex align-center">アクティビティ</v-card-title>
      <v-spacer></v-spacer>
    </v-card>
  </v-col>
  <v-col cols="12" md="8">
    <v-card >
      <v-card-title class="text-h6 d-flex align-center">参加イベント</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
          v-for="(event, i) in events"
          cols="12" sm="6" md="4">
            <v-card class="d-flex justify-space-between">
              <div class="ma-2 pa-2">
                <v-card-title class="d-flex align-center">{{ event.event_name }}</v-card-title>
                <v-card-subtitle class="d-flex align-center">{{ event.event_date }}</v-card-subtitle>
              </div>
              <div class="d-flex align-center ma-2 pa-2">
                <v-chip>{{ event.status }}</v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>


</template>
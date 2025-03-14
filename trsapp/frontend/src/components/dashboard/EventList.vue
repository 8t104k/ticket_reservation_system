<script setup>
import { ref } from 'vue'
import { useFormatters } from '../../composables/useFormatters';
import { eventService} from '../../api';

const testEvents = ref([
 {
  "created_at": "2025-02-20T11:24:39.44015Z",
  "event_date": "2025-03-15T13:00:00Z",
  "event_name": "Ruby開発者会議2025",
  "id": 1,
  "status": 0,
  "token": "gxhqn1vF7ME",
  "updated_at": "2025-02-20T11:24:39.44015Z"
 },
 {
  "created_at": "2025-02-20T11:24:39.480714Z",
  "event_date": "2025-04-20T10:30:00Z",
  "event_name": "Railsワークショップ",
  "id": 2,
  "status": 1,
  "token": "gHDoj9DuSt4",
  "updated_at": "2025-02-20T11:24:39.480714Z"
 },
 {
  "created_at": "2025-02-20T11:24:39.483623Z",
  "event_date": "2025-05-01T15:00:00Z",
  "event_name": "プログラミング初心者向けセミナー",
  "id": 3,
  "status": 2,
  "token": "VI2tGb_uOvs",
  "updated_at": "2025-02-20T11:24:39.483623Z"
 },
 {
  "created_at": "2025-02-20T11:24:39.485437Z",
  "event_date": "2025-06-10T09:00:00Z",
  "event_name": "テックカンファレンス2025",
  "id": 4,
  "status": 0,
  "token": "uNtxxsEtKsk",
  "updated_at": "2025-02-20T11:24:39.485437Z"
 },
 {
  "created_at": "2025-02-20T11:24:39.487083Z",
  "event_date": "2025-07-05T14:00:00Z",
  "event_name": "アジャイル開発実践講座",
  "id": 5,
  "status": 1,
  "token": "MglbiK5XtmI",
  "updated_at": "2025-02-20T11:24:39.487083Z"
 },
 {
  "created_at": "2025-02-26T17:09:23.790226Z",
  "event_date": "2025-03-15T18:00:00Z",
  "event_name": "BACK HORN 20周年アニバーサリーライブ",
  "id": 6,
  "status": 0,
  "token": "KtQVf5xHTds",
  "updated_at": "2025-02-26T17:09:23.790226Z"
 },
 {
  "created_at": "2025-02-26T17:09:23.802189Z",
  "event_date": "2025-04-20T17:30:00Z",
  "event_name": "YOASOBI 2025春ツアー",
  "id": 7,
  "status": 1,
  "token": "or1XMkFK6_U",
  "updated_at": "2025-02-26T17:09:23.802189Z"
 },
 {
  "created_at": "2025-02-26T17:09:23.805422Z",
  "event_date": "2025-05-01T19:00:00Z",
  "event_name": "星野源 POP VIRUS",
  "id": 8,
  "status": 2,
  "token": "iyzRCp0P-uo",
  "updated_at": "2025-02-26T17:09:23.805422Z"
 },
 {
  "created_at": "2025-02-26T17:09:23.808772Z",
  "event_date": "2025-08-16T10:00:00Z",
  "event_name": "サマーソニック2025",
  "id": 9,
  "status": 0,
  "token": "frpAOo_RIZE",
  "updated_at": "2025-02-26T17:09:23.808772Z"
 },
 {
  "created_at": "2025-02-26T17:09:23.813474Z",
  "event_date": "2025-06-05T18:30:00Z",
  "event_name": "あいみょん 全国ホールツアー",
  "id": 10,
  "status": 1,
  "token": "0XZ56KrsiFA",
  "updated_at": "2025-02-26T17:09:23.813474Z"
 },
 {
  "created_at": "2025-02-26T17:09:23.816598Z",
  "event_date": "2025-07-12T17:00:00Z",
  "event_name": "King Gnu アリーナライブ",
  "id": 11,
  "status": 0,
  "token": "WPvuOv6RkdQ",
  "updated_at": "2025-02-26T17:09:23.816598Z"
 }]
)
const format = useFormatters();

function toEventDetail(eventToken){
    eventService.getEvent(eventToken)
}

const emit = defineEmits(['toDashboard'])

function selectComponent(compName){
    emit('toDashboard', compName);
}

</script>

<template>
<v-row>
  <v-col cols="12" md="2">
    <v-card class="mb-4">
      <v-card-title class="text-h6 d-flex align-center">未処理の申請</v-card-title>
      <v-spacer></v-spacer>
    </v-card>
    <v-card class="mb-4">
      <v-card-title class="text-h6 d-flex align-center">アクティビティ</v-card-title>
      <v-spacer></v-spacer>
    </v-card>
  </v-col>
  <v-col cols="12" md="10">
    <v-card class="mb-4">
      <div class="d-flex justify-space-between align-center">
          <v-card-title class="text-h6">参加イベント</v-card-title>
          <v-btn prepend-icon="mdi-plus-outline" variant="tonal" color="primary">イベント作成</v-btn>
      </div>

      <!--イベント表示カード-->
      <v-list class="mb-4 px-2">
          <v-list-item 
          v-for="(event, i) in testEvents"
          :key="i"
          hover
          class="my-2"
          variant="outlined"
          rounded="xl"
          @click="selectComponent('detail'), toEventDetail(event.token)"
          >
          <div class="d-flex align-center justify-space-between">
            <div class="ma-2 overflow-x-hidden">
                <div class="d-flex align-center text-truncate font-weight-bold">{{ event.event_name }}</div>
                <div class="d-flex align-center">{{ format.formatDate(event.event_date) }}</div>
            </div>
            <div class="ma-4">
                <v-chip
                    :color="format.getStatusColor(event.status)"
                    size="small"
                    variant="elevated"
                    class="font-weight-bold"
                    
                >
                    {{ format.getStatusText(event.status) }}
                </v-chip>
          </div>
            </div>
          </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</v-row>


</template>
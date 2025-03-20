<script setup>
import { ref, onMounted } from 'vue'
import { useEventStore } from '../stores/event';
import { useUiStore, useDialogStore } from '../stores/uiSetting';
import { useFormatters } from '../composables/useFormatters';
import router from '../router';
import Dialog from './dialog/Dialog.vue';

const format = useFormatters();
const eventStore = useEventStore();
const dialogStore = useDialogStore();
const loading = ref(true);

//ダイアログ
const newEvent = "newEvent"
const eventParams = "eventParams"

//マウント時の処理
onMounted(async() => {
    loading.value = true;
    try {
        await eventStore.getMyEvents();
    } catch(error){
        ui.showMessage('イベント情報の取得に失敗しました😣','error')
    }finally{
        loading.value = false;
    }
})

async function toEventDetail(eventToken){
  router.push({name: 'EventDetail', params: {token: eventToken}})
  await eventStore.getEventDetails(eventToken);
}

</script>

<template>
<v-row>
  <v-col cols="12" md="2">
    <v-row>
        <v-col cols="6" md="12">
            <v-card class="d-flex align-center mb-4">
                <v-icon left class="ml-4">mdi-email-fast-outline</v-icon>
                <v-card-title class="">申請</v-card-title>
            </v-card>
        </v-col>
        <v-col cols="6" md="12">
            <v-card class="d-flex align-center mb-4">
                <v-icon left class="ml-4">mdi-chat-processing-outline</v-icon>
                <v-card-title class="d-flex align-center">アクティビティ</v-card-title>
            </v-card>
        </v-col>
    </v-row>
  </v-col>

  <v-col cols="12" md="10">
    <v-card class="mb-4">
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
            <v-icon left class="ml-4">mdi-flag-outline</v-icon>
            <v-card-title class="text-h6">参加イベント</v-card-title>
        </div>
        <v-btn
          class="mx-4"
          prepend-icon="mdi-plus-thick"
          variant="tonal"
          color="primary"
          @click="dialogStore.showDialog('newEvent')"
          >
            イベント作成
          </v-btn>
      </div>

      <!--イベント表示カード-->
      <v-list class="mb-4 px-2">
          <v-list-item 
          v-for="(event, i) in eventStore.myEvents"
          :key="i"
          hover
          class="my-2"
          variant="outlined"
          rounded="xl"
          @click="toEventDetail(event.token)"
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


  <!-- デバッグよう 
  <v-btn @click="switchView">テスト</v-btn>
  <div>{{ childComponent == 'list' }}</div>
  <div >子コンポーネント：{{ childComponent }}</div>
  <div> event store: {{ eventStore.details }}</div> 

  <Transition :name="childComponent.transition" mode="out-in">
    <EventList v-if="childComponent.component=='list'" @toDashboard="changeComp"></EventList>
    <EventDetail v-else-if="childComponent.component=='detail'" @toDashboard="changeComp"></EventDetail>
  </Transition>-->
  <v-dialog v-model="dialogStore.dialogs[newEvent].show">
    <Dialog dialog=newEvent :params-name="eventParams"/>
  </v-dialog>
</template>

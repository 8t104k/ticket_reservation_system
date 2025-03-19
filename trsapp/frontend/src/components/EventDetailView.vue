<script setup>
import { ref, onMounted, computed } from 'vue'
import router from '../router';
import { useFormatters } from '../composables/useFormatters';
import { useEventStore } from '../stores/event';
import { useUiStore, useDialogStore } from '../stores/uiSetting';
import { useRoute } from 'vue-router'
import reservationWindow from './tab/reservationWindow.vue';
import collaboratorsWindow from './tab/collaboratorsWindow.vue';
import Dialog from './dialog/Dialog.vue';

const event = useEventStore();
const dialogStore = useDialogStore();
const format = useFormatters();
const ui = useUiStore();
const route = useRoute();
const loading = ref(true);

//マウント時の処理
onMounted(async() => {
    loading.value = true;
    try {
        await event.getEventDetails(route.params.token);
    } catch(error){
        ui.showMessage('イベント情報の取得に失敗しました😣','error')
    }finally{
        loading.value = false;
    }
})

const backList = () => {router.push({name:'events'})}
const activeTab = ref('1')
const search = ref('')
const collaboratorSearch = ref('')
const editEventDialog = "editEvent"

</script>
<template>
<v-card>
    <!--カードヘッダー-->
    <v-btn 
    class="d-flex align-top"
    prepend-icon="mdi-arrow-left-circle"
    color="primary"
    variant="tonal"
    @click="backList"
    small
    >一覧に戻る</v-btn>
    <v-card-title class="d-flex justify-space-between">
        イベント情報
        <v-btn
            color="primary"
            small
            @click="dialogStore.showDialog(editEventDialog)"
            >
            <v-icon left>mdi-pencil</v-icon>編集
        </v-btn>
    </v-card-title>
    <div v-if="loading">
        <v-progress-linear color="primary" indeterminate></v-progress-linear>
    </div>
    <div v-else-if="event.details">
        <v-card-text>
            <!--イベント情報-->
            <v-row class="mb-4">
                <v-col cols="12" class="d-flex justify-space-evenly align-center">
                    <div>
                        <div class="text-subtitle-1 font-weight-bold">イベント名</div>
                        <div>{{ event.details.event_name }}</div>
                    </div>
                    <div>
                        <v-chip
                        :color="format.getStatusColor(event.details.status)"
                        text-color="white"
                        small
                        >
                            {{ format.getStatusText(event.details.status) }}
                        </v-chip>
                    </div>
                </v-col>

                <v-col cols="6" md="4">
                    <div class="text-subtitle-1 font-weight-bold">開催日</div>
                    <div>
                        <v-icon small class="mr-1">mdi-calendar</v-icon>
                        {{ event.details.event_date }}
                    </div>
                </v-col>

                <v-col cols="6" md="4">
                    <div class="text-subtitle-1 font-weight-bold">開始時刻</div>
                    <div>
                        <v-icon small class="mr-1">mdi-clock-time-five</v-icon>
                        {{ event.details.event_date }}
                    </div>
                </v-col>
                <v-col cols="6" md="2">
                    <div class="text-subtitle-1 font-weight-bold">予約数</div>
                    <div>reservationCount人</div>
                </v-col>
                <v-col cols="6" md="2">
                    <div class="text-subtitle-1 font-weight-bold">場所</div>
                    <div>
                        <v-icon small class="mr-1">mdi-map-marker</v-icon>
                        {{ event.details.location || '-' }}
                    </div>
                </v-col>
            </v-row>
        <v-divider></v-divider>
        <!--付随情報-->
        <v-card class="my-4">
            <!-- タブ切り替え -->
            <v-tabs
                v-model="activeTab"
                bg-color="secondary"
                dark
                fixed-tabs
                >
                    <v-tab value="1">
                        <v-icon>mdi-ticket</v-icon>
                        <span class="d-none d-sm-flex">予約一覧</span>
                    </v-tab>
                    <v-tab value="2">
                        <v-icon>mdi-account-group</v-icon>
                        <span class="d-none d-sm-flex">共演者一覧</span>
                    </v-tab>
            </v-tabs>
            <!--タブウィンドウ-->
            <v-window v-model="activeTab">
                <!-- 予約一覧タブ -->
                <v-window-item value="1">
                    <reservationWindow />
                </v-window-item>

                <!-- 共演者一覧タブ -->
                <v-window-item value="2">
                    <collaboratorsWindow />
                </v-window-item>
                </v-window>
    </v-card>
        </v-card-text>
    </div>
</v-card>

<v-dialog v-model="dialogStore.dialogs[editEventDialog].show">
    <Dialog :dialog="editEventDialog" :store="event.details"/>
  </v-dialog>
<!--
-->
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import router from '../router';
import { useFormatters } from '../composables/useFormatters';
import { useRoute } from 'vue-router'
import reservationWindow from './tab/reservationWindow.vue';
import collaboratorsWindow from './tab/collaboratorsWindow.vue';
import Dialog from './dialog/Dialog.vue';
import { useStores } from '../stores';

//storeの設定
const { event, reservation, collaborator,reservationShare, ui, dialog } = useStores()

//マウント時の処理
onMounted(async() => {
    loading.value = true;
    try {
        await event.getEventDetails(route.params.token);
        await reservation.getReservations(route.params.token);
        await collaborator.getCollaborators(route.params.token);
        await reservationShare.getReservationShare(route.params.token)
    } catch(error){
        ui.showMessage('イベント情報の取得に失敗しました😣','error')
    }finally{
        loading.value = false;
    }
})

const format = useFormatters();
const route = useRoute();
const loading = ref(true);
const backList = () => {router.push({name:'events'})}

//たぶまわり
const activeTab = ref('1')
//タブを移動した時に一番上まで戻ってしまうので、見ていた場所に戻す
const scrollToPosition = () => {
    const y =window.scrollY
    setTimeout(()=>{window.scrollTo({top: y,behavior: 'smooth'})},1)
}

//ダイアログ周り
const editEventDialog = "editEvent"
const eventParams = "eventParams"

</script>

<template>
    <v-btn 
    class="d-flex align-top mt-4"
    prepend-icon="mdi-arrow-left-circle"
    color="primary"
    variant="text"
    @click="backList"
    small
    >一覧に戻る</v-btn>


    <v-card class="ma-4">
        <!--カードヘッダー-->
        <v-card-title class="d-flex justify-space-between">
            イベント情報
            <v-btn
                color="primary"
                small
                @click="dialog.showDialog(editEventDialog)"
                >
                <v-icon left>mdi-pencil</v-icon>編集
            </v-btn>
        </v-card-title>
    
        <!-- 全体 -->
        <div v-if="loading">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
        </div>
        <div v-else-if="event.details">
            <v-card-text>
                <!--イベント情報-->
                <v-row class="mb-4">
                    <v-col cols="12" class="d-flex justify-space-evenly align-center">
                        <div class="text-h6 text-md-h4 font-weight-bold">{{ event.details.event_name }}</div>
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
            </v-card-text>
        </div>
    </v-card>
    <v-divider></v-divider>
    <!--付随情報-->
    <div v-if="loading">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>

    <div v-else-if="event.details" class="ma-4">
        <v-tabs
            v-model="activeTab"
            @update:model-value="scrollToPosition"
            align-tabs="start"
            color="primary"
            >
                <v-tab value="1">
                    <v-icon>mdi-ticket</v-icon>
                    <span>予約一覧</span>
                </v-tab>
                <v-tab value="2">
                    <v-icon>mdi-account-group</v-icon>
                    <span>共演者一覧</span>
                </v-tab>
        </v-tabs>
    
        <!--タブウィンドウ-->
        <v-window v-model="activeTab" :touch="false">
            <!-- 予約一覧タブ -->
            <v-window-item value="1" eager>
                <keep-alive>
                    <reservationWindow :reservations="reservation.all"/>
                </keep-alive>
            </v-window-item>
    
            <!-- 共演者一覧タブ -->
            <v-window-item value="2" eager>
                <keep-alive>
                    <collaboratorsWindow :collaborators="collaborator.all"/>                    
                </keep-alive>
            </v-window-item>
            </v-window>

    </div>
    <v-card v-else-if="event.details" class="my-4">
        <!-- タブ切り替え -->
        <v-card-text>
        </v-card-text>
    </v-card>

    <v-dialog v-model="dialog.all[editEventDialog].show">
        <Dialog :dialog="editEventDialog" :store="event.details" :params-name="eventParams"/>
    </v-dialog>
<!--
-->
</template>
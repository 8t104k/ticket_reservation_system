<script setup>
import { ref, reactive,computed } from 'vue';
import { useFormatters } from '../../composables/useFormatters';
import { useDialogStore } from '../../stores/uiSetting';
import { useEventStore } from '../../stores/event';
import { useReservationStore } from '../../stores/reservations';
import { useReservationShareStore } from '../../stores/reservationShares';
import { useUiStore } from '../../stores/uiSetting';
import { useRoute } from 'vue-router'
import Dialog from '../dialog/Dialog.vue';


const stores = {
    event: useEventStore(),
    reservation: useReservationStore(),
    dialog: useDialogStore(),
    reservationShare: useReservationShareStore(),
    ui: useUiStore(),
}
const format = useFormatters();
const props = defineProps(['reservations']);
const route = useRoute()
const newReserve = "newReserve"
const filters = reactive({
    sortBy: "",
    sameDay: "",
})

const copyShareUrlToClipboard = () => {
    if (stores.reservationShare.details?.token) {
        navigator.clipboard.writeText(stores.reservationShare?.details.token);
        stores.ui.showMessage("Copy☀️","success")
    }
}

const createShareUrl = () => {
    stores.reservationShare.createReservationShare(route.params.token)
}

const search = ref('')

const headers = [
    {title: "予約名", key: "reservation_name", value: "reservation_name", align: "start"},
    {title: "価格", key: "price", value: "price", align: "start"},
]

</script>
<template>
<!--予約招待-->
<v-row v-if="stores.reservationShare.details?.token" no-gutters class="align-center my-2" >
    <v-col class="text-body-2" cols="3">
        <p class="align-center">予約受付URL</p>
    </v-col>
    <v-col>
        <v-text-field
            density="compact"
            variant="outlined"
            hide-details
            single-line
            append-icon="mdi-content-copy"
            @click:append="copyShareUrlToClipboard"
        >{{ stores.reservationShare.details?.token }}</v-text-field>
    </v-col>
</v-row>
<div v-else class="ma-2">
    <v-btn
        @click="createShareUrl"
        color="secondary"
    >予約受付用のURLを発行する</v-btn>
</div>
<v-card flat>
    <v-card-title>
        <!--検索まわり-->
        <div class="d-flex align-center">
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            single-line
            hide-details
            class="mr-4"
            ></v-text-field>
            <v-menu offset-y>
                <template v-slot:activator="{ props }">
                    <v-btn
                    color="grey lighten-1"
                    dark
                    v-bind="props"
                    class="mr-2"
                    >
                    <v-icon left>mdi-filter</v-icon>
                    フィルター
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="filters.sortBy = 'date'">
                    <v-list-item-title>日付順</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="filters.sortBy = 'quantity'">
                    <v-list-item-title>予約枚数順</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                    <v-checkbox
                        label="当日予約のみ"
                        v-model="filters.sameDay"
                        hide-details
                        dense
                    ></v-checkbox>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-card-title>

    <!-- 予約データのローディング/エラー表示 -->
    <div v-if="loadingReservations" class="text-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <div class="mt-2">予約データを読み込み中...</div>
    </div>

    <v-alert v-else-if="reservationsError" type="error" class="ma-4">
        {{ reservationsErrorMessage }}
        <v-btn text color="error" @click="getReservations(route.params.token)">再読み込み</v-btn>
    </v-alert>

    <template v-else>
        <v-data-table
        :headers="headers"
        :items="props.reservations"
        :search="search"
        :items-per-page="10"
        :header-props="{
        class: 'bg-secondary',
        }"
        :footer-props="{
            'items-per-page-options': [5, 10, 15, 20],
            'items-per-page-text': '表示件数'
        }"
        @click:row="openReservationDetail"
        class="elevation-1"
        density="compact"
        hover
        >
        <!-- カスタムセルテンプレート -->
        <template v-slot:item.price="{ item }">
            ¥ {{ Math.floor(item.price).toLocaleString() }}
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click.stop="editReservation(item)">
            mdi-pencil
            </v-icon>
            <v-icon small @click.stop="handleDeleteReservation(item)">
            mdi-delete
            </v-icon>
        </template>
        </v-data-table>
    </template>

    <v-card-actions>
        <v-btn
        color="success"
        @click="stores.dialog.showDialog(newReserve)"
        >
        <v-icon left>mdi-plus</v-icon>
        新規予約
        </v-btn>
        
        <v-spacer></v-spacer>
        
        <v-btn 
        color="primary"
        @click="exportDialog = true"
        >
        <v-icon left>mdi-export</v-icon>
        出力
        </v-btn>
    </v-card-actions>
</v-card>

<v-dialog v-model="stores.dialog.all[newReserve].show">
    <Dialog :dialog="newReserve" />
</v-dialog>
</template>
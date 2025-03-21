<script setup>
import { ref, reactive } from 'vue';
import { useFormatters } from '../../composables/useFormatters';
import { params } from '../../composables/useParams';
import { useDialogStore } from '../../stores/uiSetting';
import { useEventStore } from '../../stores/event';
import { useReservationStore } from '../../stores/reservations';
import Dialog from '../dialog/Dialog.vue';


const stores = {
    event: useEventStore(),
    reservation: useReservationStore(),
    dialog: useDialogStore(),
}
const format = useFormatters();
const props = defineProps(['reservations']);
const newReserve = "newReserve"
const editReserve = "editReserve"
const filters = reactive({
    sortBy: "",
    sameDay: "",
})

const search = ref('')

const headers = Object.entries(params.reservationParams).map(([key, value]) => {
  return {
    key: key,
    title: value.label,
    align: 'start',
    sortable: true
  }
})

function getReservations(){

}
</script>
<template>
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
        >
        <template v-slot:item.reserved_at="{ item }">
            {{ format.formatDate(item.reserved_at) }}
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
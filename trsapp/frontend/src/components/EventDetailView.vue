<script setup>
import { ref } from 'vue'
import router from '../router';
import { useFormatters } from '../composables/useFormatters';
import { useEventStore } from '../stores/event';

const event = useEventStore();
const format = useFormatters();
</script>
<template>
    <div>イベント詳細画面: {{ event }}</div>
    <v-card
        :title="event.details.event_name"
        :subtitle="format.formatDate(event.details.event_date)"
    >
        <v-btn 
        class="d-flex align-top"
        prepend-icon="mdi-arrow-left-circle"
        color="primary"
        variant="tonal"
        >一覧に戻る</v-btn>
    </v-card>
    
</template>
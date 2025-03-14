<script setup>
import { ref } from 'vue'
import { useFormatters } from '../../composables/useFormatters';
import { useEventStore } from '../../stores/event';

const event = useEventStore();

</script>
<template>
    <div>イベント詳細画面: {{ event }}</div>
    
</template>
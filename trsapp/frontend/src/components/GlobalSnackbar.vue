<script setup>
import { useUiStore } from '../stores/uiSetting';
const store = useUiStore()
</script>
<template>
<v-snackbar
    v-model="store.show"
    :color="store.color"
    timeout=3000
    location="top"
>
    {{ store.message }}
    <template v-slot:actions>
        <v-btn variant="text" icon="mdi-close" @click="store.snackbar.clearMessage()"></v-btn>
    </template>
</v-snackbar>
</template>
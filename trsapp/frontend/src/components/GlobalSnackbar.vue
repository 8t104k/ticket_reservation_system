<script setup>
import { useUiStore } from '../stores';
const store = useUiStore()
</script>
<template>
<v-snackbar
    v-model="store.snackbar.show"
    :color="store.snackbar.color"
    timeout=3000
    location="top"
>
    {{ store.snackbar.message }}
    <template v-slot:actions>
        <v-btn variant="text" icon="mdi-close" @click="store.clearMessage()"></v-btn>
    </template>
</v-snackbar>
</template>
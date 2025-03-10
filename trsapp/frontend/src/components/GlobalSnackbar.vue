<script setup>
import { useSnackbarStore } from '../stores/snackbar';
const store = useSnackbarStore()
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
        <v-btn variant="text" icon="mdi-close" @click="store.clearMessage()"></v-btn>
    </template>
</v-snackbar>
</template>
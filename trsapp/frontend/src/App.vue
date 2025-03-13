<script setup>
import GlobalSnackbar from './components/GlobalSnackbar.vue';
import { useRoute } from 'vue-router'
import router from './router';
</script>

<template>
  <v-app>
    <!-- ヘッダー -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>イベント管理</v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- メイン -->
    <v-main>
      <v-container fluid>
        <div class="d-flex">
          <v-btn @click="(router.push('/dashboard'))"></v-btn>
          <v-btn @click="(router.push('events'))"></v-btn>
        </div>
        <router-view />
      </v-container>
    </v-main>

    <!-- フッター -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <!-- メッセージ表示スナックバー -->
    <GlobalSnackbar />
  </v-app>
</template>
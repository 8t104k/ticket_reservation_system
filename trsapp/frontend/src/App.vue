<script setup>
import { computed } from 'vue';
import GlobalSnackbar from './components/GlobalSnackbar.vue';
import router from './router';
import { useRoute } from 'vue-router'
import { useEventStore } from './stores/event';
import { useUiStore } from './stores/uiSetting';

const route = useRoute();
const transitionType = computed(() => route.meta.transition || 'slide')

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
        <!--
          <Transition :name="transitionType" mode="out-in">
            <router-view />
            </Transition>
          -->
          <router-view v-slot="{ Component, route }">
            <Transition :name="transitionType">
              <component :is="Component" :key="route.fullPath" />
            </Transition>
          </router-view>
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

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  transform: translateX(-100%); /* 右から入ってくる */
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%); /* 左に消えていく */
  opacity: 0;
}

.r-slide-enter-active,
.r-slide-leave-active {
  transition: all 0.2s ease;
}

.r-slide-enter-from {
  transform: translateX(100%); /* 左から入ってくる */
  opacity: 0;
}

.r-slide-leave-to {
  transform: translateX(-100%); /* 右に消えていく */
  opacity: 0;
}
</style>
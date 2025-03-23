<script setup>
import { ref, computed } from 'vue';
import { apiService } from '../stores/api';
import { ENDPOINTS } from '../api/client';
import { useRoute } from 'vue-router'

const route = useRoute();
const themeData = ref(null);

// 非同期関数を定義
const fetchData = async () => {
    try{
        themeData.value = await apiService.call(ENDPOINTS.INVITATION.BASE(route.params.detail_token));
        console.log("読み込み完了",themeData.value)
    }catch(error){
        console.log(error)
    }finally{
    }
};
// マウント時に実行
fetchData();

const cssVars = computed(() => {
    if (!themeData.value) return {}
    
    return {
        '--bg-color': themeData.value.color_info.background,
        '--text-color': themeData.value.color_info.text,
        '--primary-color': themeData.value.color_info.primary,
        '--secondary-color': themeData.value.color_info.secondary,
        '--font-family': themeData.value.font_info?.family || 'Roboto',
        '--font-size': themeData.value.font_info?.size || '16px',
        '--font-weight': themeData.value.font_info?.weight || 400,
        '--bg-img': `url('${themeData.value.background_img}')`
    }
})



</script>
<template>
<div  v-if="themeData">
    <div class="contents" :style="cssVars">
        <h1>{{ themeData.event_name }}</h1>
        <p>{{ themeData.event_date }}</p>
        <p>{{ themeData }}</p>
        <p>{{ themeData.background_img }}</p>
    </div>
</div>
</template>
<style>
.contents {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    background-image: var(--bg-img);
    background-repeat: no-repeat;
    background-size: cover;
}
h1 {
    color: var(--primary-color);
}
</style>
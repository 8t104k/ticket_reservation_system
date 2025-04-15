<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { apiService } from '../stores/api';
import { ENDPOINTS } from '../api/client';
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase';
import { useGSAP } from '../composables/useGSAP';
import { useStorage } from '../composables/useStorage';

const route = useRoute();
const themeData = ref(null);
const animationReady = ref(false);
const { getUrl } = useStorage;
const groupImage = ref('')

// GSAPのロード状態を管理
const { isGsapLoaded, loadGSAP } = useGSAP()

const imgUrls = ref({})
const loadImageUrls = async(groups) => {
  for(const [i, g] of groups.entries()){
    console.log(g,i,g.img_url)
    imgUrls.value[i] = await getUrl('groups',g.img_url)
  };
}

// 非同期関数を定義
const fetchData = async () => {
    try{
        themeData.value = await apiService.call(ENDPOINTS.INVITATION.BASE(route.params.detail_token));
        await loadImageUrls(themeData.value.groups);
        return themeData.value;
    }catch(error){
        console.error('データ取得エラー:', error);
        return null;
    }
};

// GSAPアニメーションを設定する関数
const setupAnimation = () => {
    if (!window.gsap) {
        console.error('GSAPがロードされていません');
        return;
    }

    const fadeInFromBottom = {
      y: 100,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".event-container",
        scrub: true,
        //start: "top center",
        end: "+=500",
        toggleActions: "restart pause reverse pause",
        markers: true
      },
    }
    
    gsap.registerPlugin("ScrollTrigger")
    gsap.from(".event-container",{
      y: 0,
      opacity: 0,
      duration: 3,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: ".event-container",
        scrub: true,
        start: "top 90%",
        end: "top 50%",
        toggleActions: "restart pause reverse pause",
        markers: true
      },
    })
    //gsap.from(".org-group",fadeInFromBottom)
};

onMounted(async() => {
    await fetchData();

    try {
        const gsap = await loadGSAP();
        if (themeData.value && gsap) {
            await nextTick();
            setupAnimation();
        }
    } catch (error) {
        console.error('GSAPロードエラー:', error);
    }
});

const formatTime = (dataTime) => {
  return new Date(dataTime).toLocaleString('ja-JP',{
    hour: 'numeric', 
    minute: 'numeric'
  })
}

const getBgUrl = () => {
  const backgroundPath = themeData.value?.background_img
  if(!backgroundPath){return ""}
  const { data } = supabase.storage.from('event-backgrounds').getPublicUrl(backgroundPath);
  return data.publicUrl
}

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
        '--bg-img': `url('${getBgUrl()}')`
    }
})


const desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          }]
</script>

<template>
  <div v-if="themeData">
    <div class="contents" :style="cssVars">
      <div class="space"></div>
      <div class="container-wrapper">
        <v-card class="event-container ma-4 pa-4">
          <h1 class="title ma-4">{{ themeData.event_name }}</h1>
          <div class="event-details d-flex justify-space-evenly align-center">
            <h2 class="event-date">Date:<br>{{ themeData.event_date }}</h2>
            <div class="event-time ma-2">
              <h3>open: {{ formatTime(themeData.open_time) }}</h3>
              <h3>start: {{ formatTime(themeData.start_time) }}</h3>
              <h3>close: {{ formatTime(themeData.close_time) }}</h3>
            </div>
          </div>
          <div class="groups">
            <h2 class="artist ma-2">出演バンド</h2>
            <div class="ma-4"
            v-for="(group, index) in themeData.groups">
              <v-row class="justify-space-around">
                <v-col cols="12" class="text-h4">{{ group.group_name || "group_name" }}</v-col>
                <v-col v-if="imgUrls[index]" cols="12" sm="6" class="pa-0">
                  <v-img
                  :src="imgUrls[index]"
                  >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                        :size="loaderSize"
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
                </v-col>
                <v-col cols="12" sm="auto" class="text-subtitle-1">
                  <p class="text-center">{{ group.description }}</p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- タイムテーブル -->
          <div>
            <h2>タイムテーブル</h2>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in desserts"
                  :key="item.name"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          
          <!-- チケット代 -->
          <div>
            <h2>チケット</h2>
          </div>
          <!-- チケットフォーム -->
          <div>
            <v-form>
              <v-text-field>名前：</v-text-field>
              <v-btn>apply</v-btn>
            </v-form>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style>



.contents * {
  color: var(--text-color);
  font-family: var(--font-family);
}

.contents {
  font-weight: var(--font-weight);
  font-size: var(--font-size);
  background-color: var(--bg-color);
  background-image: var(--bg-img);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  padding: 0;
  margin: 0 calc(50% - 50vw);
  width: auto;
  /* height: 600vh; */
  overflow: hidden;
}

.container-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}

.event-container {
    max-width: 800px;
    width: auto;
    height: auto;
    background-color: rgba(var(--bg-color-rgb, 255, 255, 255), 0.85);
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    text-align: center;
}

.space {
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
}

.title {
    color: var(--primary-color);
    position: relative;
    font-size: 2.5rem;
}

.event-date {
    color: var(--secondary-color);
    font-size: 1.2rem;
}

.event-details {
  font-size: 1.2rem;
}

.org-group {
  margin: auto;
}

.artist {
  text-align: left;
  
}

.group-description {
  white-space: pre-wrap;
  word-break: break-word;
}

</style>
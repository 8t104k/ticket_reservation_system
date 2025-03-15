<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

// データの定義
const user = ref([])
const loading = ref(true)
const route = useRoute()
const mypage_tab = ref("")
const mypage_tab_items = [
    {value: 1, title:"主催イベント"},
    {value:2,title:"参加イベント"}
    ]

// マウント時の処理
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/users/${route.params.username}`)
    user.value = response.data
  } catch (error) {
    console.error('Error fetching events:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
 <v-container class="my-page-card mx-auto">
    <v-card-text class="pa-6">
        <v-row>
            <v-col cols="12" sm="4" class="text-center">
                <v-avatar size="150" class="mb-3">
                    <v-img
                        :src="user.profile_img || '/default-avatar.png'"
                        alt="プロフィール画像"
                    ></v-img>
                </v-avatar>
                <v-btn>画像を変更</v-btn>
            </v-col>
        
        <!-- ユーザー情報 -->
         <v-col>
            <v-list>
                <v-list-item>
                    <v-list-item-title>ユーザー名</v-list-item-title>
                    <v-text-field variant="underlined" :value="user.username" prepend-icon="mdi-account" :readonly="true">
                    </v-text-field>
                    <v-list-item-title>表示名</v-list-item-title>
                    <v-text-field variant="underlined" v-model="user.display_name" prepend-icon="mdi-account">
                        <template #append>
                            <v-btn color="primary">変更</v-btn></template>
                    </v-text-field>
                    <v-list-item-title>メールアドレス</v-list-item-title>
                    <v-text-field variant="underlined" v-model="user.email" prepend-icon="mdi-account">
                        <template #append>
                            <v-btn color="primary">変更</v-btn></template>
                    </v-text-field>                    
                </v-list-item>
            </v-list>
         </v-col>
        </v-row>
    </v-card-text>

    <v-tabs v-model="mypage_tab" align-title="title">
        <v-tab
            v-for="item in mypage_tab_items"
            :key="item.value"
            :text="item.title"
            :value="item.value"
        ></v-tab>
    </v-tabs>
 </v-container>
</template>
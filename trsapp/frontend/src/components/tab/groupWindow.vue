<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useStores } from '../../stores';

const { group, ui } = useStores();
const { details } = storeToRefs(group);
const route = useRoute()
const group_name = ref('')

onMounted(async() => {
    try {
      await group.getEventGroup(route.params.token);
    } catch(error){
      ui.showMessage('グループ情報の取得に失敗しました😣','error')
    }
  })

const imgUrl = "invalidUrl"
</script>
<template>
  <div v-if="group.loading">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-else-if="group.details">

    <v-row class="ma-2 pa-2">
      <v-col cols="12" sm="6" class="pa-2">
        <v-img
        class="mx-auto"
        min-height="200"
        height="auto"
        max-width="500"
        cover
        :src="imgUrl || ''"
        >
          <template v-slot:error>
            <div class="d-flex align-center justify-center fill-height border rounded-xl">
              <v-icon
              icon="mdi-image"
              size="large"
              color="grey-darken-2"
              ></v-icon>
            <div class="text-subtitle-1 ml-2 text-grey-darken-2">画像がありません</div>
            </div>
          </template>
        </v-img>
        <v-btn
        class="ma-2"
        small
        variant="tonal"
        @click=""
        >
        <v-icon left>mdi-cloud-upload-outline</v-icon>
          画像をアップロード
        </v-btn>
      </v-col>
      <v-col class="pa-2">
        <div class="d-flex text-h6">バンド名</div>
        <v-text-field
        v-model="details.group_name"
        ></v-text-field>
        <div class="d-flex text-h6">紹介文</div>
        <v-textarea
        v-model="details.description"
        rounded="lg"
        hint="予約受付画面に表示する紹介文です。"
        ></v-textarea>
        <div class="d-flex justify-end">
          <v-btn
          prepend-icon="mdi-content-save"
          >変更を保存</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>


</template>
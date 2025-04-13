<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStores } from '../../stores';
import { useStorage } from '../../composables/useStorage';
import { storeToRefs } from 'pinia'

const { group, ui } = useStores();
const route = useRoute();
const { upload, getUrl } = useStorage;
const file = ref('');
const { details } = storeToRefs(group)

const imgUrl = ref('invalid')

//テスト用
const items =   [{
    token: "P9muB0lfapk",
    group_name: "Bバンド",
  },
  {
    token: "KNv5e0jbms8",
    group_name: "バンドBB",
  }]


onMounted(async() => {
    try {
      await group.getEventGroup(route.params.token);
      if (group?.details) imgUrl.value = await getUrl('groups',group.details.img_url)
    } catch(error){
      ui.showMessage('グループ情報の取得に失敗しました😣','error')
    }
  })

  const groupEditLoad = ref(false)
  const saveDetails = async (details) => {
    groupEditLoad.value = true;
    try{
      const { group_name, description } = details
      const params = { group: {group_name,description}}
      await group.updateGroup(details.token,params)
      ui.showMessage('グループ情報を変更しました⭐️','success')
    }catch{
      ui.showMessage('グループ情報の更新に失敗しました😣','error')
    }finally{
      groupEditLoad.value = false;
    }
  }

  const handleChangeGroup= async (group_token) =>{
    //console.log(route.params.token,group_token)
    try {
      await group.changeGroup(route.params.token, group_token)
      if (group?.details) imgUrl.value = await getUrl('groups',group.details.img_url)
      ui.showMessage('グループ情報を変更しました⭐️','success')
    } catch(error){
      ui.showMessage('グループの変更に失敗しました😣','error')
    }
  }


</script>
<template>
  <!-- 読み込み中 -->
  <div v-if="group.loading">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>

  <!-- グループ未設定 -->
  <div v-else-if="!group.details">
    <v-btn
      class="ma-4"
      color="primary"
      prepend-icon="mdi-swap-horizontal"
      >グループを設定する
      <v-menu activator="parent">
        <v-list slim>
          <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="item"
          @click="handleChangeGroup(item.token)">
            <v-list-item-title>{{ item.group_name }} に設定</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
  
  <!-- 詳細表示 -->
  <div v-else>
    <div class="d-flex justify-end">
      <v-btn
      class="ma-4"
      color="primary"
      prepend-icon="mdi-swap-horizontal"
      >グループ変更
      <v-menu activator="parent">
        <v-list slim>
          <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="item"
          @click="handleChangeGroup(item.token)">
            <v-list-item-title>{{ item.group_name }} に設定</v-list-item-title>
          </v-list-item>
          <v-list-item
          class="bg-grey"
          prepend-icon="mdi-minus-box-outline"
          @click="handleChangeGroup(null)"
          >
            <v-list-item-title>現在のグループ設定を削除</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    </div>
    <v-row class="ma-2 pa-2">
      <v-col cols="12" sm="6" class="pa-4">
        <v-img
        class="mx-auto border rounded-xl"
        min-height="200"
        height="auto"
        max-width="500"
        :src="imgUrl"
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

        <div class="d-flex justify-center">
          <v-file-input
          v-model="file"
          class="pa-2"
          max-width="250px"
          clearable
          label="画像をアップロード"
          variant="solo-filled"
          :prepend-icon="null"
          prepend-inner-icon="mdi-cloud-upload-outline"
          @update:modelValue="upload('groups', details.token, file, group)"
          ></v-file-input>
        </div>
      </v-col>
      <v-col class="pa-4">
        <div class="d-flex text-h6">バンド名</div>
        <v-text-field
        v-model="details.group_name"
        ></v-text-field>
        <div class="d-flex text-h6">紹介文</div>
        <v-textarea
        v-model="details.description"
        rounded="lg"
        hint="予約受付画面に表示されます。（空欄でもOK）"
        ></v-textarea>
        <div class="d-flex justify-end">
          <v-btn
          class="ma-4"
          :loading="groupEditLoad"
          prepend-icon="mdi-content-save"
          @click="saveDetails(details),load"
          >変更を保存</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>

</template>
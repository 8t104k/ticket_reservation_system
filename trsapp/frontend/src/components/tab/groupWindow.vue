<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStores } from '../../stores';
import { useStorage } from '../../composables/useStorage';

const { group, ui } = useStores();
const route = useRoute();
const { upload, getUrl } = useStorage;
const file = ref('');
const imgUrl = ref('invalid')
const params = reactive({
  group: {
    group_name: null,
    description: null
  }
});

onMounted(async() => {
    try {
      await group.getEventGroup(route.params.token);
      params["group"].group_name = group.details.group_name
      params["group"].description = group.details.description
      imgUrl.value = await getUrl('groups',group.details.img_url)
    } catch(error){
      ui.showMessage('グループ情報の取得に失敗しました😣','error')
    }
  })

  const saveDetails = async (params) => {
    try{
      await group.updateGroup(group.details.token,params)
      ui.showMessage('グループ情報を変更しました⭐️','success')
    }catch{
      ui.showMessage('グループ情報の更新に失敗しました😣','error')
    }
  }


</script>
<template>
  <div v-if="!group.details">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-else>

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
          @update:modelValue="upload('groups', group.details.token, file, group)"
          ></v-file-input>
        </div>
      </v-col>
      <v-col class="pa-4">
        <div class="d-flex text-h6">バンド名</div>
        <v-text-field
        v-model="params.group.group_name"
        ></v-text-field>
        <div class="d-flex text-h6">紹介文</div>
        <v-textarea
        v-model="params.group.description"
        rounded="lg"
        hint="予約受付画面に表示されます。（空欄でもOK）"
        ></v-textarea>
        <div class="d-flex justify-end">
          <v-btn
          class="ma-4"
          :loading="group.loading"
          prepend-icon="mdi-content-save"
          @click="saveDetails(params),load"
          >変更を保存</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>

</template>
<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router'
import { useStores } from '../../stores';

const {collaborator, ui} = useStores();
const search = ref('');
const route = useRoute();

onMounted(async() => {
  try {
    await collaborator.getCollaborators(route.params.token);
  } catch(error){
    ui.showMessage('コラボレーター情報の取得に失敗しました😣','error')
  }
});


</script>
<template>
  <v-card flat>
      <v-card-title>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="検索"
          single-line
          hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success">
          <v-icon left>mdi-account-plus</v-icon>
          共演者追加
          </v-btn>
      </v-card-title>

      <!-- 共演者データのローディング/エラー表示 -->
      <div v-if="collaborator.loading" class="text-center pa-4">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <div class="mt-2">共演者データを読み込み中...</div>
      </div>

      <v-alert v-else-if="collaboratorsError" type="error" class="ma-4">
          読み込みに失敗しました！
          <v-btn text color="error" @click="collaborator.getCollaborators(route.params.token)">再読み込み</v-btn>
      </v-alert>

      <v-list v-else two-line>
          <v-list-item
          v-for="(person, index) in collaborator.all"
          :key="index"
              >
              <template v-slot:prepend>
                  <v-avatar icon="mdi-penguin"></v-avatar>
              </template>
              <div class="d-flex align-center justify-space-between">
                  <v-row no-gutters class="ma-2">
                      <v-col cols="12" sm="5">
                          <v-list-title>{{ person.display_name }}</v-list-title>
                      </v-col>
                      <v-col>
                          <v-list-item-subtitle>{{ person.role || '役割なし' }}</v-list-item-subtitle>
                      </v-col>
                  </v-row>
                  <v-list-item-action>
                      <v-btn color="error" size="small">削除</v-btn>
                  </v-list-item-action>
              </div>
              <v-divider></v-divider>
          </v-list-item>
      </v-list>
  </v-card>
</template>
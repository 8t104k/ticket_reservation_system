<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStores } from '../stores'

// データの定義
const route = useRoute()
const { profile, ui } = useStores()
const isEditing = ref(false)
const editedProfile = ref({})

// 編集中のプロフィール情報
const startEditing = () => {
  editedProfile.value = { ...profile.details }
  isEditing.value = true
}

// 変更をキャンセル
const cancelEdit = () => {
  isEditing.value = false
}

// 変更を保存
const saveChanges = async () => {
  try {
    await profile.updateProfile(editedProfile.value)
    ui.showMessage('プロフィールを更新しました！', 'success')
    isEditing.value = false
  } catch (error) {
    ui.showMessage('プロフィールの更新に失敗しました😕', 'error')
  }
}

// アバターのカラーコード生成（ユーザー名に基づく）
const avatarColor = computed(() => {
  if (!profile.details || !profile.details.username) return 'primary'
  
  const colors = ['primary', 'secondary', 'success', 'info', 'warning']
  const hash = profile.details.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
})

// イニシャル取得
const userInitials = computed(() => {
  if (!profile.details || !profile.details.display_name) return '?'
  return profile.details.display_name.charAt(0).toUpperCase()
})

// マウント時の処理
onMounted(async () => {
  try {
    await profile.getProfile(route.params.username)
  } catch (error) {
    console.log(error)
    ui.showMessage('プロフィール情報の取得に失敗しました😣','error')
  }
})
</script>

<template>
  <v-container>
    <!-- ローディング表示 -->
    <div v-if="profile.loading" class="d-flex justify-center align-center" style="height: 400px">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
    
    <!-- プロフィール表示 -->
    <v-card v-else class="mx-auto my-4 rounded-lg" elevation="3" max-width="1000px">
      <!-- プロフィールヘッダー部分 -->
      <v-card-item>
        <div class="d-flex flex-column flex-sm-row align-center justify-space-between pa-4">
          <div class="d-flex flex-column flex-sm-row align-center">
            <!-- アバター表示 - 画像があればそれを表示、なければイニシャル表示 -->
            <v-avatar :color="avatarColor" size="120" class="elevation-4 mb-4 mb-sm-0">
              <v-img v-if="profile.details.avatar_url" :src="profile.details.avatar_url" alt="プロフィール画像"></v-img>
              <span v-else class="text-h3 font-weight-bold white--text">{{ userInitials }}</span>
            </v-avatar>
            
            <!-- 名前情報 -->
            <div class="text-center text-sm-left ml-sm-6">
              <h1 class="text-h4 font-weight-bold mb-1">{{ profile.details.display_name || profile.details.username }}</h1>
              <p class="text-subtitle-1 text-medium-emphasis">@{{ profile.details.username }}</p>
              <p class="text-body-1 mt-2">{{ profile.details.bio || 'プロフィール情報はまだ設定されていません。' }}</p>
            </div>
          </div>
          
          <!-- 編集ボタン -->
          <v-btn
            v-if="!isEditing" 
            @click="startEditing"
            color="primary"
            variant="outlined"
            prepend-icon="mdi-pencil"
            class="mt-4 mt-sm-0"
          >
            編集する
          </v-btn>
        </div>
      </v-card-item>
      
      <v-divider></v-divider>
      
      <!-- プロフィール詳細情報 -->
      <v-card-text class="pa-6">
        <!-- 表示モード -->
        <v-list v-if="!isEditing" class="bg-transparent">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="primary" class="mr-2">mdi-account</v-icon>
            </template>
            <v-list-item-title class="text-subtitle-2 text-medium-emphasis">ユーザー名</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 mt-1 font-weight-medium">{{ profile.details.username }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="primary" class="mr-2">mdi-card-account-details-outline</v-icon>
            </template>
            <v-list-item-title class="text-subtitle-2 text-medium-emphasis">表示名</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 mt-1 font-weight-medium">{{ profile.details.display_name || '未設定' }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="primary" class="mr-2">mdi-email-outline</v-icon>
            </template>
            <v-list-item-title class="text-subtitle-2 text-medium-emphasis">メールアドレス</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 mt-1 font-weight-medium">{{ profile.details.email }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        
        <!-- 編集モード -->
        <v-form v-else>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedProfile.username"
                label="ユーザー名"
                readonly
                variant="outlined"
                prepend-inner-icon="mdi-account"
                bg-color="grey-lighten-5"
                hint="ユーザー名は変更できません"
                persistent-hint
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="editedProfile.display_name"
                label="表示名"
                variant="outlined"
                prepend-inner-icon="mdi-card-account-details-outline"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="editedProfile.email"
                label="メールアドレス"
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="editedProfile.bio"
                label="自己紹介"
                variant="outlined"
                prepend-inner-icon="mdi-text-box-outline"
                auto-grow
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>
          
          <div class="d-flex justify-end mt-4">
            <v-btn
              @click="cancelEdit"
              variant="text"
              class="mr-2"
            >
              キャンセル
            </v-btn>
            
            <v-btn
              @click="saveChanges"
              color="primary"
              prepend-icon="mdi-content-save-outline"
            >
              保存
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
      
      <!-- アクティビティセクション -->
      <v-card-text v-if="!isEditing" class="pa-6 pt-0">
        <v-divider class="mb-6"></v-divider>
        
        <h2 class="text-h5 font-weight-bold mb-4">アクティビティ</h2>
        
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-card variant="outlined" class="rounded-lg h-100">
              <v-card-item>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-calendar-check</v-icon>
                  <div>
                    <div class="text-h5 font-weight-bold">{{ 0 }}</div>
                    <div class="text-body-2 text-medium-emphasis">参加イベント</div>
                  </div>
                </div>
              </v-card-item>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card variant="outlined" class="rounded-lg h-100">
              <v-card-item>
                <div class="d-flex align-center">
                  <v-icon color="success" size="36" class="mr-3">mdi-calendar-star</v-icon>
                  <div>
                    <div class="text-h5 font-weight-bold">{{ 0 }}</div>
                    <div class="text-body-2 text-medium-emphasis">主催イベント</div>
                  </div>
                </div>
              </v-card-item>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card variant="outlined" class="rounded-lg h-100">
              <v-card-item>
                <div class="d-flex align-center">
                  <v-icon color="info" size="36" class="mr-3">mdi-account-group</v-icon>
                  <div>
                    <div class="text-h5 font-weight-bold">{{ 0 }}</div>
                    <div class="text-body-2 text-medium-emphasis">グループメンバー</div>
                  </div>
                </div>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
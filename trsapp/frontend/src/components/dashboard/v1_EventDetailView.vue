<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEventData } from '../../composables/useEventData'
import { useReservations } from '../../composables/useReservations'
import { useCollaborators } from '../../composables/useCollaborators'

const route = useRoute()

// UIコントロール用の状態
const activeTab = ref('1')
const search = ref('')
const collaboratorSearch = ref('')
const filters = ref({
  sameDay: false,
  sortBy: 'date'
})

// Composablesを使用してデータと関数を取得
const { 
  event, 
  loading: loadingEvent, 
  error: eventError,
  errorMessage: eventErrorMessage,
  fetchEvent,
  updateEvent
} = useEventData()

const { 
  reservations, 
  loading: loadingReservations, 
  error: reservationsError,
  errorMessage: reservationsErrorMessage,
  reservationCount,
  fetchReservations,
  createReservation,
  updateReservation,
  deleteReservation
} = useReservations()

const { 
  collaborators, 
  loading: loadingCollaborators, 
  error: collaboratorsError,
  errorMessage: collaboratorsErrorMessage,
  fetchCollaborators
} = useCollaborators()

// 全体のローディング状態 - イベント情報の読み込みのみに依存
const loading = computed(() => {
  return loadingEvent.value
})

// 計算プロパティ
const filteredCollaborators = computed(() => {
  if (!collaboratorSearch.value) return collaborators.value
  
  const search = collaboratorSearch.value.toLowerCase()
  return collaborators.value.filter(person => {
    return (person.name && person.name.toLowerCase().includes(search)) ||
           (person.role && person.role.toLowerCase().includes(search))
  })
})

//デバッグ用
watch(activeTab, (newValue, oldValue) => {
  console.log('activeTab changed:', oldValue, '->', newValue)
})

// ダイアログの表示状態
const eventEditDialog = ref(false)
const reservationDialog = ref(false)
const reservationDetailDialog = ref(false)
const exportDialog = ref(false)

// 日付メニューの表示状態
const startDateMenu = ref(false)
const endDateMenu = ref(false)
const reservationDateMenu = ref(false)

// 編集用データ
const editMode = ref(false)
const editedEvent = ref({})
const editedReservation = ref({
  id: null,
  name: '',
  quantity: 1,
  reservationDate: new Date().toISOString().substr(0, 10),
  notes: ''
})
const selectedReservation = ref({})

// エクスポート設定
const exportFormat = ref('csv')
const exportOptions = ref({
  includeDetails: true,
  currentPageOnly: false
})

// データテーブルヘッダー
const headers = [
  { title: '予約者名', value: 'reservation_name' },
  { title: '予約枚数', value: 'quantity' },
  { title: '予約日', value: 'reserved_at' },
  { title: '操作', value: 'actions', sortable: false }
]

// ステータスオプション
const statusOptions = ['準備中', '開催中', '終了']

// マウント時の処理
onMounted(() => {
  console.log('Initial activeTab value:', activeTab.value)
  
  // 各データを取得 - Composableのメソッドを使用
  fetchEvent(route.params.token)
  fetchReservations(route.params.token, true) // 第2引数はダミーデータを使用するかどうか
  fetchCollaborators(route.params.token, true)
})

// メソッドの定義
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric',weekday: 'short' })
}
const formatTime = (date) => {
  if (!date) return ''
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
const formatDateRange = (start, end) => {
  if (!start || !end) return ''
  return `${formatDate(start)} 〜 ${formatDate(end)}`
}

const getStatusText = (status) => {
  const statusMap = {
    0: '準備中',
    1: '開催中',
    2: '終了'
  }
  return statusMap[status] || '不明'
}

const getStatusColor = (status) => {
  const colorMap = {
    0: 'orange',
    1: 'green',
    2: 'grey'
  }
  return colorMap[status] || 'black'
}

// イベント編集ダイアログを開く
const openEventEditDialog = () => {
  editedEvent.value = { ...event.value }
  eventEditDialog.value = true
}

// イベント情報を保存する - Composableを使用
const saveEvent = async () => {
  try {
    // Composableのメソッドを使用
    await updateEvent(route.params.token, editedEvent.value)
    eventEditDialog.value = false
  } catch (error) {
    // エラー処理は既にComposable内で行われている
    console.error('Error in component level:', error)
  }
}

// 予約追加ダイアログを開く
const openReservationDialog = () => {
  editMode.value = false
  editedReservation.value = {
    id: null,
    name: '',
    quantity: 1,
    reservationDate: new Date().toISOString().substr(0, 10),
    notes: ''
  }
  reservationDialog.value = true
}

// 予約詳細を開く
const openReservationDetail = (item) => {
  selectedReservation.value = item
  reservationDetailDialog.value = true
}

// 予約を編集する
const editReservation = (item) => {
  reservationDetailDialog.value = false
  editMode.value = true
  editedReservation.value = { ...item }
  reservationDialog.value = true
}

// 予約を削除する - Composableを使用
const handleDeleteReservation = async (item) => {
  if (!confirm(`「${item.name}」の予約を削除してもよろしいですか？`)) return
  
  try {
    // Composableのメソッドを使用
    await deleteReservation(item.id)
  } catch (error) {
    // エラー処理は既にComposable内で行われている
    console.error('Error in component level:', error)
  }
}

// 予約情報を保存する - Composableを使用
const saveReservation = async () => {
  try {
    if (editMode.value) {
      // 編集の場合
      await updateReservation(editedReservation.value.id, editedReservation.value)
    } else {
      // 新規追加の場合
      await createReservation(event.value.id, editedReservation.value)
    }
    
    reservationDialog.value = false
  } catch (error) {
    // エラー処理は既にComposable内で行われている
    console.error('Error in component level:', error)
  }
}

// データをエクスポートする
const exportData = async () => {
  try {
    // APIエンドポイントにリクエストを投げる
    const params = new URLSearchParams({
      format: exportFormat.value,
      includeDetails: exportOptions.value.includeDetails,
      currentPageOnly: exportOptions.value.currentPageOnly
    })
    
    // ここもComposableにしたほうが良いが、一時的にそのまま
    const response = await axios.get(
      `http://localhost:3000/api/v1/events/${event.value.id}/export?${params.toString()}`,
      { responseType: 'blob' }
    )
    
    // ダウンロード処理
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${event.value.name}予約一覧.${exportFormat.value === 'csv' ? 'csv' : 'xlsx'}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    exportDialog.value = false
  } catch (error) {
    console.error('Error exporting data:', error)
    // エラーメッセージを表示（必要に応じて実装）
  }
}
</script>

<template>
  <v-card>
    <v-container fluid>
      <!-- ローディング表示 - イベント情報のローディング状態を使用 -->
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <!-- イベント情報カード -->
      <template v-if="!loadingEvent">
        <v-card v-if="!eventError" class="mb-4">
          <v-card-title class="d-flex justify-space-between">
            イベント情報
            <v-btn
              color="primary"
              small
              @click="openEventEditDialog"
            >
              <v-icon left>mdi-pencil</v-icon>編集
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <div class="text-subtitle-1 font-weight-bold">イベント名</div>
                <div>{{ event.event_name }}</div>
              </v-col>
              <v-col cols="12" md="3">
                <div class="text-subtitle-1 font-weight-bold">開催日</div>
                <div class="d-flex align-center">
                  <v-icon small class="mr-1">mdi-calendar</v-icon>
                  {{ formatDate(event.event_date) }}
                </div>
            </v-col>
            <v-col cols="12" md="3">
                <div class="text-subtitle-1 font-weight-bold">開始時刻</div>
                <div class="d-flex align-center">
                  <v-icon small class="mr-1">mdi-clock-time-five</v-icon>
                  {{ event.event_date }}
                </div>
            </v-col>
            <v-col cols="12" md="3">
                <div class="text-subtitle-1 font-weight-bold">ステータス</div>
                <v-chip
                  :color="getStatusColor(event.status)"
                  text-color="white"
                  small
                >
                  {{ getStatusText(event.status) }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-subtitle-1 font-weight-bold">予約数/定員</div>
                <div>{{ reservationCount }} / {{ event.capacity || '-' }} 人</div>
              </v-col>
              <v-col cols="12" md="8">
                <div class="text-subtitle-1 font-weight-bold">場所</div>
                <div class="d-flex align-center">
                  <v-icon small class="mr-1">mdi-map-marker</v-icon>
                  {{ event.location || '-' }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- イベント取得エラー時 -->
        <v-alert v-else type="error" class="ma-4">
          {{ eventErrorMessage }}
          <v-btn text color="error" @click="fetchEvent(route.params.token)">再読み込み</v-btn>
        </v-alert>

        <v-card>
          <!-- タブ切り替え - Vuetify 3用のマークアップ -->
          <v-tabs v-model="activeTab" background-color="primary" dark>
            <v-tab value="1">予約一覧</v-tab>
            <v-tab value="2">共演者一覧</v-tab>
          </v-tabs>

          <v-window v-model="activeTab">
            <!-- 予約一覧タブ -->
            <v-window-item value="1">
              <v-card flat>
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="検索"
                    single-line
                    hide-details
                    class="mr-4"
                  ></v-text-field>

                  <v-menu offset-y>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="grey lighten-1"
                        dark
                        v-bind="props"
                        class="mr-2"
                      >
                        <v-icon left>mdi-filter</v-icon>
                        フィルター
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="filters.sortBy = 'date'">
                        <v-list-item-title>日付順</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="filters.sortBy = 'quantity'">
                        <v-list-item-title>予約枚数順</v-list-item-title>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-checkbox
                          label="当日予約のみ"
                          v-model="filters.sameDay"
                          hide-details
                          dense
                        ></v-checkbox>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>

                <!-- 予約データのローディング/エラー表示 -->
                <div v-if="loadingReservations" class="text-center pa-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  <div class="mt-2">予約データを読み込み中...</div>
                </div>

                <v-alert v-else-if="reservationsError" type="error" class="ma-4">
                  {{ reservationsErrorMessage }}
                  <v-btn text color="error" @click="fetchReservations(route.params.token, true)">再読み込み</v-btn>
                </v-alert>
                
                <template v-else>
                  <v-data-table
                    :headers="headers"
                    :items="reservations"
                    :search="search"
                    :items-per-page="10"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 15, 20],
                      'items-per-page-text': '表示件数'
                    }"
                    @click:row="openReservationDetail"
                    class="elevation-1"
                  >
                    <template v-slot:item.reserved_at="{ item }">
                      {{ formatDate(item.reserved_at) }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click.stop="editReservation(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click.stop="handleDeleteReservation(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </template>

                <v-card-actions>
                  <v-btn
                    color="success"
                    @click="openReservationDialog"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    新規予約
                  </v-btn>
                  
                  <v-spacer></v-spacer>
                  
                  <v-btn 
                    color="primary"
                    @click="exportDialog = true"
                  >
                    <v-icon left>mdi-export</v-icon>
                    出力
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-window-item>

            <!-- 共演者一覧タブ -->
            <v-window-item value="2">
              <v-card flat>
                <v-card-title>
                  <v-text-field
                    v-model="collaboratorSearch"
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
                <div v-if="loadingCollaborators" class="text-center pa-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  <div class="mt-2">共演者データを読み込み中...</div>
                </div>

                <v-alert v-else-if="collaboratorsError" type="error" class="ma-4">
                  {{ collaboratorsErrorMessage }}
                  <v-btn text color="error" @click="fetchCollaborators(route.params.token, true)">再読み込み</v-btn>
                </v-alert>

                <v-list v-else two-line>
                  <v-list-item
                    v-for="(person, index) in filteredCollaborators"
                    :key="index"
                  >
                    <v-list-item-avatar>
                      <v-avatar color="primary">
                        <span class="white--text">{{ person.name ? person.name.charAt(0) : '?' }}</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ person.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ person.role || '役割なし' }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </template>
    </v-container>

    <!-- イベント編集ダイアログ -->
    <v-dialog v-model="eventEditDialog" max-width="600px">
      <v-card>
        <v-card-title>イベント情報の編集</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="editedEvent.name"
              label="イベント名"
              required
            ></v-text-field>
            
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="editedEvent.start_date"
                      label="開始日"
                      readonly
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedEvent.start_date"
                    @update:model-value="startDateMenu = false"
                    locale="ja-jp"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="editedEvent.end_date"
                      label="終了日"
                      readonly
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedEvent.end_date"
                    @update:model-value="endDateMenu = false"
                    locale="ja-jp"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            
            <v-text-field
              v-model="editedEvent.location"
              label="場所"
            ></v-text-field>
            
            <v-text-field
              v-model="editedEvent.capacity"
              label="定員"
              type="number"
            ></v-text-field>
            
            <v-select
              v-model="editedEvent.status"
              :items="statusOptions"
              label="ステータス"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="eventEditDialog = false">
            キャンセル
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEvent">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 予約追加・編集ダイアログ -->
    <v-dialog v-model="reservationDialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editMode ? '予約の編集' : '新規予約の追加' }}
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="editedReservation.name"
              label="予約者名"
              required
            ></v-text-field>
            
            <v-text-field
              v-model="editedReservation.quantity"
              label="予約枚数"
              type="number"
              required
            ></v-text-field>
            
            <v-menu
              v-model="reservationDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="editedReservation.reservationDate"
                  label="予約日"
                  readonly
                  v-bind="props"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedReservation.reservationDate"
                @update:model-value="reservationDateMenu = false"
                locale="ja-jp"
              ></v-date-picker>
            </v-menu>
            
            <v-textarea
              v-model="editedReservation.notes"
              label="メモ"
              rows="3"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reservationDialog = false">
            キャンセル
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveReservation">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 予約詳細ダイアログ -->
    <v-dialog v-model="reservationDetailDialog" max-width="500px">
      <v-card>
        <v-card-title>予約詳細</v-card-title>
        <v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>予約者名</v-list-item-subtitle>
              <v-list-item-title class="text-h6">
                {{ selectedReservation.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>予約枚数</v-list-item-subtitle>
              <v-list-item-title class="text-h6">
                {{ selectedReservation.quantity }} 枚
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>予約日</v-list-item-subtitle>
              <v-list-item-title class="text-h6">
                {{ formatDate(selectedReservation.reservationDate) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-list-item two-line v-if="selectedReservation.notes">
            <v-list-item-content>
              <v-list-item-subtitle>メモ</v-list-item-subtitle>
              <v-list-item-title>
                {{ selectedReservation.notes }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="editReservation(selectedReservation)">
            編集
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reservationDetailDialog = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- データエクスポートダイアログ -->
    <v-dialog v-model="exportDialog" max-width="400px">
      <v-card>
        <v-card-title>データ出力</v-card-title>
        <v-card-text>
          <v-radio-group v-model="exportFormat">
            <v-radio
              label="CSV形式"
              value="csv"
            ></v-radio>
            <v-radio
              label="Excel形式"
              value="excel"
            ></v-radio>
          </v-radio-group>
          
          <v-checkbox
            v-model="exportOptions.includeDetails"
            label="詳細情報を含める"
          ></v-checkbox>
          
          <v-checkbox
            v-model="exportOptions.currentPageOnly"
            label="現在表示中のデータのみ"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="exportDialog = false">
            キャンセル
          </v-btn>
          <v-btn color="green darken-1" text @click="exportData">
            ダウンロード
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style>
.v-data-table tbody tr {
  cursor: pointer;
}
</style>
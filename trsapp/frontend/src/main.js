import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

//pinia 
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { blue, orange, amber } from 'vuetify/lib/util/colors' 

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#FF9800',    // オレンジ 500 (メイン)
          secondary: '#FFCC80',  // オレンジ 200 (ライトミディアム)
          accent: '#03A9F4',     // ライトブルー (アクセント)
          info: '#8BC34A',       // ライトグリーン (サブアクセント)
          success: '#4CAF50',    // グリーン
          warning: '#FFC107',    // アンバー
          error: '#F57C00',      // オレンジ 700 (ダーク)
          background: '#fffffe', // グレー 100
          surface: '#eff0f3'     // 白
        }
      },
      dark: {
        colors: {
          primary: '#FF9800',    // オレンジ 500 (メイン)
          secondary: '#F57C00',  // オレンジ 700 (ダーク)
          accent: '#29B6F6',     // ライトブルー 400 (明るめ)
          info: '#9CCC65',       // ライトグリーン 400 (明るめ)
          success: '#66BB6A',    // グリーン 400
          warning: '#FFD54F',    // アンバー 300 (明るめ)
          error: '#FFCC80',      // オレンジ 200 (ライトミディアム)
          background: '#424242', // グレー 800
          surface: '#303030'     // ダークグレー
        }
      }
    }
  }
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
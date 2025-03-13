import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      defaultTheme: 'light',
      light: {
        primary: '#FF9800',    // オレンジ 500 (メイン)
        secondary: '#FFCC80',  // オレンジ 200 (ライトミディアム)
        accent: '#03A9F4',     // ライトブルー (アクセント)
        info: '#8BC34A',       // ライトグリーン (サブアクセント)
        success: '#4CAF50',    // グリーン
        warning: '#FFC107',    // アンバー
        error: '#F57C00',      // オレンジ 700 (ダーク)
        background: '#FFFFFF', // 白
        surface: '#F5F5F5'     // グレー 100
      },
      dark: {
        primary: '#FF9800',    // オレンジ 500 (メイン)
        secondary: '#F57C00',  // オレンジ 700 (ダーク)
        accent: '#29B6F6',     // ライトブルー 400 (明るめ)
        info: '#9CCC65',       // ライトグリーン 400 (明るめ)
        success: '#66BB6A',    // グリーン 400
        warning: '#FFD54F',    // アンバー 300 (明るめ)
        error: '#FFCC80',      // オレンジ 200 (ライトミディアム)
        background: '#303030', // ダークグレー
        surface: '#424242'     // グレー 800
      }
    }
  }
})
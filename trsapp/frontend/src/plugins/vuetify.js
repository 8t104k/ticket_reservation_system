import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FF9800',    // Orange
        secondary: '#FFA726',  // Orange lighten-1
        accent: '#FFB74D',     // Orange lighten-2
      }
    }
  }
})
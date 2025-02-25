import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { blue, orange, amber } from 'vuetify/lib/util/colors' 

const vuetify = createVuetify({
  components,
  directives,
  theme:{
    defaultTheme: 'light',
    themes:{
        light:{
            colors:{
                primary: orange.base,
                secondary: orange.lighten1,
                accent: amber.base,
            }
        }
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
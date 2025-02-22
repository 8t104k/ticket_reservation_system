import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../components/EventList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EventList
  },
  {
    path: '/events',
    name: 'events',
    component: EventList
  }
]

const router = createRouter({
  history: createWebHistory(), // process.env.BASE_URLを削除
  routes
})

export default router
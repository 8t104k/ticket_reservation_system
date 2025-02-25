import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../components/EventList.vue'
import EventDetailView from '../components/EventDetailView.vue'

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
  },
  {
    path: '/events/:token',
    name: 'EventDetail',
    component: EventDetailView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(), // process.env.BASE_URLを削除
  routes
})

export default router
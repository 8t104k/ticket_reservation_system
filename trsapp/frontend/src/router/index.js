import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../components/EventList.vue'
import EventDetailView from '../components/EventDetailView.vue'
import UserProfile from '../components/UserProfile.vue'
import LoginPage from '../components/LoginPage.vue'
import { supabase } from '../lib/supabase'

// 認証が不要なパスのリスト
const publicPaths = ['/login', '/register', '/forgot-password', '/about']

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
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
  },
  {
    path: '/users/:username',
    name: 'userprofile',
    component: UserProfile,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(), // process.env.BASE_URLを削除
  routes
})

router.beforeEach(async (to, from, next) => {
  // パスがpublicPathsに含まれているかチェック
  const isPublicPath = publicPaths.includes(to.path)
  const { data } = await supabase.auth.getSession()
  
  if (!isPublicPath && !data.session) {
    next('/login')
  } else {
    next()
  }
})

export default router
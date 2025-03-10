import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../components/EventList.vue'
import EventDetailView from '../components/EventDetailView.vue'
import UserProfile from '../components/UserProfile.vue'
import LoginPage from '../components/LoginPage.vue'
import { supabase } from '../lib/supabase'
import UserRegister from '../components/UserRegister.vue'
import MailConfirm from '../components/MailConfirm.vue'

// 認証が不要なパスのリスト
const publicPaths = ['/login', '/signup', '/forgot-password', '/about','/confirm']

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
    path: '/signup',
    name: 'signup',
    component: UserRegister
  },  
  {
    path: '/confirmation',
    name: 'confirmation',
    component: MailConfirm
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
    path: '/:username',
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
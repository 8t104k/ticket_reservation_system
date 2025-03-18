import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import EventDetailView from '../components/EventDetailView.vue'
import MyEventListsView from '../components/MyEventListsView.vue'
import LoginPage from '../components/UserLoginView.vue'

import UserRegister from '../components/UserRegisterView.vue'
import MailConfirm from '../components/MailConfirm.vue'

// 認証が不要なパスのリスト
const publicPaths = ['/login', '/signup', '/forgot-password', '/about','/confirmation']

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
    component: MyEventListsView,
    meta: {transition: 'slide'}
  },
  {
    path: '/events/:token',
    name: 'EventDetail',
    component: EventDetailView,
    meta: {transition: 'r-slide'},
    props: true
  },
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
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/auth/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/auth/Profile.vue')
    },
    {
      path: '/post/add',
      name: 'add',
      component: () => import('./components/posts/AddPost.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('./components/posts/Posts.vue')
    },
  ]
})

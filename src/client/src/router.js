import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AuthGuard from './AuthGuard';

Vue.use(Router);

export default new Router({
  // mode: 'history',
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
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/auth/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/auth/Profile.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('./views/posts/Posts.vue'),
    },
    {
      path: '/post/add',
      name: 'add',
      component: () => import('./views/posts/AddPost.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: () => import('./views/posts/Post.vue'),
      props: true
    }
  ]
})

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

import i18n from '@/i18n.js';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: () => import(/* webpackChunkName: "bookmarks" */ '@/views/Bookmarks.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "ingresar" */ '@/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "registrarse" */ '@/views/Signup.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/signup'];
  const publicOnly = ['/login', '/signup'].includes(to.path);
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.authentication.status
    && store.state.authentication.status.loggedIn;

  if (authRequired && !loggedIn) {
    store.dispatch('alert/error', i18n.t('alerts.authentication-required'), { root: true });
    return next('/login');
  } else if (publicOnly && loggedIn) {
    return next('/');
  }

  return next();
});

export default router;

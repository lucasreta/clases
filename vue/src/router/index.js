import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Ingresar.vue'),
  },
  {
    path: '/registrarse',
    name: 'Registrarse',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Registrarse.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/ingresar', '/registrarse'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/ingresar');
  }

  return next();
});

export default router;

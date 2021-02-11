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
    path: '/favoritos',
    name: 'Favoritos',
    component: () => import(/* webpackChunkName: "favoritos" */ '@/views/Favoritos.vue'),
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    component: () => import(/* webpackChunkName: "ingresar" */ '@/views/Ingresar.vue'),
  },
  {
    path: '/registrarse',
    name: 'Registrarse',
    component: () => import(/* webpackChunkName: "registrarse" */ '@/views/Registrarse.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/ingresar', '/registrarse'];
  const publicOnly = ['/ingresar', '/registrarse'].includes(to.path);
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = router.app.$store.state.autenticacion.status
    && router.app.$store.state.autenticacion.status.loggedIn;

  if (authRequired && !loggedIn) {
    return next('/ingresar');
  } else if (publicOnly && loggedIn) {
    return next('/');
  }

  return next();
});

export default router;

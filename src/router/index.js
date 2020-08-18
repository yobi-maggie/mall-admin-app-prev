import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!store.state.user.appkey || !store.state.user.username) {
      return next('/login');
    }
  }
  return next();
});
export default router;

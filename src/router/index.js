import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/index.vue';
// import Main from '@/views/Main.vue';
// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect: '/articlesync'
    children: []
  },
  // {
  //   path: '/detail1',
  //   name: 'Detail1',
  //   component: () => import(/* webpackChunkName: "Detail" */ '@/views/home/detail.vue'),
  // },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "Detail" */ '@/views/home/editor.vue'),
  },
  {
    path: '*',
    redirect: '/'
  }
  // {
  //   path: '/main',
  //   name: 'Main',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "Main" */ '@/views/Main.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import VirtualCar from '../views/VirtualCar.vue'
import Learn from '../views/Learn.vue'
import Theory from '../views/Theory.vue'
import LearnOne from '../views/LearnOne.vue'
import VirtualCarTest from '../views/VirtualCarTest.vue'

const routes = [
  { path: '/', component: Login, meta: { requiredAuth: false } },
  { path: '/login', component: Login, meta: { requiredAuth: false } },
  { path: '/register', component: Register, meta: { requiredAuth: false } },
  { path: '/Dashboard', component: Dashboard, meta: { requiredAuth: true } },
  { path: '/VirtualCar', component: VirtualCar, meta: { requiredAuth: true } },
  { path: '/Learn', component: Learn, meta: { requiredAuth: true } },
  { path: '/Theory', component: Theory, meta: { requiredAuth: true } },
  { path: '/LearnOne/:id', component: LearnOne, meta: { requiredAuth: true } },
  { path: '/VirtualCarTest', component: VirtualCarTest, meta: { requiredAuth: true } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach(async (to, from, next) => {

  var userProfile = store.getters["auth/getuserProfile"];
  if (userProfile && localStorage.getItem('isAuthenticated')) {
    await store.dispatch("auth/userProfile");
    userProfile = store.getters["auth/getuserProfile"];
  }

  if (to.meta.requiredAuth) {
    if (userProfile.login === '') {
      return next({ path: "/login" });
    }
  } else {
    if (userProfile.login !== '') {
      return next({ path: "/Dashboard" });
    }
  }
  return next();
});
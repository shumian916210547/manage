import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const login = () => import('components/login/login')
const home = () => import('views/home/home')
const users = () => import('views/home/users/users')

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: '/users',
    children: [{
      path: '/users',
      name: 'users',
      component: users
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    return next();
  } else {
    if (window.sessionStorage.getItem('token')) {
      return next()
    } else {
      return next('/login')
    }
  }
})

export default router
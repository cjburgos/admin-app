import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import LoginView from '../views/Login.vue';
import Connections from '../views/Connections.vue';
import Dashboard from '../views/Dashboard.vue';
import Wallet from '../views/Wallet.vue';

Vue.use(VueRouter)

  const routes = [
    {
      path: '/wallets',
      name: 'Wallet',
      component: Wallet,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/connections',
      name: 'Connections',
      component: Connections,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },   
    {
      path:'/login',
      name: 'LoginView',
      component: LoginView,
      meta:{
        guest: true
      }
    },
    {
      path:'/',
      name: 'HomeView',
      component: Home,
      meta:{
        requiresAuth: true
      }
    },
    { 
      path: '*', 
      redirect: '/' 
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('access_token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'userboard'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('access_token') == null){
          next()
      }
      else{
          next({ name: 'userboard'})
      }
  }else {
      next() 
  }
})

export default router

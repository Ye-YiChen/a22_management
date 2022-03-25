import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLoanManagement from '../components/UserLoanManagement.vue'
import UserStoreManagement from '../components/UserStoreManagement.vue'
import ProductStoreManagement from '../components/ProductStoreManagement.vue'
import ProductLoanManagement from '../components/ProductLoanManagement.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminManagement from '../views/AdminManagement.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'

  },
  {
    path: '/login',
    name: 'Login',
    component: AdminLogin
  },
  {
    path: '/management',
    name: 'Management',
    component: AdminManagement,
    redirect: '/management/product/store',
    children: [
      {
        path: 'user/store',
        name: 'UserStore',
        component: UserStoreManagement
      },
      {
        path: 'user/loan',
        name: 'UserLoan',
        component: UserLoanManagement
      },
      {

        path: 'product/store',
        name: 'Store',
        component: ProductStoreManagement
      },
      {
        path: 'product/loan',
        name: 'Loan',
        component: ProductLoanManagement
      }


    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

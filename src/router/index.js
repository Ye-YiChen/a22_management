import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManagement from '../components/UserManagement.vue'
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
    children: [
      {
        path: 'user',
        name: 'User',
        component: UserManagement
      },
      {
        path: '/managment/product',
        name: 'Product',
        redirect: '/management/product/store',
        children: [
          {
            path: '/management/product/store',
            name: 'Store',
            component: ProductStoreManagement
          },
          {
            path: '/management/product/loan',
            name: 'Loan',
            component: ProductLoanManagement
          }
        ]
      },
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

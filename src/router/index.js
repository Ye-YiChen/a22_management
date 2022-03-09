import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManagement from '../views/UserManagement.vue'
import ProductStoreManagement from '../views/ProductStoreManagement.vue'
import ProductLoanManagement from '../views/ProductLoanManagement.vue'

Vue.use(VueRouter)

const routes = [
{
  path:'/',
  redirect: '/user'

},
  {
  path:'/user',
  name: 'User',
  component:UserManagement
},
{
  path:'/product',
  name:'Product',
  redirect: '/product/store'

},
{
  path:'/product/store',
  name:'Store',
  component:ProductStoreManagement
},
{
  path:'/product/loan',
  name:'Loan',
  component:ProductLoanManagement
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

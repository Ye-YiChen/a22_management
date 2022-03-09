import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManagement from '../views/UserManagement.vue'
import ProductManagement from '../views/ProductManagement.vue'

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
  component:ProductManagement
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

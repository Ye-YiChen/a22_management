import Vue from 'vue'
import VueRouter from 'vue-router'
// import Header from '../views/Header'
import UserManagement from '../views/UserManagement'
import ProductManagement from '../views/ProductManagement'

Vue.use(VueRouter)

const routes = [
{
  path:'/user',
  name: 'User',
  comments:UserManagement
},
{
  path:'/product',
  name:'Product',
  comments:ProductManagement
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

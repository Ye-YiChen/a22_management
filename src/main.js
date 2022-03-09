import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { 
  Button,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Table,
  TableColumn,
  Empty } from 'element-ui';
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Empty)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import dayjs from 'dayjs'
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
  Empty,
  Pagination,
  MessageBox,
  Form,
  FormItem,
  Tag,
  Loading,
  Dialog,
  Input,
  Select,
  Option,
  InputNumber,
  DatePicker,
  Cascader,
  CheckboxButton,
  CheckboxGroup,
  CollapseItem,
  Collapse
} from 'element-ui';
import minin from './assets/goRoute'
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
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(CollapseItem)
Vue.use(Collapse)


Vue.mixin(minin)
Vue.prototype.dayjs = dayjs

Vue.prototype.MessageBox = MessageBox
Vue.prototype.axios = axios;
// axios.defaults.withCredentials = true
// axios基本设置
axios.defaults.baseURL = 'http://47.113.180.139:8080'
// 代理服务器 请求本地
// axios.defaults.baseURL = 'http://47.113.224.43:90/'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

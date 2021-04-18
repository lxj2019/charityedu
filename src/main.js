import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './permission' // permission control
import ViewUI from 'view-design'
import VueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'
import 'view-design/dist/styles/iview.css'
import '@/styles/index.scss' // global css

import '@/icons' // icon
import { Input, Menu, Submenu, MenuItem, Cascader, DropdownItem, DropdownMenu, Dropdown, scrollbar, Tree, Select } from 'element-ui'

// 解决路由重复问题
// import Router from 'vue-router'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Cascader)
Vue.use(VueVideoPlayer)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dropdown)
Vue.use(scrollbar)
Vue.use(Tree)
Vue.use(Select)

// import { Message } from 'view-design'
// Vue.prototype.$Message = Message
Vue.config.productionTip = false

Vue.use(ViewUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


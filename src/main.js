import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/index";
// import './permission' // permission control
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import { Input, Menu, Submenu, MenuItem, Cascader } from 'element-ui';

Vue.use(Input)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Cascader);
Vue.use(VueVideoPlayer)

// import { Message } from 'view-design'
// Vue.prototype.$Message = Message
Vue.config.productionTip = false

Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
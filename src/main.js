import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false
//移动端防点击
fastclick.attach(document.body)
//懒加载
Vue.use(VueLazyload,{
	loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

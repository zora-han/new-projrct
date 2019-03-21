// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font-icon/iconfont.css'



import App from './App'
import Login from './components/Login'


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Login);

// Vue.use($);
// Vue.use(Jetsennet);

const router = new VueRouter({
  routes:[
    {
      path:'/',
      component:Login
    }
  ],
  mode:"hash"
})

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})

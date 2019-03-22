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
import ErrorPage from './components/ErrorPage'


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);

Vue.use(Login);
Vue.use(ErrorPage);


const router = new VueRouter({
  base:'/secops/nsoc/',
  routes:[
    {
      path:'/',
      name:'home',
      component:Login
    },
    {
      path:'/Login',
      name:'login',
      component:Login
    },
    { 
      path: '*', 
      component: ErrorPage 
    }
  ],
  mode:"history"
})

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})

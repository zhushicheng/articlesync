import Vue from 'vue';
import VueMoment from 'vue-moment';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
// import store from './store';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.use(VueMoment);

Vue.config.productionTip = false;

// const app =
new Vue({
  router,
  //   store,
  render: (h) => h(App),
}).$mount('#app');
// const appDiv = document.createElement('div');
// appDiv.id = 'synciconapp';
// document.body.appendChild(appDiv);
// app.$mount('#app');

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import './assets/tailwind.css'
import 'fullpage.js/vendors/scrolloverflow' 
import VueFullPage from 'vue-fullpage.js'
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false;
Vue.use(VueFullPage);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

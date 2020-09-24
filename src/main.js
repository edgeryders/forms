import Vue from 'vue'
import App from './App.vue'
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

window.md = require("markdown-it")({
  html: true,
});

import VueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(VueSmoothScroll)


Vue.config.productionTip = false

new Vue({ render: h => h(App) }).$mount('#app')

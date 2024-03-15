import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "@vuelidate/core";

import "./assets/main.css";

Vue.use(Vuelidate);
Vue.config.devtools = true;
Vue.config.debug = true;
Vue.config.silent = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");

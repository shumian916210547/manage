import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
// 导入富文本编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import TreeTable from "vue-table-with-tree-grid";
Vue.component("tree-table", TreeTable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");

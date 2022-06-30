import Vue from 'vue'
import App from './App.vue'

// 导入三级联动组件将其设置为全局组件
import typeNav from "@/components/typeNav"

// 导入分页器组件
import Pagination from "@/components/Pagination"

// 第一个参数全局组件的名字（name），第二个参数组件名
Vue.component(typeNav.name,typeNav)

Vue.component(Pagination.name,Pagination)

// 导入路由
import router from "@/router/index"

// 导入仓库
import store from "@/store/index"

// 导入mock
import "@/mock/mockServer"

// 导入element-ui
import { MessageBox ,Button} from 'element-ui';
// 第一种引入方法
Vue.component(Button.name, Button);
// 第二种引入方法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false
/*
  之前的操作都是将接口的数据存到vuex中
  如果没有vuex，那么可以将接口全部放到全局事件中
  这样的好处是全部的组件都可以使用，那么获取的数据就保存到data中
 */
// 导入全部的API
import * as API from "@/API/index"
new Vue({
  render: h => h(App),
  //绑定全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')

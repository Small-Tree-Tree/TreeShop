// Vuex模块式开发
import Vue from "vue"
import Vuex from "vuex"
// 使用 Vuex
Vue.use(Vuex)

// 在这里进行和之前学习的Vuex不同的是,将大仓库拆分成小仓库
// 导入小仓库
import home from "./home"
import search from "./search"
import detail from "./detail"
import addShopCarSuccess from "./addShopCarSuccess"
import shopCart from "./shopCart"
import userInfo from "./userInfo"

export default new Vuex.Store({
    modules:{
        // 注册小仓库
        home,
        search,
        detail,
        addShopCarSuccess,
        shopCart,
        userInfo
    }
})
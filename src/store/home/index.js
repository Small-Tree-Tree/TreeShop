// home 小仓库
// 导入之前封装好的三级列表请求
import {bannerList, requsetList, floorList} from "@/API/index"
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const actions = {
    async categoryList({commit}){
        // 发送请求
        let result = await requsetList()
        // 判断状态码
        if(result.code == 200)
        {
            // 将数据提交
            commit('CATEGORYLIST',result.data)
        }
    },

    async bannerList({commit}){
        let result = await bannerList()
        if(result.code == 200)
        {
            commit('BANNERLIST',result.data)
        }
    },

    async floorList({commit}){
        let result = await floorList()
        if(result.code == 200)
        {
            commit('FLOORLIST',result.data)
        }
    }
}

const mutations = {
    CATEGORYLIST(state,data){
        state.categoryList = data
    },
    BANNERLIST(state,data){
        state.bannerList = data
    },
    FLOORLIST(state,data){
        state.floorList = data
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
// search仓库
import {searchList} from "@/API/index"

const state = {
    searchLish:{}
}

const actions = {
    async searchReq({commit},params={}){
        let result = await searchList(params)
        if(result.code == 200)
        {
            commit('SEARCHREQ',result.data)
        }
    }
}

const mutations = {
    SEARCHREQ(state,data){
        state.searchLish = data
    }
}

/*
    计算属性
    项目中getters主要的作用是:简化仓库种的数据(简化数据为生)
    可以把我们将来组件需要用的数据简化一下
    组件在获取数据的时候使用mapGetters
 */
const getters = {
    /*
        为什么要使用 || ,因为如果网络不好服务器出问题导致
        拿不到数据,就会返回undefined,undefined不能够进行遍历
        就会报错 
     */
    goodsList(state){
        return state.searchLish.goodsList || []
    },
    trademarkList(state){
        return state.searchLish.trademarkList || []
    },
    attrsList(state){
        return state.searchLish.attrsList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
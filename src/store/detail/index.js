// 导入API接口
import { detailList } from "@/API"
// 导入封装后的获取uuid函数
import getUUID from "@/util/UUID_TOKEN"
const actions = {
    async getDetail({commit},params){
        let result = await detailList(params)
        if(result.code == 200)
        {
            commit('GETDETAIL',result.data)
        }
    }
}

const mutations = {
    GETDETAIL(state,data){
        state.detailData = data
    }
}

const state = {
    detailData:{},
    /* 
        /api/cart/addToCart/{ skuId }/{ skuNum },因为添加购物车的接口只能传两个参数,
        所以只能通过请求头进行传递uuid,这个请求头的字段是和后端人员协商后添加的字段,
        所以uuid在vuex中进行获取,在这里创建一个变量用来存储uuid,但是又遇到了问题,每次调用
        uuid的值会发生变化,所以将其封装成一个函数用来进行判断并且将uuid存到本地中,当获取到uuid
        则将他添加到请求头中,那么应该要去找请求拦截器
     */
    uuid:getUUID()
}

const getters = {
    categoryView(state){
        // 这里需要注意：
        /*
            发请求是异步行为：如果还没有获取到数据，则state.detailData.categoryView值为undefined，
            会导致后面使用的时候会报错，因为 undefined.属性会有问题,所以这里的解决办法可以使用 || ，
            这里使得如果还没从服务器上获取到数据，它起码还是个对象，对象.属性值为undefined也没关系
         */
        return state.detailData.categoryView || {}
    },
    skuInfo(state){
        return state.detailData.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailData.spuSaleAttrList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}
import { shopCartRes, addShopCarSuccess, deletShopCart, shiftChecked } from "@/API"

const actions = {
    /*
        在这里需要获取添加购物车的列表,添加到购物车的接口/api/cart/addToCart/{ skuId }/{ skuNum }
        但是遇到了问题获取不到,原因是服务器不知道你是谁,所以需要有个唯一的身份,这里使用uuid来存储唯一的身份
        npm install uuid,那么我们需要在detail组件中,当点击完加入购物车去存储一个临时的身份
     */
    async shopCartList({ commit }) {
        let result = await shopCartRes()
        if (result.code == 200) {
            commit('SHOPCARTLIST', result.data)
        }
    },
    // 处理商品数量
    async shopNum({ commit }, { skuId, skuNum }) {
        let result = await addShopCarSuccess(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //处理删除商品
    async delShopCart({ commit }, skuId) {
        let result = await deletShopCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }

    },
    //处理勾选状态
    async modifyChecked({commit},{skuId,isChecked}){
        let result = await shiftChecked(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //处理删除选中的商品
    async selectShopDel({getters,dispatch}){
        /* 
            在这里遇到了问题,因为删除全部的按钮不在遍历中,
            所以拿不到数据
            这里就用到了context,平时在使用的时候我们只是拿commit进行使用
            实际上context是一个小仓库
         */
        let promiseAll = []
        let shopList = getters.shopCartData.cartInfoList
        shopList.forEach(item=>{
            /*
                在这里我们调用的是删除商品的回调,他会返回成功和失败,所以我们把
                选中的,发请求的状态进行存储
             */
            let result = item.isChecked == '1' ? dispatch('delShopCart',item.skuId):''
            promiseAll.push(result)
        })
        /* 
            这里使用Promise.all方法,只有所以的状态都成功才成功
         */
        return Promise.all(promiseAll)   
    },
    // 处理全选
    async checkShopAll({getters,dispatch},isChecked){
        /*
            在这里遇到了问题,因为删除全部的按钮不在遍历中,
            所以拿不到数据
            这里就用到了context,平时在使用的时候我们只是拿commit进行使用
            实际上context是一个小仓库
        */
       let promiseAll = []
       getters.shopCartData.cartInfoList.forEach(item=>{
        let promise = dispatch('modifyChecked',{skuId:item.skuId,isChecked})
        promiseAll.push(promise)
       })
       return Promise.all(promiseAll)
    }
}
const mutations = {
    SHOPCARTLIST(state, data) {
        state.shopList = data || []
    }
}
const state = {
    shopList: ''
}

const getters = {
    shopCartData(state) {
        return state.shopList[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}
import {addShopCarSuccess} from "@/API/index"

const actions = {
    async addShopCar({commit},{skuId,saleVal}){
        /*
            在这里需要注意，不需要像之前一样将数据存起来，因为只是通知
            服务器存储数据，而且服务器返回的只有状态没有数据，所以不需要存储 
            所以这里需要返回成功或者失败
         */
        let result = await addShopCarSuccess(skuId,saleVal)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('失败'))
        }
    }
}
const mutations = {}

const state = {
   
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}
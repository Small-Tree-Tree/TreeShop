import { codeResquest,registerRes, LoginRes ,autoLoginRes, loginOutRes} from "@/API"
// 导入处理token的函数
import { setToken ,getToken, clearToken } from "@/util/Token"
const actions = {
    // 处理验证码
    async getCodeRes({commit},phone){
        let result = await codeResquest(phone)
        if(result.code == 200){
            commit('GETCODERES',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //处理注册是否成功
    async achieveRes({commit},data){
        let result = await registerRes(data)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    // 处理登录是否成功
    async handleLoginRes({commit},data){
        let result = await LoginRes(data)
        if(result.code == 200){
            commit('HANDLELOGINRES',result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    // 处理自动登录
    async autoLogin({commit}){
        let result = await autoLoginRes()
        if(result.code == 200){
            commit('AUTOLOGION',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 处理退出登录
    async handleloginOut({commit}){
        let result = await loginOutRes()
        if(result.code == 200){
            // 如果返回成功则表示服务器已经清除token
            // 但是本地存储和变量还没有清除
            commit('HANDLELOGINOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    // 处理验证码
    GETCODERES(state,data){
        state.code = data
    },
    // 处理登录获取token
    HANDLELOGINRES(state,token){
        state.token = token
    },
    // 处理登录获取的用户信息
    AUTOLOGION(state,data){
        state.user = data
    },
    // 处理退出登录
    HANDLELOGINOUT(state){
        state.token = ''
        state.user = {}
        // 清除本地存储
        clearToken()
    }
}
const state = {
    code:'',
    // 这里读取是否有token如果没有返回none
    token:getToken(),
    user:{}
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}
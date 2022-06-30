// 将封装过的axios导入
import mock from "./mock"
import request from "./request"
// 三级联动接口
// 出现跨域问题，所以需要配置代理服务器
export const requsetList = ()=>{
    return request({
        // /api不写，因为在二次封装的时候配置了baseURL
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

// banner接口
export const bannerList = ()=>{
    return mock({
        url:'/banner',
        method:'get'
    })
}

// floor接口
export const floorList = ()=>{
    return mock({
        url:'/floor',
        method:'get'
    })
}

// search接口
// 当前这个接口,给服务器传参数至少是一个空对象
export const searchList = (params)=>{
    return request({
        url:"/list",
        method:'post',
        data:params
    })
}

// 商品详细信息接口
export const detailList = (params)=>{
    return request({
        url:`/item/${params}`,
        method:'get'
    })
}

// 购物车加入成功接口
export const addShopCarSuccess = (skuId,skuNum)=>{
    return request({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

// 购物车列表接口
export const shopCartRes = ()=>{
    return request({
        url:'/cart/cartList',
        method:'get'
    })
}

// 删除购物车接口
export const deletShopCart = (skuId)=>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}


// 切换选中的接口
export const shiftChecked = (skuId,isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// 验证码接口
export const codeResquest = (phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 注册接口
export const registerRes = (data)=>{
    return request({
        url:'/user/passport/register',
        method:'post',
        data:data
    })
}

// 登录接口
export const LoginRes = (data)=>{
    return request({
        url:'/user/passport/login/',
        method:'post',
        data:data
    })
}


// 自动登录的接口
export const autoLoginRes = ()=>{
    // 不需要传参，但是需要携带请求头指定字段
    return request({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

// 退出登录
export const loginOutRes = ()=>{
    return request({
        url:'/user/passport/logout',
        method:'get'
    })
}

// 获取订单交易页的数据
export const tradeInfoRe = ()=>{
    return request({
        url:'/order/auth/trade',
        method:'get'
    })
}

// 获取默认地址
export const addressRe = ()=>{
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

// 提交订单
export const submitOrderRe = (tradeNo,data)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:data
    })
}

// 获取订单支付的信息
export const payOrderInfoRe = (orderId)=>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

// 查询订单的状态
export const payOrderStateRe = (orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}
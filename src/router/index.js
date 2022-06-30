/* 配置路由区域*/
import Vue from "vue"
import VueRouter from "vue-router"
// 使用插件
Vue.use(VueRouter)

// 引入路由组件 (下面使用了路由懒加载)
// import Home from '../page/Home'
// import Login from '../page/Login'
// import Register from '../page/Register'
// import Search from '../page/Search'
// import Detail from '../page/Detail'
// import AddCart from "../page/AddCartSuccess"
// import ShopCart from "../page/ShopCart"
// import Trade from "../page/Trade"
// import Pay from "../page/Pay"
// import PaySuccess from "../page/PaySuccess"
import store from "@/store"
// 重写路由组件
// 用来保存原来的push和replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push
// 在这里需要注意上下文的指向
/* 
    call和apply
    相同点:都可以调用函数一次,都可以篡改函数的上下文一次
    不同点:传递参数的时候,call是用逗号隔开,apply是传递数组
*/
VueRouter.prototype.push = function (argument, resolve = () => { }, reject = () => { }) {
    if (resolve && reject) {
        originPush.call(this, argument, resolve, reject)
    }
}

VueRouter.prototype.replace = function (argument, resolve = () => { }, reject = () => { }) {
    if (resolve && reject) {
        originReplace.call(this, argument, resolve, reject)
    }
}



//配置路由
let routes = new VueRouter({
    routes: [
        {
            path: '/shop-paysuccess',
            // 路由懒加载
            component: ()=>import('@/page/PaySuccess'),
            meta: { show: true },
            name:'shop-paysuccess'
        },
        {
            path: '/shop-pay',
            component: ()=>import('@/page/Pay'),
            meta: { show: true },
            name:'shop-pay'
        },
        {
            path: '/shop-trade',
            component: ()=>import('@/page/Trade'),
            meta: { show: true },
            name:'shop-trade'
        },
        {
            
            path: '/shop-shopcart',
            component: ()=>import('@/page/ShopCart'),
            meta: { show: true },
            name:'shop-shopcart'
        },
        {
            
            path: '/shop-addcartsuccess',
            component: ()=>import('@/page/AddCartSuccess'),
            meta: { show: true },
            name:'shop-addcartsuccess'
        },
        {
            // 使用params参数需要占位
            path: '/shop-detail/:sku',
            component: ()=>import('@/page/Detail'),
            meta: { show: true }
        },
        {
            // name的值
            path: '/shop-home',
            // 组件名
            component: ()=>import('@/page/Home'),
            // 配置路由元信息,用于判断组件的显示或者隐藏
            meta: { show: true }
        },
        {
            // name的值
            name:'shop-login',
            path: '/shop-login',
            // 组件名
            component: ()=>import('@/page/Login'),
            // 配置路由元信息,用于判断组件的显示或者隐藏
            meta: { show: false }
        },
        {
            // name的值
            name:'shop-register',
            path: '/shop-register',
            // 组件名
            component: ()=>import('@/page/Register'),
            // 配置路由元信息,用于判断组件的显示或者隐藏
            meta: { show: false }
        },
        {
            // name的值
            // 使用params参数需要占位
            path: '/shop-search/:keyword?',
            // 组件名
            component: ()=>import('@/page/Search'),
            // 配置路由元信息,用于判断组件的显示或者隐藏
            meta: { show: true },
            name: 'shop-search',
            // props:($route)=>{
            //     return {
            //         keyword:$route.params.keyword,
            //         k:$route.query.k
            //     }
            // }
        },
        {
            // 设置默认跳转到主页
            path: '/',
            redirect: '/shop-home'
        }
    ],
    scrollBehavior () {
        return { y: 0 }
    }
})

// 全局守卫：前置守卫
// to:要到哪里去
// from：从哪里来
// next: 放行
/*
    需求：
    1. 当我们已经登录的时候就不允许在回到登录页
    2. 当我们一刷新用户就会退出登录
 */
routes.beforeEach(async (to,from,next)=>{
    // 判断是否已经登录，因为登录了才能获取token
    if(store.state.userInfo.token){
        // 登录了并且需要判断是否要跳到login页面
        if(to.name == 'shop-login'){
            // 返回首页
            next('/shop-home')
        }else{
            // 跳到其他页面，放行并且还需要判断是否有用户名没有的话重新派发
            if(store.state.userInfo.user.name){
                next()
            }else{
                // 没有用户名
                try {
                    await store.dispatch('autoLogin')
                    next()
                } catch (error) {
                    // 表示token失效了，清除原来的token，重新获取token，保存token，再次派发
                    store.dispatch('handleloginOut')
                    next('/shop-login')
                }
            }
        }
    }else{
        // 未登录， 这里先进行放行
        next()
    }
})

export default routes

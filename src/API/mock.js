import axios from "axios";
// 对axios进行二次封装
// 通过axios中create的方法创建axios的实例对象

// 导入进度条
import nprogress from "nprogress";
// 导入进度条的样式
import "nprogress/nprogress.css"

const requests  = axios.create({
    // 配置对象
    // 基础路径，发送请求的时候就会自动添加api
    baseURL:'/mock',
    // 代表请求超时的时间
    timeout:5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config配置对象，对象中一个属性很重要，请求头
    // 进度条开始
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})

export default requests

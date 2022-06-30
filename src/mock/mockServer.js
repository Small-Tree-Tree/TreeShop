// 需要知道，为啥json文件没有暴露就可以使用
// 它和css一样不需要向外暴露（因为默认暴露）
// 导入mock模块
import Mock from "mockjs"
// 导入模拟数据
import banner from "./banners.json"
import floor from "./floors.json"

// 使用Mock中的mock方法
// 第一个参数请求的路径，第二个参数请求的数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

// 最后到入口文件中执行

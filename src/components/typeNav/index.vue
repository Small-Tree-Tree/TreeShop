<template>
    <div class="type-nav" @mouseleave="hidden">
    <div class="container">
        <h2 class="all" @mouseenter="modifyShow">全部商品分类</h2>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
        <!-- 动画效果，如果加了name，那么在写样式的时候就需要name-enter的形式 -->
        <transition name="sort">
            <div class="sort" v-show="isshow">
                <div class="all-sort-list2" @click="toSearch">
                    <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                        <h3 @mouseenter="modifyBg(index)" @mouseleave="clearBg" :class="{bg:index === currentIndex}">
                            <a :data-categoryName = "c1.categoryName" :data-category1Id = "c1.categoryId">{{c1.categoryName}}</a>
                        </h3>
                        <div class="item-list clearfix">
                            <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName = "c2.categoryName" :data-category2Id = "c2.categoryId">{{c2.categoryName}}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName = "c3.categoryName" :data-category3Id = "c3.categoryId">{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    name:'typeNav',
    data(){
        return {
            currentIndex:-1,
            isshow :true
        }
    },
    computed:{
        // 给store中取数据,使用mapState函数
        // 对象的写法,如果右侧是函数,则state参数可以拿到大仓库数据
        ...mapState({
            categoryList:(state)=>{
                return state.home.categoryList
            }
        })
    },
    methods:{
        modifyBg(index){
            this.currentIndex = index
        },
        clearBg(){
            this.currentIndex = -1
        },
        toSearch(event){
            // 获取触发事件的目标
            let ele = event.target
            // event.dataset 可以获取到当前节点上的自定义属性
            // 这里还需要注意一下，我们命名的时候使用的是驼峰命名当时浏览器会全部转成小写
            // 所以取的时候需要注意
            let {categoryname,category1id,category2id,category3id} = ele.dataset
            // 进入判断表示点击的是a标签
            if(categoryname)
            {
                let location = {name:"shop-search"}
                let query = {categoryName:categoryname}
                if(category1id)
                {
                    query.category1Id = category1id
                }else if(category2id)
                {
                    query.category2Id = category2id
                }else
                {
                    query.category3Id = category3id
                }
                location.query = query
                // 合并query参数和params参数
                if(this.$route.params)
                {
                    location.params = this.$route.params
                    this.$router.push(location)
                }
                
            }
        },
        //鼠标移入进行展示
        modifyShow(){
            if(this.$route.path != "/shop-home")
            this.isshow = true
        },
        // 鼠标移出隐藏
        hidden(){
            if(this.$route.path != "/shop-home")
            this.isshow = false
        } 
    },
    mounted(){
        
        // 当路由跳转后会重新挂载，所以在这里去改变isshow的状态
        if(this.$route.path != "/shop-home")
        {
            this.isshow = false
        }
    }
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 510px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        .bg{
                            background-color:rgb(235, 234, 234) ;
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
            // 鼠标进入样式
            .sort-enter{
                opacity: 0;
            }
            // 鼠标移出样式
            .sort-enter-to{
                opacity: 1;
            }
            // 过渡效果
            .sort-enter-active{
                transition: all 0.4s linear;
            }
        }
    }
</style>
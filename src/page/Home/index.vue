<template>
  <div>
    <!-- 使用全局组件不需要导入和注册 -->
    <typeNav></typeNav>
    <listContain></listContain>
    <todayRecommend></todayRecommend>
    <rank></rank>
    <like></like>
    <!-- props用于父子组件间的通信,利用的是动态绑定属性 -->
    <floor v-for="item in floorList" :floorList = "item" :key="item.id"></floor>
    <brand></brand>
  </div>
</template>

<script>
import listContain from "@/page/Home/listContain"
import todayRecommend from "@/page/Home/todayRecommend"
import rank from "@/page/Home/rank"
import like from "@/page/Home/like"
import floor from "@/page/Home/floor"
import brand from "@/page/Home/brand"

import { mapState } from "vuex"

export default {  
    name:'shop-home',
    components:{
      listContain,
      todayRecommend,
      rank,
      like,
      floor,
      brand
    },
    computed:{
      ...mapState({
        floorList:(state)=>{
          return state.home.floorList
        }
      })
    },
    mounted(){
      this.$store.dispatch('autoLogin')
    }
}
</script>

<style>

</style>
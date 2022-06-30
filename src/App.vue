<template>
  <div>
    <Header></Header>
    <!-- 使用路由 -->
    <router-view></router-view>
    <!-- 这里使用v-show是为了提高性能,因为v-if会不断去修改dom元素影响性能 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/shop-header.vue"
import Footer from "./components/Footer/shop-footer.vue"

export default {
  name:'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    // 通知store
    this.$store.dispatch('categoryList')
    this.$store.dispatch('bannerList')
    this.$store.dispatch('floorList')
  }
}
</script>

<style>

</style>
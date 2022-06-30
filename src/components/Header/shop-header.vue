<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>TreeShop欢迎您！</p>
          <p v-if="!userInfo">
            <span>请</span>
            <router-link to="/shop-login">登录</router-link>
            <router-link to="/shop-register" class="register"
              >免费注册</router-link
            >
          </p>
          <p v-else>
            <a style="cursor:pointer;">{{userInfo}}</a>
            <a class="register" style="cursor:pointer" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的TreeShop</a>
          <a href="###">TreeShop会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注TreeShop</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link
          to="/shop-home"
          class="logo"
          title="TreeShop"
          target="_blank"
        >
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "shop-header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 处理搜索
    toSearch() {
      /* 第一种写法字符串拼接 */
      // this.$router.push('/shop-search/'+this.keyword+'?k='+this.keyword.toUpperCase())
      /* 第二种写法模板字符串 */
      // this.$router.push(`/shop-search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      /* 
                第三种写法 对象 (最常用的方式) 
                需要在路由中配置name属性
            */
      if (this.$route.query) {
          let location = {name:'shop-search',params:{keyword: this.keyword || undefined}}
          location.query = this.$route.query
          this.$router.push(location)
      }
    },
    // 退出登录
    async loginOut(){
      try {
        await this.$store.dispatch('handleloginOut')
        // 退出登录成功则跳转回主页
        this.$router.push('shop-home')
      } catch (error) {
        return alert(error) 
      }
    }
  },
  mounted(){
    this.$bus.$on('clearKey',()=>{
      this.keyword = ''
    })
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo.user.name
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
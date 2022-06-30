<template>
  <div>
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 处理点击全部分类 面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="clearCategoryName">×</i>
            </li>
            <!-- 处理搜索框输入 面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="clearKeyword">×</i>
            </li>
            <!-- 处理品牌 面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="clearBrandName">×</i>
            </li>
            <!-- 处理平台售卖属性 面包屑 -->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="item.attrId"
            >
              {{ item.split(":")[1] }}<i @click="clearAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->

        <SearchSelector @brandName="brandName" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a @click="orderList('1')"
                    >综合<span
                      v-if="isOne"
                      class="iconfont"
                      :class="{ 'icon-jiangxu': isDesc, 'icon-shengxu': isAsc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }">
                  <a @click="orderList('2')"
                    >价格<span
                      v-if="isTwo"
                      class="iconfont"
                      :class="{ 'icon-jiangxu': isDesc, 'icon-shengxu': isAsc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/shop-detail/${item.id}`">
                      <img :src="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 
              pageNo : 表示的是当前所点击的页数
              pageSize : 表示的一页展示多少条数据
              total : 表示的是总的数据又多少条
              continue :　表示是的是连续展示多少页
           -->
          <Pagination
            @getPageInfo="getPageInfo"
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="totalPage"
            :continue="5"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { mapGetters, mapState } from "vuex";
import Pagination from "../../components/Pagination/index.vue";
export default {
  name: "shop-search",
  components: {
    SearchSelector,
    Pagination,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级菜单
        category1Id: "",
        // 二级菜单
        category2Id: "",
        // 三级菜单
        category3Id: "",
        // 分类名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器,代表当前的第几页
        pageNo: 1,
        // 代表的是每一个展示的数据的个数
        pageSize: 10,
        // 参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    /*
        合并对象,同键值进行合并
        Object.assign (a,b)
        在发起请求之前进行参数整合
       */
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 合并完对象后发请求,但是只能发送一次请求
    // 解决办法:发现路由在不断的变化,所以可以监听路由的变化

    this.getSearchData();
  },
  computed: {
    // mapGetters里面的写法是传递数组,而mapStates传的是对象
    ...mapGetters(["goodsList"]),

    ...mapState({
      totalPage: (state) => {
        return state.search.searchLish.total;
      },
    }),

    // 用于去判断是asc还是desc
    isAsc() {
      return this.searchParams.order.split(":")[1] == "asc";
    },
    isDesc() {
      return this.searchParams.order.split(":")[1] == "desc";
    },

    // 判断点击的是综合还是价格
    isOne() {
      return this.searchParams.order.split(":")[0] == "1";
    },
    isTwo() {
      return this.searchParams.order.split(":")[0] == "2";
    },
  },
  methods: {
    // 发送请求
    getSearchData() {
      this.$store.dispatch("searchReq", this.searchParams);
    },
    // 清空category面包屑
    clearCategoryName() {
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // 置空完再次发送请求
      this.getSearchData();
      // params参数保留,将query参数清空
      this.$router.push({ name: "shop-search", params: this.$route.params });
    },
    // 清空关键字面包屑
    clearKeyword() {
      this.searchParams.keyword = "";
      // 通知Header组件清空input框中的内容
      this.$bus.$emit("clearKey");

      // 重新发送请求
      this.getSearchData();

      // query参数保留,将params参数清空
      this.$router.push({ name: "shop-search", query: this.$route.query });
    },
    // 接收子组件传过来的品牌信息
    brandName(item) {
      // 因为品牌接口需要传递参数是 id：品牌名称，需要整理参数
      let id = item.tmId;
      let name = item.tmName;
      this.searchParams.trademark = `${id}:${name}`;
      // 重新发请求
      this.getSearchData();
    },
    // 清空品牌的面包屑
    clearBrandName() {
      this.searchParams.trademark = "";
      this.getSearchData();
    },
    // 接收子组件传过来的属性信息
    attrInfo(item, val) {
      // 接口需要传的是数组-格式为：["属性ID:属性值:属性名"]
      let data = `${item.attrId}:${val}:${item.attrName}`;
      console.log(item);
      // 判断是否重复
      if (!this.searchParams.props.includes(data)) {
        this.searchParams.props.push(data);
      }
      // 重新发送请求
      this.getSearchData();
    },
    // 清空平台属性面包屑
    clearAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getSearchData();
    },
    // 处理排序
    orderList(flag) {
      // 1: 综合 2: 价格  asc: 升序,desc: 降序
      // 1:asc 1:desc 2:asc 2:desc
      let originFlag = this.searchParams.order.split(":")[0];
      let originState = this.searchParams.order.split(":")[1];
      if (flag === originFlag) {
        this.searchParams.order = `${originFlag}:${
          originState == "desc" ? "asc" : "desc"
        }`;
      } else {
        this.searchParams.order = `${flag}:desc`;
      }
      this.getSearchData();
    },
    // 分页器 pagination传递的数据
    getPageInfo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getSearchData();
    },
  },
  // 监视路由跳转发送请求
  watch: {
    $route: {
      handler(newValue, oldValue) {
        // 在发送请求之前先进行参数整合
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        // 整合完后在发请求
        this.getSearchData();
        // 清除上一次的记录
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
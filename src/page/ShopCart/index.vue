<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="shiftChecked(item.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handleShopNum('reduce', item, item.skuNum)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handleShopNum('change', item, $event.target.value * 1)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handleShopNum('add', item, item.skuNum)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delShop(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked" @change="checkAll"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllShop">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="shop-trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
    在这里需要获取添加购物车的列表,添加到购物车的接口/api/cart/addToCart/{ skuId }/{ skuNum }
    但是遇到了问题获取不到,原因是服务器不知道你是谁,所以需要有个唯一的身份,这里使用uuid来存储唯一的身份
    npm install uuid,那么我们需要在detail组件中,当点击完加入购物车去存储一个临时的身份
*/
import { mapGetters } from "vuex";
import throttle from "@/../node_modules/lodash/throttle";
export default {
  name: "shop-shopcart",
  mounted() {
    this.getShopList();
  },
  methods: {
    getShopList() {
      this.$store.dispatch("shopCartList");
    },
    // 处理修改商品数量
    // /api/cart/addToCart/{ skuId }/{ skuNum }商品数量 正数代表增加 负数代表减少
    // 变化量加 1传1   变化量减 1传 -1  不变传0
    // 但是这里会遇到问题,就是当用户点击过快的时候会出现负数的情况,可以用防抖或者是节流
    handleShopNum: throttle(async function (type, shop, shopNum) {
      switch (type) {
        case "add":
          shopNum = 1;
          break;

        case "reduce":
          // 需要判断商品的数量是否是大于1
          shopNum = shopNum > 1 ? -1 : 0;
          break;

        case "change":
          // 判断输入的值是否非法,是否小于1,如果小于1则不改变数量
          if (isNaN(shopNum) || shopNum < 1) {
            shopNum = 0;
          } else {
            // 这里我们需要的是变化量而不是最终结果
            shopNum = parseInt(shopNum) - shop.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("shopNum", {
          skuId: shop.skuId,
          skuNum: shopNum,
        });
        this.getShopList();
      } catch (error) {
        alert("请求失败");
      }
    }, 1000),

    // 处理删除事件
    async delShop(skuId) {
      if (window.confirm("确定删除该商品")) {
        try {
          // 如果成功则再次发送请求
          await this.$store.dispatch("delShopCart", skuId);
          this.getShopList();
        } catch (error) {
          alert("请求失败");
        }
      }
    },

    // 处理切换商品选中事件
    async shiftChecked(skuId, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("modifyChecked", { skuId, isChecked });
        // 再次更新购物车列表
        this.getShopList();
      } catch (error) {
        alert("请求失败");
      }
    },

    // 处理删除选中的商品
    /* 
      删除选中的商品是没有接口的,只有一个一次只能删除一个的接口
      那么这里还是去派发action,因为那个接口在仓库中
     */
    async deleteAllShop() {
      if (window.confirm("是否删除全部商品")) {
        try {
          await this.$store.dispatch("selectShopDel");
          // 再次发请求获取购物车列表
          this.getShopList();
        } catch (error) {
          alert("fail");
        }
      }
    },

    // 处理全选按钮
    /* 
      和删除选中的商品一样,也是没有接口,也是拿不到数据传不了
     */
    async checkAll(event){
      try {
        let isChecked = event.target.checked ? '1' :'0'
        await this.$store.dispatch('checkShopAll',isChecked)
        this.getShopList()
      } catch (error) {
        alert('请求失败')
      }
    }
  },
  computed: {
    ...mapGetters(["shopCartData"]),
    // 获取购物车列表的数据
    cartInfoList() {
      return this.shopCartData.cartInfoList || [];
    },
    // 计算所有商品的价格
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum;
      });
      return sum;
    },
    // 计算全选的复选框
    allChecked() {
      // every方法遍历数组,判断数组中某个属性是否都一致,如果是则返回true,反之false
      return this.cartInfoList.every((item) => {
        return item.isChecked == "1";
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        display: flex;
        align-items: center;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 14px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      display: flex;
      align-items: center;

      .chosed {
        line-height: 26px;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
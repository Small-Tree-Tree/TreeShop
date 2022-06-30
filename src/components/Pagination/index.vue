<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageInfo', pageNo - 1)">
      上一页
    </button>
    <button v-show="handleContinue.start > 1" @click="$emit('getPageInfo', 1)" :class="{ active: pageNo == 1 }">
      1
    </button>
    <button :disabled="true" v-show="handleContinue.start > 2">···</button>

    <button
      v-for="(page, index) in parseInt(handleContinue.end)"
      :key="index"
      v-show="page >= parseInt(handleContinue.start)"
      @click="$emit('getPageInfo', page)"
      :data-keyPage="index"
      :class="{ active: page == pageNo }"
    >
      {{ page }}
    </button>

    <button :disabled="true" v-show="handleContinue.end < totalPage - 1">
      ···
    </button>
    <button
      v-show="handleContinue.end < totalPage"
      @click="$emit('getPageInfo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageInfo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continue"],
  data() {
    return {
      targetIndex: 0,
    };
  },
  computed: {
    // 计算总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页面的起始值和结束值
    handleContinue() {
      let start = 0;
      let end = 0;

      // 判断如果当前总页码小于连续页码
      if (this.totalPage < this.continue) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continue / 2);
        end = this.pageNo + parseInt(this.continue / 2);
        // 判读start是否为负数或者是0
        if (start < 1) {
          start = 1;
          end = this.continue;
        }
        // 判断end是否超过总页数
        if (end > this.totalPage) {
          start = this.totalPage - this.continue + 1;
          end = this.totalPage;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin-bottom: 10px;
  button {
    margin: 0 8px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ea4a36;
      color: #fff;
    }
  }
}
</style>
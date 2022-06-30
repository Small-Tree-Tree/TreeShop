<template>
  <div class="spec-preview">
    <!-- 小图 -->
    <img :src="imageObj.imgUrl" />
    <!-- 事件 -->
    <div class="event" ref="evenEle" @mousemove="handleGlass"></div>
    <!-- 大图 -->
    <div class="big">
      <img :src="imageObj.imgUrl" ref="bigImg"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="maskEle"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imageList"],
  data(){
    return{
      currIndex : 0
    }
  },
  computed: {
    imageObj() {
      return this.imageList[this.currIndex] || {};
    },
  },
  methods: {
    handleGlass(event) {
      let mask = this.$refs.maskEle;
      let evenEle = this.$refs.evenEle;
      let bigImg = this.$refs.bigImg
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      let leftMax = evenEle.offsetWidth - mask.offsetWidth;
      let topMax = evenEle.offsetHeight - mask.offsetHeight;

      if (left < 0) {
        left = 0;
      }
      if (left > leftMax) {
        left = leftMax;
      }
      if (top < 0) {
        top = 0;
      }
      if (top > topMax) {
        top = topMax;
      }

      mask.style.left = left + "px";
      mask.style.top = top + "px";

      bigImg.style.left = -(bigImg.offsetWidth/evenEle.offsetWidth)*left + 'px'
      bigImg.style.top = -(bigImg.offsetHeight/evenEle.offsetHeight)*top + 'px'
    },
  },
  mounted(){
    this.$bus.$on('sendIndex',(index)=>{
      this.currIndex = index
    })
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
<template>
  <div class="pos-fixed flex flex-center box-center-bottom-btn">
    <img :src="$cdn + backgrond" alt="" class="pos-abso box-100">
    <div class="flex flex-center center-box">
      <div class="pos-rela scene-box flex">
        <img :src="$cdn + '/assets/menu@2x.png'" alt="" class="pos-rela box-100 tl-0">
      </div>
      <p class="pos-rela select-scene-text">场景选择</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterBottom",

  data () {
    return {
      backgrond: "/assets/box@2x.png"
    }
  }
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 1080px) {
  .box-center-bottom-btn {
    bottom 0rem
    left 50%
    transform translate3d(-50%, 0, 0)
    width 3.15rem
    height 1.1rem
    flex-direction column
  }
  .center-box{
    width .8rem
    height 1.1rem
    flex-direction column
    justify-content space-around
  }
  .scene-box {
    width .56rem
    height .56rem
  }
  .select-scene-text{
    width .8rem
    height .25rem
    font-size .18rem
    font-family PingFangSC-Regular, PingFang SC
    font-weight 400
    color #030303
    line-height .25rem
  }
}
</style>

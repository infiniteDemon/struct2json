<template>
  <div class="flex flex-center mouse-box">
    <div class="pos-rela box-jt">
      <img :src="$cdn + '/assets/jt@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <transition
      appear
      enter-active-class="animated wobble"
      leave-active-class="animated wobble"
    >
      <div class="pos-rela box-mouse">
        <img :src="$cdn + '/assets/mouse@2x.png'" alt="" class="pos-abso box-100 tl-0">
      </div>
    </transition>
    <div class="pos-rela box-text">
      左右滑动 更多精彩
    </div>
  </div>
</template>

<script>
export default {
  name: "mouse"
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 1080px) {
  .mouse-box {
    width 2.80rem
    height 2.80rem
    background-color rgba(0, 0, 0, 0.59)
    border-radius .24rem
    flex-direction column
  }
  .box-jt{
    width 2.00rem
    height .40rem
  }
  .box-mouse{
    width .90rem
    height .90rem
  }
  .box-text{
    top .26rem
    font-size .20rem
    font-family PingFangSC-Regular, PingFang SC
    font-weight 400
    color #FFFFFF
    line-height .28rem

  }
}
</style>

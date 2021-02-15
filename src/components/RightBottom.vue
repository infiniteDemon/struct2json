<template>
  <div class="pos-fixed flex box-right-bottom-btn">
    <div class="pos-rela btn-box">
      <img :src="$cdn + '/assets/share@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <div class="pos-rela btn-box">
      <img :src="$cdn + '/assets/star@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <div class="pos-rela btn-box">
      <img :src="$cdn + '/assets/commont@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
  </div>
</template>

<script>
export default {
  name: "RightBottom",

  data () {
    return {
      isShowInfo: true,
      isShowMusic: true,
      isShowFullSceen: true,
      isShowVr: true,
      isShowClear: true
    }
  }
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 1080px) {
  .box-right-bottom-btn {
    width 2rem
    height .60rem
    background rgba(255, 255, 255, 0.3)
    border-radius .3rem
    bottom .3rem
    right .3rem
    align-items center
    justify-content space-around
  }
  .btn-box {
    width .4rem
    height .4rem
  }
}
</style>

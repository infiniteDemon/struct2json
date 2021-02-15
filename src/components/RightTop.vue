<template>
  <div class="pos-fixed flex box-right-top-btn">
    <div class="pos-rela btn-box" @click="click(1)">
      <img :src="$cdn + '/assets/desc@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <div class="pos-rela btn-box" @click="click(2)">
      <img :src="$cdn + '/assets/music-played@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <div class="pos-rela btn-box" @click="click(3)">
      <img :src="$cdn + '/assets/sceen@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <div class="pos-rela btn-box" @click="click(4)">
      <img :src="$cdn + '/assets/VR@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
    <div class="pos-rela btn-box" @click="click(5)">
      <img :src="$cdn + '/assets/clear@2x.png'" alt="" class="pos-abso box-100 tl-0">
    </div>
  </div>
</template>

<script>
export default {
  name: "RightTop",

  data () {
    return {
      isShowInfo: true,
      isShowMusic: true,
      isShowFullSceen: true,
      isShowVr: true,
      isShowClear: true
    }
  },

  methods: {
    click (param) {
      this.$emit("click", param)
    }
  }
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 1080px) {
  .box-right-top-btn {
    width.60rem
    height 3.50rem
    background rgba(255, 255, 255, 0.5)
    border-radius.40rem
    top .3rem
    right .3rem
    flex-direction column
    align-items center
    justify-content space-around
  }
  .btn-box {
    width .4rem
    height .4rem
  }
}
</style>

<template>
  <div class="pos-fixed box-left-top-btn flex flex-center">
    <div class="pos-rela logo-box" @click="click">
      <img :src="$cdn + logo" alt="" class="pos-abso box-100 tl-0">
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftTop",

  data () {
    return {
      logo: "/assets/icons/logo.png"
    }
  },

  methods: {
    click () {
      this.$emit("click")
    }
  }
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 1080px) {
  .box-left-top-btn {
    top .5rem
    left 0rem
    width 1.60rem
    height 1.00rem
    background rgba(255, 255, 255, 0.15)
    border-radius 0px 200px 200px 0px
  }
  .logo-box {
    width .7rem
    height .7rem
  }
}
</style>

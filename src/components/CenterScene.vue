<template>
  <div class="pos-fixed flex line-box">
    <div class="pos-rela thumb-box" v-for="(v, i) in thumbList" :key="i">
      <img :src="$cdn + v" alt="" class="pos-abso box-100 tl-0">
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterScene",

  data () {
    return {
      thumbList: [
        '/assets/thumb/thumb-01.jpg',
        '/assets/thumb/thumb-02.jpg',
        '/assets/thumb/thumb-03.jpg',
        '/assets/thumb/thumb-04.jpg',
        '/assets/thumb/thumb-05.jpg',
        '/assets/thumb/thumb-06.jpg',
        '/assets/thumb/thumb-07.jpg'
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
@media screen and (min-width: 1080px) {
  .line-box {
    width 100vw
    height 1rem
    align-items center
    justify-content space-around
  }
  .line-box:after {
    position absolute
    bottom 0
    left 0
    content ' '
    height 1rem
    width 100vw
    border-bottom 2px dashed #FFFFFF
    border-radius 0 0 50% 50%
  }
  .thumb-box{
    z-index 6001
    width .8rem
    height .8rem
    border 3px solid #FFFFFF
    border-radius 50%
    overflow hidden
  }
}
</style>

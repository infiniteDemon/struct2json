<template>
  <div class="carousel" v-show="isShowCarousel" @touchstart="handleStart($event)" @touchmove="handleMove($event)" @touchend="handleFinish($event)">
    <div class="carousel-box-top">
      {{ slide+1 }}/{{ lists.length }}
    </div>
    <div class="carousel-box-center">
      <div class="carousel-box" :style="'transform: scale(' + scale +');'" :class="scale >= 1 ? 'transform-scale': null">
        <img :src="$cdn + value.img" :class="isHengShuping ? 'carousel-imgs-h' : 'carousel-imgs-s'" v-for="(value, key) in lists" :key="key"  v-show="slide == key" :id="'img' + key">
      </div>
    </div>
    <div class="carousel-box-bottom">
      <div class="carousel-box-bottom-box" @click.stop="click('bigger')" :class="isMoreBigger ? 'btn-grey': null">
        <img :src="$cdn + 'icons/bigger.png'" alt="" srcset="" class="carousel-box-bottom-img">
        <span>放大</span>
      </div>
      <div class="carousel-box-bottom-box" @click.stop="click('smaller')" :class="isMoreSmaller ? 'btn-grey': null">
        <img :src="$cdn + 'icons/smaller.png'" alt="" srcset="" class="carousel-box-bottom-img">
        <span>缩小</span>
      </div>
      <div class="carousel-box-bottom-box" @click.stop="click('reset')">
        <img :src="$cdn + 'icons/reset.png'" alt="" srcset="" class="carousel-box-bottom-img">
        <span>重置</span>
      </div>
    </div>

    <div class="btn btn-left">
      <img :src="$cdn + 'icons/btn-left.png'" alt="" class="btn-img" v-show="slide >= 1" @click.stop="click('left')">
    </div>
    <div class="btn btn-right">
      <img :src="$cdn + 'icons/btn-right.png'" alt="" class="btn-img" v-show="slide < (lists.length-1)" @click.stop="click('right')">
    </div>
    <div class="btn btn-close"  @click.stop="click('close')">
      <img :src="$cdn + 'icons/close.png'" alt="" class="btn-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoView',
  props: {
    lists: {
      type: Array,
      required: true
    },
    isShowCarousel: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      slide: 0,
      scale: 1,
      pageX: null,
      pageY: null,
      initX: null,
      initY: null,
      start: null,
      isTouch: false,
      firstInfo: null,
      endInfo: null,
      // 横屏为true, 竖屏为false
      isHengShuping: null,
      isMoreBigger: false,
      isMoreSmaller: true
    }
  },
  methods: {
    handleFinish (e) {
      console.log(e)
      if (this.isTouch) {
        this.isTouch = false
      }
    },
    handleMove (e) {
      const self = this
      e.preventDefault()
      if (e.touches.length === 1 && self.isTouch) {
        const touchMoveX = e.targetTouches[0].pageX
        const touchMoveY = e.targetTouches[0].pageY
        console.log("平移")
        document.getElementById("img" + this.slide).style.position = "absolute"
        document.getElementById("img" + this.slide).style.left = parseInt(touchMoveX) - parseInt(this.pageX) + parseInt(this.initX) + "px"
        document.getElementById("img" + this.slide).style.top = parseInt(touchMoveY) - parseInt(this.pageY) + parseInt(this.initY) + "px"
      }
      if (e.touches.length === 2 && self.isTouch) {
        const now = e.touches
        const scale = (self.getDistance(now[0], now[1]) / self.getDistance(self.start[0], self.start[1]))
        console.log(scale)
        // 最大值
        if (scale > 1.1) {
          console.log("放大")
          if (this.scale >= 3) {
            this.isMoreBigger = true
            return
          }
          this.scale += 0.1
          this.isTouch = true
        }
        if (scale < 1) {
          if (this.scale <= 1) {
            this.isMoreSmaller = true
            return
          }
          console.log("缩小")
          this.scale -= 0.1
          this.isTouch = true
        }
      }
    },
    // 算出数值，勾股定理方法
    getDistance (p1, p2) {
      const x = p2.pageX - p1.pageX
      const y = p2.pageY - p1.pageY
      return Math.sqrt((x * x) + (y * y))
    },
    handleStart (e) {
      this.pageX = e.targetTouches[0].pageX
      this.pageY = e.targetTouches[0].pageY
      this.initX = document.getElementById("img" + this.slide).offsetLeft
      this.initY = document.getElementById("img" + this.slide).offsetTop
      console.log(this.pageX, this.pageY, e.touches.length)
      if (e.touches.length >= 2) {
        this.start = e.touches
      }
      this.isTouch = true
    },
    handlePan ({ evt, ...info }) {
      this.info = info

      // native Javascript event
      if (info.touch) {
        // console.log(info.duration)
        // if (info.isFirst) {
        //   console.log(evt, info)
        // } else if (info.isFinal) {
        // }
        const xyLen = Math.sqrt(info.distance.x * info.distance.x + info.distance.y * info.distance.y)
        console.log(xyLen)
        if (xyLen >= 300) {
          console.log("放大")
        }
      }
    },
    click (param) {
      console.log(param)
      switch (param) {
        case 'left':
          this.slide -= 1
          break
        case 'right':
          this.slide += 1
          break
        case 'close':
          this.$emit('childFn', false)
          this.slide = 0
          document.getElementById("img" + this.slide).style.position = "absolute"
          document.getElementById("img" + this.slide).style.left = null
          document.getElementById("img" + this.slide).style.top = null
          this.scale = 1
          break
        case 'bigger':
          if (this.scale >= 3) {
            this.isMoreBigger = true
          }
          if (this.isMoreBigger) {
            return
          }
          this.scale += 0.2
          this.isMoreSmaller = false
          break
        case 'smaller':
          if (this.scale <= 1) {
            this.isMoreSmaller = true
          }
          if (this.isMoreSmaller) {
            return
          }
          this.scale -= 0.2
          this.isMoreBigger = false
          break
        case 'reset':
          this.scale = 1
          this.isMoreBigger = false
          this.isMoreSmaller = true
          break
      }
    },
    renderResize () {
      // 判断横竖屏
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      if (width > height) {
        // 横屏
        this.isHengShuping = true
      } else {
        // 竖屏
        this.isHengShuping = false
      }
      // 做页面适配
      // 注意：renderResize 方法执行时虚拟 dom 尚未渲染挂载，如果要操作 vue 实例，最好在this.$nextTick()里进行。
    }
  },
  mounted () {
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight
    if (!clientWidth) return
    if (clientWidth > clientHeight) {
      // 横屏
      console.log('横屏')
      this.isHengShuping = true
    } else {
      // 竖屏
      console.log('竖屏')
      this.isHengShuping = false
    }
    // 监听 resize 方法
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', this.renderResize, false)
  },
  beforeDestroy () {
    // 移除监听
    window.removeEventListener('orientationchange' in window ? 'orientationchange' : 'resize', this.renderResize, false)
  }
}
</script>

<style scoped>
/* 轮播图 PC UI */
.carousel{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 4007;
  background-color: rgba(0, 0, 0, .7);
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.carousel-box-top{
  width: 100vw;
  height: 10vh;
  color: #FFFFFF;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 10vh;
  position: fixed;
  z-index: 4007;
  top: 0;
}

.carousel-box-center{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.carousel-box-bottom{
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4007;
  position: fixed;
  bottom: 0;
}

.carousel-box{
  max-height: 80vh;
  max-width: 80vw;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-box-h{
  height: 80%;
}

.carousel-box-s{
  width: 80%;
}

.btn-grey{
  background-color: rgba(52,52,52,.6);
  opacity: .4;
}

.btn-img{
  width: 100%;
  height: 100%;
}

.btn{
  position: absolute;
  padding: .1rem;
  z-index: 4007;
  width: 1.2rem;
  height: 1.2rem;
}

.btn-left{
  left: 20px;
}
.btn-right{
  right: 20px;
}
.btn-close{
  right: 0px;
  top: 0px;
  width: .5rem;
  height: .5rem;
}

.carousel-box-bottom-box{
  /*width: ;*/
  color: #ffffff;
  cursor: pointer;
  font-size: 12px;
  width: .8rem;
  height: .3rem;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(52,52,52,.4);
  border: 1px solid #343434;
  margin-right: 10px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-box-bottom-box:hover {
  background-color: #447ef7;
  border: 1px solid #447ef7;
}

.carousel-imgs-h{
  height: 100%;
}

.carousel-imgs-s{
  /*height: 100%;*/
  width: 100%;
}
@media (max-width: 767px) {
  .carousel-box-bottom{
    display: none;
  }
}

@media (min-width: 768px) {
  .carousel-box-bottom-box{
    width: 70px;
    height: 20px;
  }
  .btn{
    padding: 10px;
    width: 80px;
    height: 80px;
  }
  .btn-close{
    width: 40px;
    height: 40px;
  }
  .carousel-box-bottom-img{
    width: 13px;
    height: 13px;
  }
}

@media (min-width: 1000px) {
  .carousel-box-bottom-box{
    width: 90px;
    height: 40px;
  }

  .btn-close{
    width: 50px;
    height: 50px;
  }
  .carousel-box-bottom-img{
    width: 20px;
    height: 20px;
  }
}
</style>

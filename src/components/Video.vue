<template>
  <div v-show="isShowVideo" class="video-box">
    <div class="play-btn" @click="click('play')" v-show="isPlayedVideo">
      <img :src="$cdn + 'icons/play.png'" alt="" class="play-btn-img">
    </div>
    <div class="close-btn" @click="click('close')">
      <img :src="$cdn + 'icons/close.png'" alt="" class="play-close-img">
    </div>
    <video
      :src="videourl ? $cdn + videourl : null"
      class="video" preload="auto"
      :class="isHengShuping ? 'video-h' : 'video-s'"
      id="video"
      webkit-playsinline="true"
      x-webkit-airplay="true"
      playsinline="true"
      x5-video-player-type="h5"
      x5-video-orientation="h5"
      x5-video-player-fullscreen="true"
      controls="true"
      x5-playsinline="true"
    ></video>
<!--    <q-media-player-->
<!--      type="video"-->
<!--      background-color="black"-->
<!--      radius="1rem"-->
<!--      :show-big-play-button="true"-->
<!--      :sources="[{src: videourl ? $cdn + videourl : null, type: 'video/mp4'}]"-->
<!--      track-language="Chinese"-->
<!--      id="video"-->
<!--      class="isHengShuping ? 'video-h' : 'video-s'"-->
<!--    >-->
<!--    </q-media-player>-->
  </div>
</template>

<script>
export default {
  name: "Video",
  data () {
    return {
      isHengShuping: false,
      isPlayedVideo: true
    }
  },
  props: {
    videourl: {
      type: String,
      required: true
    },
    isShowVideo: {
      type: Boolean,
      required: true
    }
  },
  computed: {
  },
  methods: {
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
    },
    click (param) {
      const video = document.getElementById("video")
      const _this = this
      switch (param) {
        case 'play':
          console.log("play")
          video.play()
          video.addEventListener("ended", () => {
            console.log("video ended")
            _this.$emit('childFn', false)
            this.$emit('playBgMusic')
            _this.isPlayedVideo = true
          })
          this.$emit('stopBgMusic')
          this.isPlayedVideo = false
          break
        case 'close':
          video.pause()
          this.$emit('childFn', false)
          this.$emit('playBgMusic')
          this.isPlayedVideo = true
          console.log("close")
          break
      }
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
.video-box{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4006;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .7);
}
.video{
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-position: 0 0;
}
.video-h{
  max-height: 80%;
  z-index: 4004;
}
.video-s{
  max-width: 80%;
  z-index: 4004;
}

.play-btn{
  width: 1.4rem;
  height: 1.4rem;
  position: absolute;
  z-index: 4006;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.close-btn{
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  z-index: 4006;
  right: 10px;
  top: 10px;
}
.play-btn-img{
  width: 100%;
  height: 100%;
}
.play-close-img{
  width: 100%;
  height: 100%;
}
</style>

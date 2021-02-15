import request from './request'
// import md5 from 'js-md5'
export default {
  methods: {
    preloadImg (src) {
      return new Promise((resolve, reject) => {
        // 判断背景图是否加载完毕
        const img = new Image()
        img.src = src
        img.onload = () => {
          console.log(src + 'loaded')
          resolve()
        }
      })
    },
    apiAutoLogin (token) {
      return new Promise((resolve, reject) => {
        request({
          url: 'api/v1/user/autologin',
          method: 'POST',
          headers: {
            Authorization: `${token}`
          }
        }).then(resolve).catch(reject)
      })
    },
    GetQueryString (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [window.location.href, ""])[1].replace(/\+/g, '%20')) || null
    },
    pattern (fmt) {
      var o = {
        'M+': new Date().getMonth() + 1,
        'd+': new Date().getDate(),
        'h+': new Date().getHours() % 12 === 0 ? 12 : new Date().getHours() % 12,
        'H+': new Date().getHours(),
        'm+': new Date().getMinutes(),
        's+': new Date().getSeconds(),
        'q+': Math.floor((new Date().getMonth() + 3) / 3)
        // 'S': new Date().getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + '日一二三四五六'.charAt(new Date().getDay()))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    fail (msg, callback) {
      // dmeon TODO: 提示框:失败 样式修改
      this.$q.notify({
        color: 'negative',
        icon: 'report_problem',
        position: 'center',
        timeout: 500,
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        progress: true,
        message: msg,
        onDismiss () {
          if (callback) callback()
        }
      })
    },
    success (msg, callback) {
      // dmeon TODO: 提示框:失败 样式修改
      this.$q.notify({
        color: 'teal',
        icon: 'thumb_up',
        position: 'center',
        timeout: 500,
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        progress: true,
        message: msg,
        onDismiss () {
          if (callback) callback()
        }
      })
    }
  }
}

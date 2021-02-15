<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  beforeCreate () {
    // const _this = this
    /* eslint-disable */
      (function (doc, win) {
        let docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = () => {
            const clientWidth = docEl.clientWidth;
            const clientHeight = docEl.clientHeight;

            let allcount

            if (!clientWidth) return;

            if (clientWidth >= 750) {
              allcount = 1920
            } else {
              allcount = 750
            }
            console.log(allcount)
            docEl.style.fontSize = 100 * (clientWidth / allcount) + 'px';
          };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window)
    /* eslint-disable */
  }
}
</script>
<style>
body{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#q-app{
  width: 100vw;
  height: 100vh;
}
p{
  margin: 0 !important;
}
</style>

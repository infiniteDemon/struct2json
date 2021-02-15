<template>
  <router-view />
</template>

<script>
// import { Cookies } from 'quasar'
import { fabYoutube, fasUsers, farBuilding, fasBalanceScaleRight } from '@quasar/extras/fontawesome-v5'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      links1: [
        { icon: 'thumb_up_alt', text: '项目看板', router: 'Projects' },
        { icon: 'home', text: '仪表盘', router: 'DashBoard' }
      ],
      links2: [
        { icon: 'subscriptions', text: '项目管理', router: 'MyProjects' },
        { icon: 'folder', text: '素材管理', router: 'MyProjects' },
        { icon: 'live_tv', text: '监控管理', router: 'MyProjects' },
        { icon: 'watch_later', text: 'Watch later', router: 'MyProjects' },
        { icon: 'thumb_up_alt', text: 'Liked videos', router: 'MyProjects' }
      ],
      links3: [
        { icon: fabYoutube, text: 'YouTube Premium', router: 'MyProjects' },
        { icon: 'local_movies', text: 'Movies & Shows', router: 'MyProjects' },
        { icon: 'videogame_asset', text: 'Gaming', router: 'MyProjects' },
        { icon: 'restore', text: 'History', router: 'MyProjects' }
      ],
      links4: [
        { icon: fasUsers, text: '用户管理', router: 'MyProjects' },
        { icon: farBuilding, text: '组织管理', router: 'MyProjects' },
        { icon: fasBalanceScaleRight, text: '配额管理', router: 'MyProjects' },
        { icon: 'settings', text: '个人设置', router: 'MySettings' }
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ]
    }
  },
  beforeCreate () {
    // console.log('判断是否存在cookie或者localstrage')
    // var token = Cookies.get('token')
    // if (token) {
    //   // 自动登录
    //   console.log(token)
    // } else {
    //   this.$router.push({ path: '/Login' })
    // }
  },
  created () {
    this.fabYoutube = fabYoutube
  }
}
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>

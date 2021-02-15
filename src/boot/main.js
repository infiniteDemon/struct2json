import Vue from 'vue'
// 静态资源
// Vue.prototype.$cdn = 'https://otouch.oss-cn-shanghai.aliyuncs.com/pig_material/'
const pkg = require('../../package.json')
Vue.prototype.$cdn = pkg.homepage

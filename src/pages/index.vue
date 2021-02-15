<template>
  <div class="fullscreen text-white text-center flex flex-center bg-box">
    <img :src="$cdn + background" alt="" srcset="" class="pos-fixed box z-index-1">
    <div class="flex box flex-box pos-fixed z-index-2">
      <p class="text text-blue">golang结构体转json工具</p>
      <div style="width: 600px;max-width: 600px;">
        <q-input
          v-model="text"
          filled
          autogrow
          class="bg-blue-2"
        />
      </div>
      <p class="text text-blue">{{ msg }}</p>
      <div style="width: 600px;max-width: 600px;">
        <q-input
          v-model="transforToText"
          filled
          autogrow
          class="bg-amber-2"
        />
      </div>
      <p class="text text-red">{{ errMsg }}</p>
    </div>
  </div>
</template>

<script>
import API from './api'
import _ from 'loadsh'
import decamelize from "decamelize"
import camelCase from "camelcase"
import { is } from "ramda"
export default {
  name: 'index',

  mixins: [API],

  data () {
    return {
      text: `type mysql struct {
        User string
        Password string
        Host string
        Port int
        DbName string
      }`,
      tempObj: {},
      transforToText: '',
      msg: '转换结果',
      errMsg: "",
      isShowMouse: true,
      background: '/assets/joker-bg.jpeg',
      isLoadBg: false,
      officialWebsite: ""
    }
  },

  created () {
    const _this = this
    this.preloadImg(this.$cdn + this.background).then(async e => {
      _this.isLoadBg = true
      await _this.parse1(_this.text)
      await _this.parse2(_this.text)
      await _this.tran()
    })
    // setTimeout(() => {
    //   this.isShowMouse = false
    // }, 3000)
  },

  methods: {
    async tran () {
      const _this = this
      const camelCaseObj = this.deepCvt(_this.tempObj, true, decamelize)
      console.log(camelCaseObj)
      _this.transforToText = JSON.stringify(camelCaseObj, null, 4)
    },
    deepCvt (obj, cvtValue = false, cvtFun = camelCase) {
      const newObj = {}
      for (const k in obj) {
        const newKey = cvtFun(k)
        const value = obj[k]
        const newValue =
          cvtValue && is(String, value) && !is(Function, value)
            ? cvtFun(value)
            : value
        if (is(Object, value) && !is(Function, value)) {
          newObj[newKey] = this.deepCvt(value, cvtValue, cvtFun)
        } else {
          newObj[newKey] = newValue
        }
      }
      return newObj
    },
    async parse1 (newVal) {
      // let tempStruct
      // try {
      //   tempStruct = JSON.parse(str)
      // } catch (err) {
      //   this.errMsg = err
      //   console.log(err)
      // }
      const tempStr = newVal.split("\n")
      for (let i = 0; i < tempStr.length; i++) {
        const e = tempStr[i]
        if (/}/ig.test(e)) {
          continue
        }
        const tempArr = /\b/ig.exec(e)
        if (tempArr.index === 0) {
          const tempHeader = e.split(" ")
          _.set(this.tempObj, tempHeader[1], {})
        }
      }
      console.log("第一次处理结束", this.tempObj)
    },
    async parse2 (newVal) {
      console.log("第二次处理开始", this.tempObj)
      const tempStr = newVal.split("\n")
      for (let i = 0; i < tempStr.length; i++) {
        const e = tempStr[i]
        if (/}/ig.test(e)) {
          continue
        }
        const tempArr = /\b/ig.exec(e)
        if (tempArr.index !== 0) {
          const tempTempStr = e.substring(tempArr.index, e.length)
          const tempObjArr = _.keys(this.tempObj)
          tempObjArr.forEach(l => {
            _.set(this.tempObj, `${l}.${tempTempStr.split(" ")[0]}`, this.returnDefaultValue(tempTempStr.split(" ")[1]))
          })
        }
        console.log("第二次结束时", this.tempObj)
      }
    },
    returnDefaultValue (str) {
      switch (str) {
        case "string":
          return "test"
        case "bool":
          return true
        case "int":
          return 0
        default:
          return "test"
      }
    },
    titleCase (str) {
      var strArr = str.split("_")
      strArr.forEach((strChild, j) => {
        // 把字符串所有的字母变为小写，并根据空格转换成字符数组
        var arr = strChild.toLowerCase().split(" ")
        // 遍历字符数组
        for (var i = 0; i < arr.length; i++) {
          // 把第一个字符变为大写
          arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length)
        }
        // 加上空格，返回原模式的字符串
        strArr[j] = arr.join(" ")
      })
      console.log(strArr.join(""))
      return strArr.join("")
    },
    returnType (str) {
      switch (typeof str) {
        case "undefined":
          return "NulL"
        case "boolean":
          return "bool"
        case "string":
          return "string"
        case "number":
          if (str % 1 === 0) {
            return "int"
          } else {
            return "float64"
          }
        case "object":
          return "interface{}"
      }
    },
    returnSqlType (str) {
      switch (typeof str) {
        case "undefined":
          return "NulL"
        case "boolean":
          return "tinyint(1)"
        case "string":
          return "varchar(255)"
        case "number":
          if (str % 1 === 0) {
            return "int(255)"
          } else {
            return "float(255)"
          }
        case "object":
          return "varchar(255)"
      }
    }
  },

  watch: {
    async text (newVal, oldVal) {
      // const _this = this
      await this.parse1(newVal)
      await this.parse2(newVal)
      await this.tran()
      // console.log(tempJS)
      // console.log(str)
      // this.transforToText = str
    }
  }
}
</script>
<style scoped lang="stylus">
.text
  font-size 0.28rem
.flex-box
  flex-direction column
  align-items center
@media screen and (min-width: 1080px) {
 .center-box{
   bottom 0rem
   left 0rem
   width 100vw
   height 3.22rem
   background linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)
 }
}
</style>

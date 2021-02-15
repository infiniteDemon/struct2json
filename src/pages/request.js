
/*
 * @Descripttion: 请求封装
 * @Author: infinite Demon
 * @Date: 2019-09-04 08:53:17
 * @LastEditors  : infinite Demon
 * @LastEditTime : 2020-11-17 14:40:08
 */
import axios from 'axios'
const service = axios.create({
  baseURL: 'http://8.133.170.84/'
})
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error.response)
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    const data = response.data
    switch (data.code) {
      case 200:
        return data.data
      default:
        return data.data
    }
  } else {
    Promise.reject(response.data)
  }
}, error => {
  console.error(error.response)
  return Promise.reject(error.response)
})

export default service

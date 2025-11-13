//axios二次封装
import axios from 'axios'
import baseURL from '@/api/env'
import { ElLoading, ElMessage, ElMessageBox, type Action } from 'element-plus'
import { noToken } from './config'
import { useAuthStore } from '@/stores/menu'
import router from '@/router'
const authStore = useAuthStore()
const service = axios.create({
  baseURL: baseURL,
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
})
let needLoadingRequestCount = 0
let fullLoading: any
// 登录报错次数
let loginErrorCount = 0
export const showLoading = () => {
  if (needLoadingRequestCount === 0) {
    fullLoading = ElLoading.service({
      background: 'rgba(0, 0, 0, .2)',
      text: '加载中',
      spinner: 'el-icon-loading',
    })
  }
  needLoadingRequestCount++
}

export const tryHideLoading = () => {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    fullLoading.close()
  }
}

service.interceptors.request.use(
  (config: any) => {
    //排除无token就能访问的接口
    const notNeedToken = noToken.some((url) => config.url.includes(url))
    if (!notNeedToken) {
      if (authStore.token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Bearer ${authStore.token}`
      } else {
        router.push({ path: '/login' })
        return Promise.reject(new Error('no token'))
      }
    }
    return config
  },
  (err) => {
    console.log(err.request.config)
    return Promise.reject(err)
  },
)

// http request 拦截器
service.interceptors.response.use(
  (response: any) => {
    // token失效
    if (response.data instanceof Blob || response.data instanceof ArrayBuffer) {
      tryHideLoading()
      return response.data
    }
    // response.data.code = response.data.status ?? 0
    if (response.data.code === '401') {
      //codeMsg.tokenExpire.code 401登录过期，请重新登录
      if (loginErrorCount > 0) {
        // return Promise.reject(response)
        fullLoading.close()
        sessionStorage.clear()
        loginErrorCount = 0
        router.push({ path: '/login' })
      } else {
        loginErrorCount++
        ElMessageBox.alert('登录过期，请重新登录', '', {}).then(function () {
          fullLoading.close()
          // baseFunc.setLocalStorage('token', '')
          sessionStorage.clear()
          loginErrorCount = 0
          router.push({ path: '/login' })
        })
      }
      return Promise.reject(response)
    } else {
      if (response.data.code !== '1') {
        // 接口返回1
        ElMessage({
          message: response.data.message || '未知错误,请查看控制台',
          type: 'error',
          duration: 5 * 1000,
          showClose: true,
        })
        tryHideLoading()
        return Promise.reject(response)
      }
    }
    tryHideLoading()
    return response.data
  },
  (error) => {
    if (error.request.config === undefined || error.response === undefined) {
      fullLoading.close()
      tryHideLoading()
    }
    if (loginErrorCount > 0) {
      return Promise.reject(error)
    } else {
      loginErrorCount++
      if (error.message.indexOf('401') < 0) {
        ElMessageBox.alert(
          (error.response && error.response.data.message) || '出错了，请稍后再试',
          '',
          {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
              fullLoading.close()
              tryHideLoading()
            },
          },
        )
      } else {
        ElMessageBox.alert('登录失效，请重新登录。', '', {
          confirmButtonText: 'OK',
          callback: (action: Action) => {
            fullLoading.close()
            sessionStorage.clear()
            localStorage.clear()
            loginErrorCount = 0
            router.replace({ path: '/login' })
          },
        })
      }
    }
    return Promise.reject(error)
  },
)

// 将axios 的 post 方法
export function $post(params: any) {
  return new Promise((resolve, reject) => {
    service({
      ...params,
      ...params.config,
      method: 'post',
      url: params.url,
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 将axios 的 get 方法
export function $get(params: any) {
  return new Promise((resolve, reject) => {
    service({
      url: params.url,
      params: params.params,
      data: params.data,
      ...params.headers,
    })
      .then((res) => {
        resolve(res) // 返回请求成功的数据 data
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 将axios 的 delete 方法
export function $delete(params: any) {
  return new Promise((resolve, reject) => {
    service
      .delete(params.url, params.data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 将axios 的 put 方法
export function $put(params: any) {
  return new Promise((resolve, reject) => {
    service
      .put(params.url, params.data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// del 通过body传递参数
export function $delete2(params: any) {
  return service({
    url: params.url,
    method: 'delete',
    data: params.data,
  })
}

// 导出responseType
export function $download(params: any) {
  return new Promise((resolve, reject) => {
    service
      .post(params.url, params.data, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default service

let baseURL = ''

if (import.meta.env.MODE === 'production') {
  baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'
} else {
  baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'
}

// 请求路径前缀
export default baseURL

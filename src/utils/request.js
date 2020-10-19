import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { MessageBox, Message } from 'view-design'
// import { Message } from 'view-design'
// import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true
    // 创建一个axios实例

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL: "http://47.115.10.129:8443/charityedu",
    // baseURL: "/apis",
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // 请求超时时间,


    // withCredentials: true,
})

// request interceptor
service.interceptors.request.use(
    config => {
        // request拦截器
        if (store.getters.token) {
            // 每一次请求都要携带token
            // ['X-Token'] is a custom headers key
            // config.headers['X-Token'] = getToken()

        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        this.$Message.error("请重新登陆")
        return Promise.reject(error)
    }
)



// response interceptor
service.interceptors.response.use(
    response => {
        const res = response
            // if the custom code is not 20000, it is judged as an error.
        if (res.data.code !== undefined && (res.data.code < "200" || res.data.code >= "300")) {
            Message.error(
                res.data.message || 'Error',
            )
            if (res.data.code == "403") {
                // 重新登陆
                MessageBox.confirm('您已登出，可以取消停留在此页面上，或者再次登录', '确认登出', {
                    confirmButtonText: '重新登陆',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        router.replace('/login')
                    })
                })
            }

            return res
                // return Promise.reject('error')
        } else {
            return res
        }
    },
    error => {
        console.log('err:' + error) // for debug
        Message.error(
            error.message,
        )
        return Promise.reject(error)
    }
)

export default service
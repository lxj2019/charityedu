import axios from 'axios'
// axios.defaults.withCredentials = true
axios.defaults.withCredentials = true
export function request(config) {
    const instance = axios.create({
            baseURL: 'http://47.115.10.129:8443/charityedu',
            timeout: 5000

        })
        // 3.发送真正的网络请求
    return instance(config)
}
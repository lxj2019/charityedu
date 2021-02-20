import router from './router'
import store from './store'
import { Message } from 'view-design'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/forgetPwd'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    // console.log('有token')
    const hasGetUserInfo = store.getters.name && store.getters.avatar
    if (hasGetUserInfo) {
      // console.log('有数据')
      next()
    } else {
      try {
        // get user info
        // console.log('获得数据')
        await store.dispatch('user/getInfo')
        NProgress.done()
        next()
      } catch (error) {
        // console.log('没有数据')
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error('出现错误，请稍后再试')
        next()
        NProgress.done()
      }
    }
  } else {
    // console.log('没有token')
    // if (whiteList.indexOf(to.path) !== -1) {
    //   //
    //   next()
    // } else {
    //   next(`/login?redirect=${to.path}`)
    // }
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

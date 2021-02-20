import { login, logout, getUserImg } from '@/api/user'

// import { getAllMenu } from '@/api/menu'
// import { getAllRole } from '@/api/role'
import { removeToken, setToken, getToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import { Message } from 'view-design'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    userInfo: {},
    permission: {},
    avatar: ''
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    const { phoneNum, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ phoneNum: phoneNum.trim(), password: password }).then(response => {
        const data = response.data.data
        const token = 'abc'
        commit('SET_TOKEN', token)
        setToken('abc')
        commit('SET_USERINFO', data)
        commit('SET_NAME', data.userName)
        setUserInfo({
          name: data.userName
        })
        getUserImg().then(res => {
          commit('SET_AVATAR', res.data.message)
          setUserInfo({
            name: data.userName,
            avatar: res.data.message
          })
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getUserImg({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserImg().then(res => {
        commit('SET_AVATAR', res.data.message)
        setUserInfo({
          name: state.userName,
          avatar: res.data.message
        })
        resolve()
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    const a = getUserInfo()
    console.log(a, 'kfd')
    return new Promise((resolve, reject) => {
      const { name, avatar } = getUserInfo()
      console.log(name, avatar)
      commit('SET_NAME', name || '')
      commit('SET_AVATAR', avatar || '')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        Message.success(res.data.message)
        removeToken()
        commit('RESET_STATE')
        router.replace('/home')
        // 移除用户信息
        removeUserInfo()
      }).catch(error => {
        removeToken()
        commit('RESET_STATE')
        router.replace('/home')
        // 移除用户信息
        removeUserInfo()
        reject(error)
      })
    })
  }

  // // remove token
  // resetToken({ commit }) {
  //     return new Promise(resolve => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         removeToken()
  //         resolve()
  //     })
  // },

  // Dynamically modify permissions
  // changeRoles({ commit, dispatch }, role) {
  //   return new Promise(async resolve => {
  //     const token = role + '-token'
  //
  //     commit('SET_TOKEN', token)
  //     setToken(token)
  //
  //     const { roles } = await dispatch('getInfo')
  //
  //     // resetRouter()
  //
  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //
  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes)
  //
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

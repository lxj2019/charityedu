import { login, logout, getInfo, getPermission, getUserImg } from '@/api/user'

// import { getAllMenu } from '@/api/menu'
// import { getAllRole } from '@/api/role'
import { getToken, setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import { Message } from 'view-design'
import router from "@/router";

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
        if (response.data.code == '200') {
          const data = response.data.data
            // const token = getToken()
            // commit('SET_TOKEN', token)
          commit('SET_USERINFO', data)
          commit('SET_NAME', data.userName)
          setToken('true')
          getUserImg().then(res => {
            commit('SET_AVATAR', res.data.message)
            setUserInfo({
              name: data.userName,
              avatar: res.data.message
            })
          })
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const { name, avatar } = getUserInfo()
      console.log(name, avatar)
      commit('SET_NAME', name || '')
      commit('SET_AVATAR', avatar || '')
      resolve()
    })
  },


  // getPermission({ commit }) {
  //     return new Promise((resolve) => {
  //         getPermission().then(response => {
  //             const data = response.data
  //             console.log(data);
  //             commit('SET_PERMISSION', data)
  //             resolve(data)
  //         }).catch(err => {
  //             console.log(err);
  //         })

  //     })
  // },

  // getAllRole({ commit }) {
  //     return new Promise((resolve) => {
  //         getAllRole().then(response => {
  //             const data = response.data
  //             console.log(data);
  //             let roleList = []
  //             data.forEach(item => {
  //                 const menu = {}
  //                 menu.label = item.roleName
  //                 menu.value = item.roleId
  //                 roleList.push(menu)
  //             })
  //             commit('SET_ROLELIST', roleList)
  //             resolve(data)
  //         }).catch(err => {
  //             console.log(err);
  //         })
  //     })
  // },
  // getAllMenu({ commit }) {
  //     return new Promise((resolve) => {
  //         getAllMenu().then(response => {
  //             const data = response.data
  //             console.log(data);
  //             let menuList = []
  //             data.forEach(item => {
  //                 const menu = {}
  //                 menu.label = item.menuName
  //                 menu.value = item.menuId
  //                 menuList.push(menu)
  //             })
  //             commit('SET_MENULIST', menuList)
  //             resolve(data)
  //         }).catch(err => {
  //             console.log(err);
  //         })
  //     })
  // },

  // // user logout
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
          // 移除用户信息
        removeUserInfo()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        Message.success(res.data.message)
        commit('RESET_STATE')
        router.replace('/home')
          // 移除用户信息
        removeUserInfo()
        removeToken()
      }).catch(error => {
        commit('RESET_STATE')
        router.replace('/home')
          // 移除用户信息
        removeUserInfo()
        removeToken()
        reject(error)
      })
    })
  },

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
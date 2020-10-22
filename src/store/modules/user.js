import { login, logout, getInfo, getPermission, getUserImg } from '@/api/user'

// import { getAllMenu } from '@/api/menu'
// import { getAllRole } from '@/api/role'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import { Message } from 'view-design'
const state = {
    token: getToken(),
    basedInfo: {},
    userInfo: {},
    permission: {},

    // roleList:[]
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_MENULIST: (state, menuList) => {
        state.menuList = menuList
    },
    SET_ROLELIST: (state, roleList) => {
        state.roleList = roleList
    },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // },
    // SET_BIRTH: (state, birth) => {
    //   state.birth = birth
    // },
    // SET_GENDER: (state, gender) => {
    //   state.gender = gender
    // },
    // SET_EMAIL: (state, email) => {
    //   state.email = email
    // },
    // SET_STATE: (state, st) => {
    //   state.state = st
    // },
    // SET_ROLE: (state, role) => {
    //   state.role = role
    // }
}

const actions = {
    // 用户登陆
    login({ commit }, userInfo) {
        const { phoneNum, password, rememberMe } = userInfo
        return new Promise((resolve, reject) => {
            login({ phoneNum: phoneNum.trim(), password: password, rememberMe: String(rememberMe) }).then(response => {
                if (response.data.code == '200') {
                    Message.success('登陆成功')
                        // console.log(response)
                    const data = response.data.data
                    commit('SET_USERINFO', data)
                        // const token = getToken()
                    const token = 2
                    commit('SET_TOKEN', token)
                    setToken(token)
                    resolve()
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获得用户信息
    getInfo({ commit }) {
        return new Promise((resolve) => {
            getInfo().then(response => {
                const data = response.data.data
                commit('SET_USERINFO', data)
                resolve(data)
            }).catch(err => {
                console.log(err);
            })

        })
    },

    // 获得用户头像
    getUserImg({ commit }) {
        return new Promise((resolve) => {
            getUserImg().then(response => {
                const data = response.data
                commit('SET_AVATAR', data)
                resolve(data)
            }).catch(err => {
                console.log(err);
            })

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
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_TOKEN', '')
                sessionStorage.removeItem("store"); //移除sessionStorage
                commit('SET_USERINFO', '')
                removeToken()
                resolve()
            }).catch(error => {
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
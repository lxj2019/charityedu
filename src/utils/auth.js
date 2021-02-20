import Cookies from 'js-cookie'

const TokenKey = 'f'

export function getToken() {
  // console.log(Cookies.get());
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setCookie(key, value, expires) {
  return Cookies.set(key, value, { expires: expires })
}

export function getCookie(key) {
  return Cookies.get(key)
}

const UserKey = 'charity_user'

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserKey))
}

export function setUserInfo(userInfo) {
  return localStorage.setItem(UserKey, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserKey)
}

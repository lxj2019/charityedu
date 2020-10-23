import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
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
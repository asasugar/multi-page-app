export function setLocalStorage(key, val) {
  return window.localStorage.setItem(key, val)
}

export function getLocalStorage(key) {
  return window.localStorage.getItem(key)
}

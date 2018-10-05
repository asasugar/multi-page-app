export function setLocalStorage(key, val) {
  return window.localStorage.setItem(key, JSON.stringify(val))
}

export function getLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

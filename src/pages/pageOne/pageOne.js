import './pageOne.scss'
import { setLocalStorage, getLocalStorage } from 'utils/js/localStorage'
setLocalStorage('test', { a: 1 })
console.log(getLocalStorage('test'))

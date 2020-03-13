import axios from 'axios'
import {URL} from '../config/env'
const service = axios.create({
    baseURL: '',
    withCredentials: true,
    timeout: 5000
})

export default service
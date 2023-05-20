import axios from "axios";
// const BASE_URL = "https://api.bss-safety.uz"

import { getCookie } from 'typescript-cookie'
const instance = axios.create({
    // baseURL: 'https://api.bss-safety.uz'
    baseURL: 'http://localhost:9000'

});
instance.interceptors.request.use((config) => {
    config.headers.aboitoken = getCookie('accesToken')
    return config
})

export default instance;
import axios from "axios";

import { getCookie } from 'typescript-cookie'
const instance = axios.create({
    baseURL: 'https://api-oboi.getter.uz'

});
instance.interceptors.request.use((config) => {
    config.headers.aboitoken = getCookie('accesToken')
    return config
})

export default instance;
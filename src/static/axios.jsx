import axios from "axios";

const baseurl = 'https://10.21.82.34:8000/';

const headers = {
    Authorization: localStorage.getItem("access")
        ? localStorage.getItem("access")
        : "No Access"
};

const apihit = axios.create({
    baseURL: baseurl,
    headers: headers,

})


apihit.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access")
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default apihit;
import axios from "axios";

const baseurl = 'https://192.168.29.205:8000/';

// const headers = { Authorization: localStorage.getItem("access") ? localStorage.getItem("access") : "No Access" };

// const d = () => {
//     console.log({ Authorization: localStorage.getItem("access") ? localStorage.getItem("access") : "No Access" });
//     return { Authorization: localStorage.getItem("access") ? localStorage.getItem("access") : "No Access" };
// }

// const apihit = axios.create({
//     baseURL: baseurl,
//     // withCredentials: true
//     // headers: { 'auth': auth }
//     headers: d()
// });

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
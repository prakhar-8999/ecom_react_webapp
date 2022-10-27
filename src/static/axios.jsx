import axios from "axios";

const baseurl = 'https://192.168.29.205:8000/';

const headers = { Authorization: localStorage.getItem("access") ? localStorage.getItem("access") : "No Access" };

const d = () => {
    return { Authorization: localStorage.getItem("access") ? localStorage.getItem("access") : "No Access" };
}

const apihit = axios.create({
    baseURL: baseurl,
    // withCredentials: true
    // headers: { 'auth': auth }
    headers: d()
});

export default apihit;
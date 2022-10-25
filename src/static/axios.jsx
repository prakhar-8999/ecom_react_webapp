import axios from "axios";

const baseurl = 'http://192.168.29.205:8000/';

const apihit = axios.create({
    baseURL: baseurl,
    // withCredentials: true
});

export default apihit;
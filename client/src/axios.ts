import axios from "axios";

export const makeRequest=axios.create({
    baseURL: "https://youtube-clone-ii48.onrender.com/api/",
    withCredentials:true,
})
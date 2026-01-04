import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://a10-b12-rent-wheel-server.onrender.com/',
})

const useAxios = ()=>{
    return axiosInstance;
}

export default useAxios
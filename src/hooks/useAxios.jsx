import axios from "axios"

const axiosInstance = axios.create({
    // baseURL: 'https://rent-wheel-server-api.onrender.com',
    baseURL: 'http://localhost:3000',
})

const useAxios = ()=>{
    return axiosInstance;
}

export default useAxios
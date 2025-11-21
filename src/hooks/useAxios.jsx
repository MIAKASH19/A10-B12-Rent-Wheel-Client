import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://rent-wheel-server-api.onrender.com',
})

const useAxios = ()=>{
    return axiosInstance;
}

export default useAxios
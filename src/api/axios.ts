import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

axiosInstance.interceptors.response.use(
    (responce) => responce,
    (error) => {
        const message = error.response?.data?.message || 'Скорее всего проблемы соединения'

        throw new Error(message)
    }
)

export default axiosInstance
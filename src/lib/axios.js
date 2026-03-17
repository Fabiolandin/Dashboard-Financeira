import axios from 'axios'

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_REFRESH_TOKEN_KEY } from '@/constants/local-storage'

export const protectedApi = axios.create({
    baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com",
})

export const publicApi = axios.create({
    baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com",
})

protectedApi.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
    if (!accessToken) {
        return request
    }
    request.headers.Authorization = `Bearer ${accessToken}`
    return request
})

protectedApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        if (!refreshToken) {
            return Promise.reject(error)
        }

        if (error.response.status == 401 &&
             !request._retry &&
              !request.url.includes('/auth/refresh')
            ) {
            request._retry = true
            try {
                const response = await protectedApi.post('/auth/refresh', {
                    refreshToken,
                })
                const newAccesToken = response.data.accessToken
                const newRefreshToken = response.data.refreshToken
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccesToken)
                localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken)
                request.headers.Authorization = `Bearer ${newAccesToken}`
                return protectedApi(request)
            } catch (refreshError) {
                localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
                localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
                console.error(refreshError)
            }
        }
        return Promise.reject(error)
    })
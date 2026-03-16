import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

export const AuthContext = createContext({
    user: null,
    login: () => { },
    signup: () => { },
})

export const useAuthContext = () => useContext(AuthContext)

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (variables) => {
            const response = await api.post('/users', {
                first_name: variables.firstName,
                last_name: variables.lastName,
                email: variables.email,
                password: variables.password,
            })
            return response.data
        },
    })

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (variables) => {
            const response = await api.post('/users/login', {
                password: variables.password,
            })
            return response.data
        },
    })

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken')
                const refreshToken = localStorage.getItem('refreshToken')
                if (!accessToken && !refreshToken) return
                const response = await api.get('/users/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                setUser(response.data)
            } catch (error) {
                localStorage.removeItem('accessToken')
                console.error(error)
            }
        }
        init()
    }, [])

    const signup = (data) => {
        signupMutation.mutate(data, {
            onSuccess: (createdUser) => {
                const accessToken = createdUser.tokens.accessToken
                const refreshToken = createdUser.tokens.refreshToken
                setUser(createdUser)
                localStorage.setItem('acessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                toast.success('Conta criada com sucesso!')
            },
            onError: () => {
                toast.error('Erro, sua conta não foi criada!')
            }
        })
    }
    const login = (data) => {
        loginMutation.mutate(data, {
            onSuccess: (loggedUser) => {
                const accessToken = loggedUser.tokens.accessToken
                const refreshToken = loggedUser.tokens.refreshToken
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                setUser(loggedUser)
                toast.success('login realizado com sucesso!')
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
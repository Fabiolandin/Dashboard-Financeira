import PasswordInput from '@/components/password-inputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email({
        message: 'O e-mail é inválido.',
    })
        .trim().min(1, {
            message: 'O e-mail é obrigatório.',
        }),

    password: z.string().trim().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres.'
    })
})

const LoginPage = () => {
    const [user, setUser] = useState(null)
    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (variables) => {
            const response = await api.post('/users/login', {
                password: variables.password,
            })
            return response.data
        },
    })
    const methods = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    useEffect(() => {
        const init = async () => {
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            if(!accessToken && !refreshToken) return;
            try{
                const response = await api.get('/users/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                setUser(response.data)
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                console.error(error)
            }
        }
        init()
    }, [])

    const handleSubmit = (data) => {
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

    if (user){
        return <h1>Olá user!</h1>
    }

    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <Card className="w-[500px]">
                        <CardHeader>
                            <CardTitle className="items-center">Entre na sua conta</CardTitle>
                            <CardDescription>Insira seus dados abaixo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Input de email */}
                            <FormField
                                control={methods.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Input de senha */}
                            <FormField
                                control={methods.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Fazer Login</Button>
                        </CardFooter>
                    </Card>
                    <div className='flex items-center justify-center'>
                        <p className='text-center opacity-50'>Ainda não possui uma conta?</p>
                        <Button variant="link" asChild>
                            <Link to="/signup">Crie agora </Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LoginPage;
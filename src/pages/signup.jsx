import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import PasswordInput from '@/components/password-inputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Link, Navigate } from 'react-router';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthContext } from '@/context/auth';

const signupSchema = z.object({
    firstName: z.string().trim().min(1, {
        message: 'O nome é obrigatório',
    }),
    lastName: z.string().trim().min(1, {
        message: 'O sobrenome é obrigatório.',
    }),
    email: z.string().email({
        message: 'O e-mail é inválido.',
    })
        .trim().min(1, {
            message: 'O e-mail é obrigatório.',
        }),

    password: z.string().trim().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres.'
    }),
    passwordConfirmation: z.string().trim().min(6, {
        message: 'A confirmação de senha é obrigatória.'
    }),
    //terms precisa ser true
    terms: z.boolean().refine((value) => value == true, {
        message: 'Voce precisa aceitar os termos.',
    })
})
    .refine((data) => data.password == data.passwordConfirmation, {
        message: 'As senhas não coincidem.',
        path: ['passwordConfirmation'],
    })

const SignupPage = () => {
    const { user, signup, isInitializing } = useAuthContext();

    const methods = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            terms: false,
        }
    }, [])



    const handleSubmit = (data) => signup(data)

    if (isInitializing) return null

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <Card className="w-[500px]">
                        <CardHeader>
                            <CardTitle>Crie a sua conta</CardTitle>
                            <CardDescription>Insira os dados abaixo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Input de primeiro nome */}
                            <FormField
                                control={methods.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Input de ultimo nome */}
                            <FormField
                                control={methods.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu sobrenome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            {/* Input de confirmação de senha */}
                            <FormField
                                control={methods.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmação de Senha</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="Digite sua senha novamente" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="items-top flex space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <label
                                                htmlFor="terms"
                                                className={
                                                    `text-xs text-muted-foreground opacity-75 ${methods.formState.errors.terms && 'text-red-500'}`
                                                }
                                            >
                                                Ao clicar em (Criar conta), você aceita nossos termos de uso
                                            </label>
                                        </div>
                                    </FormItem>
                                )}
                            />

                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Criar conta</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <div className='flex items-center justify-center'>
                <p className='text-center opacity-50'>Já possui uma conta?</p>
                <Button variant="link" asChild>
                    <Link to="/login">Faça login </Link>
                </Button>
            </div>
        </div>
    )
}

export default SignupPage;
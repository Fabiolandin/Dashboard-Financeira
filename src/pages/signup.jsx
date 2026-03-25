import PasswordInput from '@/components/password-inputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Link, Navigate } from 'react-router';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthContext } from '@/context/auth';
import { useSignupForm } from '@/forms/hooks/user';
import { Loader2Icon } from 'lucide-react';

const SignupPage = () => {
    const { user, signup, isInitializing } = useAuthContext();
    const form = useSignupForm()

    const handleSubmit = (data) => signup(data)

    if (isInitializing) return null

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Card className="w-[500px]">
                        <CardHeader>
                            <CardTitle>Crie a sua conta</CardTitle>
                            <CardDescription>Insira os dados abaixo.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Input de primeiro nome */}
                            <FormField
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                                    `text-xs text-muted-foreground opacity-75 ${form.formState.errors.terms && 'text-red-500'}`
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
                            <Button type="submit" className="w-full"
                            disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && (
                                    <Loader2Icon className='animate-spin' />
                                )}
                                Criar conta</Button>
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
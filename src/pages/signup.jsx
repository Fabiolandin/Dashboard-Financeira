import PasswordInput from '@/components/password-inputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

const SignupPage = () => {


    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Crie a sua conta</CardTitle>
                    <CardDescription>Insira os dados abaixo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Digite seu nome" />
                    <Input placeholder="Digite seu sobrenome" />
                    <Input placeholder="Digite seu e-mail" />
                    <PasswordInput placeholder={"Digite sua senha"} />
                    <PasswordInput placeholder={"Confirme a sua senha"} />
                    <div className='items-top flex space-x-2'>
                        <Checkbox id="terms1" />
                        <div className='grid gap-1.5 leading-none'>
                            <label
                                htmlFor="terms"
                                className='text-xs text-muted-foreground opacity-75'
                            >
                                Ao clicar em "Criar conta", você aceita nossos termos de uso 
                            </label>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button className="w-full">Criar conta</Button>
                </CardFooter>
            </Card>
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
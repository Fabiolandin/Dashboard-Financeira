import PasswordInput from '@/components/password-inputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

const LoginPage = () => {
    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle className="items-center">Entre na sua conta</CardTitle>
                    <CardDescription>Insira seus dados abaixo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input placeholder="Digite sua senha" />
                    <PasswordInput />
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
        </div>
    )
}

export default LoginPage;
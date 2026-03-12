import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { forwardRef, useState } from "react";


const PasswordInput = forwardRef(
    // eslint-disable-next-line react/prop-types
    ({ placeholder = "Digite sua senha", ...props }, ref) => {
        const [passwordIsVisible, setPasswordIsVisible] = useState(false)

        return (
            //Botão e Input de senha, com lógica para exibir e ocultar texto
            < div className='relative' >
                <Input
                    type={passwordIsVisible ? 'text' : 'password'}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                />
                <Button
                    variant="ghost"
                    className="absolute right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
                    onClick={() => setPasswordIsVisible((prev) => !prev)}
                >
                    {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
            </div >

        );
    }
)

PasswordInput.displayName = 'PasswordInput'


export default PasswordInput
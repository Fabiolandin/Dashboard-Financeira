import { useAuthContext } from "@/context/auth";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDownIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
    const { user, signOut } = useAuthContext()
    return(
        <Card>
        <CardContent className="px-8 py-4 flex items-center justify-between">
            <div>
                
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="space-x-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png"/>
                                <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                                {user.firstName} {user.lastName}
                            </p>
                            <ChevronDownIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button variant="ghost" 
                            size="small" 
                            className="w-full justify-start"
                            onClick={signOut}
                            >
                                <LogOut />
                                Sair
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardContent>
        </Card>

    )
}
export default Header;
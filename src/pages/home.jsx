import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth";
import { Navigate } from "react-router";

const HomePage = () => {
    const { user, isInitializing, signOut } = useAuthContext()
    if (isInitializing) return null
    if(!user) {
        return <Navigate to="/login" />
    }
    return(
        <>
        <Header />
        <Button onClick={signOut}>Sair</Button>
        </>
    )

}

export default HomePage;
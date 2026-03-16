import { useAuthContext } from "@/context/auth";
import { Navigate } from "react-router";

const HomePage = () => {
    const { user, isInitializing } = useAuthContext()
    if (isInitializing) return null
    if(!user) {
        return <Navigate to="/login" />
    }
    return <h1>Home Page</h1>

}

export default HomePage;
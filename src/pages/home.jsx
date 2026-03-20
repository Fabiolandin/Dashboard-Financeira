import AddTransactionButton from "@/components/add-transaction-button";
import Balance from "@/components/balance";
import DateSelection from "@/components/date-selection";
import Header from "@/components/header";
import { useAuthContext } from "@/context/auth";
import { Navigate } from "react-router";

const HomePage = () => {
    const { user, isInitializing } = useAuthContext()
    if (isInitializing) return null
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <Header />
            <div className="p-8 space-y-6">
                {/* Seletor data e botão de nota transação*/}
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-2xl">Dashboard</h2>
                    <div className="flex items-center gap-2">
                        <DateSelection />
                        <AddTransactionButton />
                    </div>
                </div>
                {/* Graficos Etc*/}
                <div className="grid grid-cols-[2fr, 1fr]">
                    <Balance />
                </div>
            </div>
        </>
    )

}

export default HomePage;
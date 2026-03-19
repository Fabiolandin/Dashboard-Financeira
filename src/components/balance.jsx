import { UserService } from "@/services/user"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import BalanceItem from "./balance-item"
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import { useAuthContext } from "@/context/auth"

const Balance = () => {
    const [searchParams] = useSearchParams()
    const {user} = useAuthContext()
    const {data} = useQuery({
        queryKey: ["balance", user.id],
        queryFn: () => {
            const from = searchParams.get('from');
            const to = searchParams.get('to');
            return UserService.getBalance({from, to})
        }
    })
    console.log(data)
    return (<div className="grid grid-cols-2 grid-rows-2 gap-6">
        <BalanceItem label="Saldo" amount={data?.balance} icon={<WalletIcon />} />
        <BalanceItem label="Ganhos" amount={data?.earnings} icon={<TrendingUpIcon className="text-primary-green" size={16} />} />
        <BalanceItem label="Gastos" amount={data?.expenses} icon={<TrendingDownIcon className="text-primary-red" size={16}/>} />
        <BalanceItem label="Investimentos" amount={data?.investments} icon={<PiggyBankIcon className="text-primary-blue" size={16} />} />
    </div>
    )
}

export default Balance
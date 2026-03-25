import { formatCurrency } from "@/pages/helpers/currency"
import { Card, CardContent } from "./ui/card"

// eslint-disable-next-line react/prop-types
const BalanceItem = ({ label, icon, amount }) => {
    return (
        <Card>
            <CardContent className="p-6 space-y-2">
                {/* Iconi e label */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted">
                        {icon}
                    </div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                </div>
                <h3 className="text-2xl font-semibold">{formatCurrency(amount)}</h3>
            </CardContent>
        </Card>
    )
}

export default BalanceItem
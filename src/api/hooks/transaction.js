import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TransactionService } from "../services/transactions"
import { getUserBalanceQueryKey } from "./user"
import { useAuthContext } from "@/context/auth"

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
    const { user } = useAuthContext()
        const queryClient = useQueryClient()
    return useMutation({
        mutationKey: createTransactionMutationKey,
        mutationFn: (input) => TransactionService.create(input),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUserBalanceQueryKey({ userId: user.id }),
                exact: false
            })
        }
    })
}
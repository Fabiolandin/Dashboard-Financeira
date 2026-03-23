import { protectedApi } from "@/lib/axios"

export const TransactionService = {

    /**
     * 
     * @param {Object} input - Usuário a ser criado.
     * @param {string} input.name - Nome da transação.
     * @param {string} input.date - Data da transação.
     * @param {string} input.amount - Valor da transação.
     * @param {string} input.type - Tipo da transação.
     */
    create: async (input) => {
        const response = await protectedApi.post('/api/transactions/me', input)
        return response.data
    }
}
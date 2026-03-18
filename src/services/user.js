import { protectedApi, publicApi } from "@/lib/axios"

export const UserService = {
    /**
     * Cria um novo usuario
     * @param {Object} input 
     * @param {string} input.firstName
     * @param {string} input.lastName
     * @param {string} input.email
     * @param {string} input.password
     * @returns {Object}
     * @returns {string}
     */

    signup: async (input) => {
        const response = await publicApi.post('/api/users', {
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            password: input.password,
        })
        return {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            tokens: response.data.tokens
        }
    },

    /**
 * Login de usuario
 * @param {Object} input 
 * @param {string} input.email
 * @param {string} input.password
 * @returns {Object}
 * @returns {string}
 */

    login: async (input) => {
        const response = await publicApi.post('/api/users/login', {
            email: input.email,
            password: input.password,
        })
        return {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            tokens: response.data.tokens
        }
    },

        /**
     * Retorna usuario autenticado
     * @returns {Object}
     */
    me: async () => {
        const response = await protectedApi.get('/api/users/me')
        return {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
        }
    }
}
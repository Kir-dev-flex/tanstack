import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../api/users.api'
import { type User } from '../api/users.api'

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
        updateUser(id, data),

        onSuccess: (updatedUser, variables) => {
            queryClient.setQueryData(['user', variables.id], updatedUser)

            queryClient.invalidateQueries({ queryKey: ['users'] }) //Если имя изменится, то и весь список получаеся уже другой
        },

        onError: (error) => {
            console.error('Ошибка при обновлении:', error.message)
        },
    })
}
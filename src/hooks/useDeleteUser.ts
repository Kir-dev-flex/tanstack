import { deleteUser } from '../api/users.api'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteUser,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        },

        onError: (error) => {
            console.log('Ошибка удаления: ', error.message)
        }
    })
}
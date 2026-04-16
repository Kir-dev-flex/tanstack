import { createUser } from '../api/users.api'
import { useMutation, useQueryClient  } from '@tanstack/react-query'

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUser,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['users']})
        },

        onError: (error) => {
            console.log('Ошибка: ', error)
        }
    })
}
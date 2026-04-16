import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/users.api'

export const useUser = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id!),
        enabled: !!id,
    })
}
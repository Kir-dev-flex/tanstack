import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getUsersPaginated, type User } from '../api/users.api'

export const usePaginatedUsers = (page: number, limit = 3) => {
    return useQuery<User[], Error>({
        queryKey: ['users', { page }],
        queryFn: () => getUsersPaginated(page, limit),
        placeholderData: keepPreviousData, // keepPreviousData: true оказывается устарела, теперь надо так
        staleTime: 5 * 60 * 1000,
    })
}
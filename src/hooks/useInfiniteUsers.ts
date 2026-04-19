import { useInfiniteQuery } from '@tanstack/react-query'
import { getUsersPaginated, type User } from '../api/users.api'

const PAGE_SIZE = 3;

export const useInfiniteUsers = () => {
    return useInfiniteQuery<User[], Error>({
        queryKey: ['users', 'infinite'],
        queryFn: ({ pageParam = 1 }) => getUsersPaginated(pageParam as number, PAGE_SIZE),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // Если последняя страница полная, есть следующая
            return lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined;
        },
        staleTime: 5 *60 * 1000,
    })
}
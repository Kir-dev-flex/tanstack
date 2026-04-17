// hooks/useSearchUsers.ts
import { useQuery } from '@tanstack/react-query';
import { searchUsers, type User } from '../api/users.api';

export const useSearchUsers = (query: string) => {
    return useQuery<User[], Error>({
        queryKey: ['users', 'search', query],
        queryFn: () => searchUsers(query),
        enabled: query.length >= 2,
    });
};
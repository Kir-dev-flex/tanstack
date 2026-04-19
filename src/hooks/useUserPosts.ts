import { useQuery } from '@tanstack/react-query';
import { getUserPosts, type Post } from '../api/users.api';

export const useUserPosts = (userId: number) => {
    return useQuery<Post[], Error>({
        queryKey: ['users', userId, 'posts'],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId,
    });
};
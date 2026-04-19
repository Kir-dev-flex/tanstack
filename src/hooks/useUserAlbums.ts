import { useQuery } from '@tanstack/react-query';
import { getUserAlbums, type Album } from '../api/users.api';

export const useUserAlbums = (userId: number) => {
    return useQuery<Album[], Error>({
        queryKey: ['users', userId, 'Albums'],
        queryFn: () => getUserAlbums(userId),
        enabled: !!userId,
    });
};
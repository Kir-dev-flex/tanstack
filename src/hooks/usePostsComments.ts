import { useQuery } from '@tanstack/react-query';
import { getPostComments, type Comment } from '../api/users.api';

export const usePostComments = (postId: number | null) => {
  return useQuery<Comment[], Error>({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => getPostComments(postId!),
    enabled: !!postId,
  });
};
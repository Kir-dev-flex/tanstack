import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserPosts, getUserAlbums, getPostComments } from '../api/users.api';
import type { Post, Album, Comment } from '../api/users.api';

interface UserProfileProps {
    userId: number;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const queryClient = useQueryClient();

    // Параллельные запросы постов и альбомов
    const {
        data: posts,
        isLoading: postsLoading,
        isError: postsError,
    } = useQuery<Post[], Error>({
        queryKey: ['users', userId, 'posts'],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId,
    });

    const {
        data: albums,
        isLoading: albumsLoading,
        isError: albumsError,
    } = useQuery<Album[], Error>({
        queryKey: ['users', userId, 'albums'],
        queryFn: () => getUserAlbums(userId),
        enabled: !!userId,
    });

    // Зависимый запрос комментариев (только когда выбран пост)
    const {
        data: comments,
        isLoading: commentsLoading,
        isError: commentsError,
    } = useQuery<Comment[], Error>({
        queryKey: ['posts', selectedPostId, 'comments'],
        queryFn: () => getPostComments(selectedPostId!),
        enabled: !!selectedPostId,
    });

    // Prefetch комментариев при наведении на пост по аналогии с предыдущим заданием
    const handlePostHover = (postId: number) => {
        queryClient.prefetchQuery({
        queryKey: ['posts', postId, 'comments'],
        queryFn: () => getPostComments(postId),
        });
    };

    if (postsLoading || albumsLoading) return <div>Загрузка данных пользователя...</div>;
    if (postsError || albumsError) return <div>Ошибка загрузки данных</div>;

    return (
        <div style={{ marginTop: '20px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Профиль пользователя</h3>

        <div style={{ display: 'flex', gap: '20px' }}>
            {/* Посты */}
            <div style={{ flex: 1 }}>
            <h4>Посты</h4>
            <ul>
                {posts?.map((post) => (
                <li
                    key={post.id}
                    style={{
                    cursor: 'pointer',
                    background: selectedPostId === post.id ? '#e0f0ff' : 'transparent',
                    padding: '8px',
                    marginBottom: '4px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    }}
                    onClick={() => setSelectedPostId(post.id)}
                    onMouseEnter={() => handlePostHover(post.id)}
                >
                    <strong>{post.title}</strong>
                    <p>{post.body.substring(0, 50)}...</p>
                </li>
                ))}
            </ul>
            </div>

            {/* Альбомы */}
            <div style={{ flex: 1 }}>
            <h4>Альбомы</h4>
            <ul>
                {albums?.map((album) => (
                <li key={album.id} style={{ padding: '4px' }}>
                    {album.title}
                </li>
                ))}
            </ul>
            </div>
        </div>

        {/* Комментарии к выбранному посту */}
        {selectedPostId && (
            <div style={{ marginTop: '20px' }}>
            <h4>Комментарии к посту #{selectedPostId}</h4>
            {commentsLoading && <div>Загрузка комментариев...</div>}
            {commentsError && <div>Ошибка загрузки комментариев</div>}
            {comments && (
                <ul>
                {comments.map((comment) => (
                    <li key={comment.id} style={{ marginBottom: '8px' }}>
                    <strong>{comment.name}</strong> ({comment.email})<br />
                    {comment.body}
                    </li>
                ))}
                </ul>
            )}
            </div>
        )}
        </div>
    );
};
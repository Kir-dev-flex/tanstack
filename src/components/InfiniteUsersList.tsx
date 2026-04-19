import { useInfiniteUsers } from '../hooks/useInfiniteUsers';

export const InfiniteUsersList = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteUsers();

    if (isLoading) {
        return <div>Загрузка пользователей...</div>;
    }

    if (isError) {
        return <div>Ошибка: {error.message}</div>;
    }

    // data.pages — массив страниц, каждая страница — массив пользователей
    const users = data?.pages.flat() ?? [];

    return (
        <div style={{ marginTop: '32px', padding: '16px', border: '1px solid #ccc' }}>
        <h2>Пользователи (бесконечная прокрутка)</h2>

        <ul>
            {users.map((user) => (
            <li key={user.id} style={{ marginBottom: '8px' }}>
                <strong>{user.name}</strong> — {user.email}
            </li>
            ))}
        </ul>

        <div style={{ marginTop: '16px' }}>
            {isFetchingNextPage && <div>Загрузка следующей страницы...</div>}
            {hasNextPage && !isFetchingNextPage && (
            <button onClick={() => fetchNextPage()}>Загрузить ещё</button>
            )}
            {!hasNextPage && <div>Есть только 10 пользователей, больше нет :С</div>}
        </div>
        </div>
    );
};
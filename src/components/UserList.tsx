import { UserDetails } from './UserDetails'
import { useState } from 'react'
import { CreateUserForm } from './CreateUserForm'
import { useDeleteUser } from '../hooks/useDeleteUser'
import { SearchBar } from './SearchBar'
import { usePaginatedUsers } from '../hooks/usePaginatedUsers'
import { useQueryClient } from '@tanstack/react-query'
import { getUser } from '../api/users.api'

export const UserList = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);

    const PAGE_SIZE = 3; // количество пользователей на странице


    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

    const {
        data: users,
        isLoading,
        isError,
        error,
        isFetching,
    } = usePaginatedUsers(page, PAGE_SIZE);

    const { mutate: deleteUserMutate, isPending: isDeleting } = useDeleteUser()

    if (isLoading) { //Теперь я знаю про Suspense и useTransition, но пока не буду отвлекаться на эту реализацию
        return <div>Загрузка пользователей...</div>
    }

    if (isError) {
        return <div>{`Ошибка: ${error.message}`}</div>
    }

    const handleUserClick = (id: number) => {
        setSelectedUserId(id)
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Точно удаляем?')) {
            deleteUserMutate(id)
        }
    }

    const goToNextPage = () => setPage((prev) => prev + 1);
    const goToPrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

    // Предзагрузка
    const handlePrefetchUser = (id: number) => {
        queryClient.prefetchQuery({
            queryKey: ['user', id],
            queryFn: () => getUser(id),
            staleTime: 5 * 60 * 1000
        })
    }

    return (
        <div>
            <h2>Список пользователей</h2>
            
            {/* Индикатор обновления при смене страницы */}
            {isFetching && <div style={{ color: 'gray' }}>Обновление списка...</div>}

            <ul style={{listStyle: 'none'}}>
                {users?.map((user) => (
                <li
                    key={user.id}
                    style={{
                    cursor: 'pointer',
                    background: selectedUserId === user.id ? 'gold' : 'transparent',
                    marginBottom: '20px',
                    border: '1px solid green',
                    padding: '20px',
                    borderRadius: '5px'
                    }}
                    onClick={() => handleUserClick(user.id)}
                    onMouseEnter={() => handlePrefetchUser(user.id)}
                >
                    <strong>{user.name}</strong>
                    <p>Email: {user.email}</p>
                    <p>Город: {user.address?.city || 'неизвестен'}</p>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                    }}
                    disabled={isDeleting}
                    style={{
                        marginTop: '8px',
                        padding: '4px 12px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    >
                    {isDeleting ? 'Удаление...' : 'Удалить'}
                    </button>
                </li>
                ))}
            </ul>

            {/* Кнопки пагинации */}
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                <button onClick={goToPrevPage} disabled={page === 1}>
                ← Предыдущая
                </button>
                <span style={{ margin: '0 12px' }}>Страница {page}</span>
                <button onClick={goToNextPage} disabled={users?.length === 0}>
                Следующая →
                </button>
            </div>

            <SearchBar />
            {selectedUserId && <UserDetails id={selectedUserId} onClose={() => setSelectedUserId(null)}/>}
            <CreateUserForm />
        </div>
    )
}

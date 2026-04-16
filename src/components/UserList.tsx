import { useUsers } from '../hooks/useUsers'
import { UserDetails } from './UserDetails'
import { useState } from 'react'
import { CreateUserForm } from './CreateUserForm'
import { useDeleteUser } from '../hooks/useDeleteUser'

export const UserList = () => {

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

    const {data: users, isLoading, isError, error} = useUsers()

    const { mutate: deleteUserMutate, isPending: isDeleting } = useDeleteUser()

    if (isLoading) { //Теперь я знаю про Suspense и useTransition, но пока не буду отвлекаться на эту реализацию
        return <div>Загрузка пользователей...</div>
    }

    if (isError) {
        return <div>Ошибка: ${error.message}</div>
    }

    const handleUserClick = (id: number) => {
        setSelectedUserId(id)
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Точно удаляем?')) {
            deleteUserMutate(id)
        }
    }

    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users?.map((user) => (
                    <li
                    style={
                        {
                            cursor: 'pointer',
                            background: selectedUserId === user.id ? 'gold' : 'transparent'
                        }} 
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    >
                        <strong>{user.name}</strong>
                        <p>Email: {user.email}</p>
                        <p>Город: {user.address?.city || "неизвестен"}</p>
                        <button
                            onClick={(e) => {
                            e.stopPropagation(); // чтобы клик по кнопке не вызывал выбор пользователя
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
                {selectedUserId && <UserDetails id={selectedUserId} />}
                <CreateUserForm />
        </div>
    )
}

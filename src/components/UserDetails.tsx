import { useUser } from '../hooks/useUser'

export const UserDetails = ({id}: {id:number}) => {
    const {data: user, isLoading, isError, error } = useUser(id)

    if (isLoading) return <div>Загрузка пользователя...</div>
    if (isError) return <div>Ошибка пользователя: {error.message}</div>
    if (!user) return <div>Пользователь не найден</div> // Для красоты можно было бы обернуть все в див, котоырй внизу, тогда бы все эти уведомления показывались в развернутом "попапе", но это лучше сделать с полноценными стилями, а то мешанина здесь получится

    return (
        <div style={{border: '1px solid white', color: '#000', background: '#fff', borderRadius: '18px', position: 'absolute', left: '0', top: '0'}}>
            <p>Имя: {user.name}</p>
            <p>Почта: {user.email}</p>
            <p>Телефон: {user.phone}</p>
            <p>Работа: {user.company?.name || '-'}</p>
            <p>Сайт: {user.website || '-'}</p>
        </div>
    )
}
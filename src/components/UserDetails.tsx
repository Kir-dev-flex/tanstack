import { useUser } from '../hooks/useUser'
import { useState } from 'react'
import { type User } from '../api/users.api'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { UserProfile } from './UserProfile';

interface UserDetailsProps {
    id: number;
    onClose: () => void;
}

export const UserDetails = ({ id, onClose }: UserDetailsProps) => {
    const {data: user, isLoading, isError, error } = useUser(id)
    const {mutate: updateUser, isPending: isUpdating} = useUpdateUser()

    const [ isEditing, setIsEditing ] = useState(false) // редактируем пользователя или нет?
    const [ formData, setFormData ] = useState<Partial<User>>({}) // локальное состояние фомры

    if (isLoading) return <div>Загрузка пользователя...</div>
    if (isError) return <div>Ошибка пользователя: {error.message}</div>
    if (!user) return <div>Пользователь не найден</div> // Для красоты можно было бы обернуть все в див, котоырй внизу, тогда бы все эти уведомления показывались в развернутом "попапе", но это лучше сделать с полноценными стилями, а то мешанина здесь получится

    const handleEditClick = () => {
        if (user) { // Предзаполним форму текущими данными
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                website: user.website,
            })
        }
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        updateUser(
        { id: user.id, data: formData },
        {
            onSuccess: () => {
                setIsEditing(false); // закрываем форму после успеха
            },
                onError: (error) => {
                alert(`Ошибка: ${error.message}`);
            },
        }
        );
    }; 

    return (
        <div style={{border: '1px solid white', color: '#000', background: '#fff', borderRadius: '18px', position: 'absolute', left: '0', top: '0'}}>
            {!isEditing?
                ( // Режим просмотра длеталей
                    <>
                    <button
                        onClick={onClose}
                        style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'red',
                        fontSize: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        }}
                    >
                        X
                    </button>
                        <p>Имя: {user.name}</p>
                        <p>Почта: {user.email}</p>
                        <p>Телефон: {user.phone}</p>
                        <p>Работа: {user.company?.name || '-'}</p>
                        <p>Сайт: {user.website || '-'}</p>
                        <button onClick={handleEditClick}>Редактировать</button>
                        <UserProfile userId={user.id} />
                    </>
                ) : ( // Режим редактирования пользователя
                    <form onSubmit={handleSubmit}>
                        <h3>Редактирование пользователя</h3>
                        <label style={{ display:'block' }}>
                            Имя: 
                            <input 
                            type='text'
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            disabled={isUpdating}
                            style={{ marginLeft: '8px' }}/>
                        </label>
                        <label style={{ display:'block' }}>
                            Почта: 
                            <input 
                            type='email'
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            disabled={isUpdating}
                            style={{ marginLeft: '8px' }}/>
                        </label>
                        <label style={{ display:'block' }}>
                            Телефон: 
                            <input 
                            type='tel'
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            disabled={isUpdating}
                            style={{ marginLeft: '8px' }}/>
                        </label>
                        <label style={{ display:'block' }}>
                            Сайт: 
                            <input 
                            type='text'
                            name="website"
                            value={formData.website || ''}
                            onChange={handleChange}
                            disabled={isUpdating}
                            style={{ marginLeft: '8px' }}/>
                        </label>
                        
                        <div style={{ marginTop: '12px' }}>
                            <button type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Сохранение...' : 'Сохранить'}
                            </button>

                            <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isUpdating}
                            style={{ marginLeft: '8px' }}
                            >
                            Отмена
                            </button>
                        </div>
                    </form>
                )
                
            }
        </div>
    )
}
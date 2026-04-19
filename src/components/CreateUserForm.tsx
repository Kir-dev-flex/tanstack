import { useState } from 'react'
import { useCreateUser } from '../hooks/useCreateUser'
import { type User } from '../api/users.api'

export const CreateUserForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const { mutate, isPending, isError, error, isSuccess } = useCreateUser()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newUser: Omit<User, 'id'> = { // id сервак должен сам придумать
        name,
        email,
        phone,
    }

    mutate(newUser)
    }

    return (
        <div
            style={{
            marginTop: '24px',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#000'
        }}
        >

        <h3>Создать нового пользователя</h3>
        {isSuccess && (
            <div style={{ color: 'green', marginBottom: '12px' }}>
                Пользователь успешно создан!
            </div>
        )}

        {isError && (
            <div style={{ color: 'red', marginBottom: '12px' }}>
                Ошибка: {error.message}
            </div>
        )}

            <form onSubmit={handleSubmit}>
                <label style={{display: 'block', color: '#000'}}>
                    Имя
                    <input 
                        style={{display: 'block', color: '#000'}}
                        type='text' 
                        value={name} 
                        required 
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                    />
                </label>
                <label style={{display: 'block', color: '#000'}}>
                    Email
                    <input 
                        style={{display: 'block'}}
                        type='email' 
                        value={email} 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isPending}
                    />
                </label>
                <label style={{display: 'block', color: '#000'}}>
                    Телефон
                    <input 
                        style={{display: 'block'}}
                        type='tel' 
                        value={phone} 
                        required 
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isPending}
                    />
                </label>
                <button type='submit' disabled={isPending}>
                    {isPending? 'Создание...' : 'Отправить'}
                </button>
            </form>
        </div>
    )
}
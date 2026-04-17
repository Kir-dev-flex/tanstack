import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchUsers } from '../hooks/useSearchUsers';

export const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const debouncedQuery = useDebounce(inputValue, 400);

    const { data: users, isLoading, isError, error, isFetching } =
        useSearchUsers(debouncedQuery);

    return (
        <div style={{ marginBottom: '20px' }}>
        <h3>Поиск пользователей</h3>
        <input
            type="text"
            placeholder="Введите имя или email (мин. 2 символа)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
        />
        {isFetching && <div>Поиск...</div>}
        {isLoading && <div>Загрузка...</div>}
        {isError && <div>Ошибка: {error.message}</div>}
        {users && (
            <ul>
            {users.length === 0 ? (
                <li>Ничего не найдено</li>
            ) : (
                users.map((user) => (
                <li key={user.id}>
                    {user.name} ({user.email})
                </li>
                ))
            )}
            </ul>
        )}
        </div>
    );
};
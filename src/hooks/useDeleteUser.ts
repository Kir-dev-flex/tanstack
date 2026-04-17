import { deleteUser, type User } from '../api/users.api'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

        return useMutation({
            mutationFn: deleteUser,

            onMutate: async (deletedUserId: number) => {
                // Отменяем все текущие запросы списка пользователей
                await queryClient.cancelQueries({ queryKey: ['users'] })

                 // Сохраняем предыдущее состояние кеша (для отката в случае ошибки)
                const previousUsers = queryClient.getQueryData<User[]>(['users']);

                // Оптимистично обновляем кеш: удаляем пользователя из списка
                queryClient.setQueryData<User[]>(['users'], (oldData) => {
                    if (!oldData) return [];
                    return oldData.filter((user) => user.id !== deletedUserId);
                });

                // Возвращаем контекст с предыдущими данными (будет доступен в onError)
                return { previousUsers };
            },

            onError: (_error, _deletedUserId, context) => {
            // Откатываем кеш к предыдущему состоянию
            if (context?.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers);
            } else {
                // На всякий случай инвалидируем, если контекст не сохранился
                queryClient.invalidateQueries({ queryKey: ['users'] });
            }
            },

            // onSettled вызывается в любом случае (успех или ошибка)
            onSettled: () => {
            // Инвалидируем кеш для окончательной синхронизации с сервером
            queryClient.invalidateQueries({ queryKey: ['users'] });
            },
        });
        };
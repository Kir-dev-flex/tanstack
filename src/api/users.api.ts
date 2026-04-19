import api from './axios'

export interface User {
    id: number,
    name: string,
    email: string,
    phone: string,
    website?: string,
    company?: {
        name: string
    }
    address?: {
        city: string
    }
}

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users')
    return response.data
}

export const getUser = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
}

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post<User>('/users', data)
    return response.data 
}

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => { //мы же передаем только те поля, которые изменились, верно? А значит нужно было придумать вот этот фокус с Partial<User>
    const response = await api.put<User>(`/users/${id}`, data)
    return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete<User>(`/users/${id}`)
}

export const searchUsers = async (query: string): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)) // Имитация загрузки
    
    const response = await api.get<User[]>('/users');
    const users = response.data;
    const lowerQuery = query.toLowerCase();
    return users.filter(
        user =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
    );
}

export const getUsersPaginated = async (page: number, limit: number = 3): Promise<User[]> => {
    const response = await api.get<User[]>('/users', {
        params: {
            _page: page,
            _limit: limit,
        },
    })
    return response.data
}

// Посты пользователя
export const getUserPosts = async (userId: number): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/users/${userId}/posts`);
    return response.data;
};

// Альбомы пользователя
export const getUserAlbums = async (userId: number): Promise<Album[]> => {
    const response = await api.get<Album[]>(`/users/${userId}/albums`);
    return response.data;
};

// Комментарии к посту
export const getPostComments = async (postId: number): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return response.data;
};

export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface Album {
    id: number;
    title: string;
}

export interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
}
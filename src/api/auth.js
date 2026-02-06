import apiClient from './client';

export const login = async (username, password) => {
    const response = await apiClient.post('/api/login', { username, password });
    return response.data; // Expected: { token: '...' }
};

export const register = async (username, password) => {
    const response = await apiClient.post('/api/users', { username, password });
    return response.data;
};

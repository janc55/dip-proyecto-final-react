import apiClient from './client';

export const getTasks = async (params = {}) => {
    const response = await apiClient.get('/api/tasks', { params });
    return response.data; // Expected: { total, data: [...] }
};

export const createTask = async (name) => {
    const response = await apiClient.post('/api/tasks', { name });
    return response.data;
};

export const updateTask = async (id, name) => {
    const response = await apiClient.put(`/api/tasks/${id}`, { name });
    return response.data;
};

export const toggleTaskStatus = async (id, done) => {
    const response = await apiClient.patch(`/api/tasks/${id}`, { done });
    return response.data;
};

export const deleteTask = async (id) => {
    await apiClient.delete(`/api/tasks/${id}`);
};

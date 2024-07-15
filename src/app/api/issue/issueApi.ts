import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'https://sandbox.creos.me/api/v1/',
});

export const fetchTasks = async () => {
    const response = await apiInstance.get('/issue/');
    return response.data;
};

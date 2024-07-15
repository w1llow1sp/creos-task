import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'https://sandbox.creos.me/api/v1/',
});

export const fetchComments = async () => {
    const response = await apiInstance.get('/comment/');
    return response.data;
};

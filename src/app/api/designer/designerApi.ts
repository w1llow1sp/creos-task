import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'https://sandbox.creos.me/api/v1/',
});

export const fetchDesigners = async () => {
    const response = await apiInstance.get('/designer/');
    return response.data.results;
};

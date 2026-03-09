import { axiosClient } from '@/src/services/api/axiosClient';

export const cartsService = {
    getCarts: async () => {
        const response = await axiosClient.get('/api/carts');
        return response.data;
    },
    addToCart: async (productId) => {
        const response = await axiosClient.post('/api/carts', { productId });
        return response.data;
    },
    updateCart: async (cartId, productId) => {
        const response = await axiosClient.put(`/api/carts/${cartId}`, { productId });
        return response.data;
    },
};
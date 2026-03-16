import api from '@/src/utils/axios';

const userServices = {
  getProfile: async () => {
    const { data } = await api.get('/user/profile');
    return data;
  },
  updateProfile: async (payload) => {
    const { data } = await api.put('/user/update-profile', payload);
    return data;
  },
};

const productServices = {
  getProducts: async () => {
    const { data } = await api.get('/products');
    return data;
  },
  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  searchProducts: async (query) => {
    const { data } = await api.get(`/products/search/query?query=${query}`);
    return data;
  },
};

const cartServices = {
  getCart: async () => {
    const { data } = await api.get('/cart');
    return data;
  },
  addToCart: async (productId) => {
    const { data } = await api.post('/cart/add', { productId });
    return data;
  },
  removeFromCart: async (productId) => {
    const { data } = await api.delete('/cart/remove', { productId });
    return data;
  },
};

const wishlistServices = {
  getWishlist: async () => {
    const { data } = await api.get('/wishlist');
    return data;
  },
  addToWishlist: async (productId) => {
    const { data } = await api.post('/wishlist/add', { productId });
    return data;
  },
  removeFromWishlist: async (productId) => {
    const { data } = await api.delete('/wishlist/remove', { productId });
    return data;
  },
};

const orderServices = {
  createOrder: async (payload) => {
    const { data } = await api.post('/order/create', payload);
    return data;
  },
  getMyOrders: async () => {
    const { data } = await api.get('/order/my-orders');
    return data;
  },
};

const paymentServices = {
  createOrder: async (payload) => {
    const { data } = await api.post('/payment/create-order', payload);
    return data;
  },
  verifyPayment: async (payload) => {
    const { data } = await api.post('/payment/verify', payload);
    return data;
  },
};

const reviewServices = {
  createReview: async (payload) => {
    const { data } = await api.post('/reviews', payload);
    return data;
  },
  getReviewsByProduct: async (productId) => {
    const { data } = await api.get(`/reviews/product/${productId}`);
    return data;
  },
  getMyReview: async (productId) => {
    const { data } = await api.get(`/reviews/product/${productId}/my-review`);
    return data;
  },
  updateReview: async (id, payload) => {
    const { data } = await api.put(`/reviews/${id}`, payload);
    return data;
  },
  deleteReview: async (id) => {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
  },
};

export {
    cartServices, orderServices,
    paymentServices, productServices, reviewServices, userServices, wishlistServices
};


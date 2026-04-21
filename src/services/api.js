import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const getAllProducts = () => api.get('/products/all');
export const getProductsByCategory = (slug) => api.get(`/categories/${slug}`);
export const getSingleProduct = (slug) => api.get(`/products/${slug}`);

export default api;
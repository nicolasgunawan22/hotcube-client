import axios from 'axios'

// dont forget to change the url, when already deployed on server
// const API = axios.create({ baseURL: "http://localhost:5000" })
const API = axios.create({ baseURL: "https://hotcube-api.herokuapp.com/" })

export const getCart = (email) => API.get(`/users/${email}`);
export const postCartItem = (email, newCart) => API.post(`/users/${email}`, newCart);
export const updateCartItem = (email, itemId, updatedCart) => API.patch(`/users/${email}/${itemId}`, updatedCart);
export const deleteCartItem = (email, _id) => API.delete(`/users/${email}/${_id}`);

export const getUser = () => API.get('/users')
export const updateUser = (_id, updatedUser) => API.patch(`/users/${_id}`, updatedUser)
export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const getOrders = () => API.get('/orders');
export const postOrder = (newOrder) => API.post('/orders', newOrder);
export const deleteOrder = (_id) => API.delete(`/orders/${_id}`);
export const updateOrder = (_id, updatedOrder) => API.patch(`/orders/${_id}`, updatedOrder)

export const getEspData = () => API.get('/data-for-esp');
export const postEspData = (newData) => API.post('/data-for-esp', newData);
export const deleteEspData = (_id) => API.delete(`/data-for-esp/${_id}`);
export const updateEspData = (_id, updatedData) => API.patch(`/data-for-esp/${_id}`, updatedData)

export const sendEmail = (emailContent) => API.post('/mail', emailContent);


/* export const getCart = () => API.get('/cart');
export const postCartItem = (newCart) => API.post('/cart', newCart);
export const updateCartItem = (itemId, updatedCart) => API.patch(`/cart/${itemId}`, updatedCart);
export const deleteCartItem = (_id) => API.delete(`/cart/${_id}`); */
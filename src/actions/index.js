import { FETCH_ALL, CREATE, UPDATE, DELETE, AUTH, GET_USER, UPDATE_USER, ORDERING, GET_ORDERS, POST_ORDER, UPDATE_ORDER, DELETE_ORDER, GET_ESP_DATA, POST_ESP_DATA, DELETE_ESP_DATA, UPDATE_ESP_DATA } from '../constants/actionTypes'
import * as api from '../api';

// CART 
export const getCart = (email) => async (dispatch) => {
   try {
      const { data } = await api.getCart(email);

      dispatch({ type: FETCH_ALL, payload: data });
   } catch (error) {
      console.warn(error.response)
   }
}

export const postCartItem = (email, cartItem) => async (dispatch) => {
   try {
      const { data } = await api.postCartItem(email, cartItem)
      dispatch({ type: CREATE, payload: data })
   } catch (error) {
      console.warn(error.response);
   }
}

export const updateCartItem = (email, itemId, cartItem) => async (dispatch) => {
   try {
      const { data } = await api.updateCartItem(email, itemId, cartItem)
      dispatch({ type: UPDATE, payload: data })

   } catch (error) {
      console.warn(error.response)
   }
}

export const deleteCartItem = (email, _id) => async (dispatch) => {
   try {
      await api.deleteCartItem(email, _id);
      dispatch({ type: DELETE, payload: _id });

   } catch (error) {
      console.warn(error.response)
   }
}

// USERS

export const signIn = (formData, history) => async (dispatch) => {
   try {
      // Log in the user...
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });

      history.push('/');
      history.go(0)
   } catch (error) {
      console.warn(error.response);
      dispatch({ type: 'USER_ERROR', payload: error.response.data })
   }
}

export const signUp = (formData, history) => async (dispatch) => {
   try {
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data });

      history.push('/');
      history.go(0)
   } catch (error) {
      console.warn(error.response);
      dispatch({ type: 'USER_ERROR', payload: error.response.data })
   }
}

export const getUser = () => async (dispatch) => {
   try {
      const { data } = await api.getUser();

      dispatch({ type: GET_USER, payload: data });
   } catch (error) {
      console.warn(error.response)
   }
}

export const updateUser = (_id, updatedUser) => async (dispatch) => {
   try {
      const { data } = await api.updateUser(_id, updatedUser)
      dispatch({ type: UPDATE_USER, payload: data })

   } catch (error) {
      console.warn(error.response)
   }
}

// FOR RECEIPT

export const ordering = (cart) => {
   return {
      type: ORDERING,
      payload: cart
   }
}

//ORDER

export const getOrders = () => async (dispatch) => {
   try {
      const { data } = await api.getOrders();

      dispatch({ type: GET_ORDERS, payload: data });
   } catch (error) {
      console.warn(error.response)
   }
}

export const postOrder = (cartItem) => async (dispatch) => {
   try {
      const { data } = await api.postOrder(cartItem)
      dispatch({ type: POST_ORDER, payload: data })

   } catch (error) {
      console.warn(error.response);
   }
}

export const deleteOrder = (_id) => async (dispatch) => {
   try {
      await api.deleteOrder(_id);
      dispatch({ type: DELETE_ORDER, payload: _id });

   } catch (error) {
      console.warn(error.response)
   }
}

export const updateOrder = (_id, updatedOrder) => async (dispatch) => {
   try {
      const { data } = await api.updateOrder(_id, updatedOrder)
      dispatch({ type: UPDATE_ORDER, payload: data })

   } catch (error) {
      console.warn(error.response)
   }
}

// Data For ESP
// getEspData, postEspData, updateEspData, deleteEspData
// GET_ESP_DATA POST_ESP_DATA DELETE_ESP_DATA UPDATE_ESP_DATA

export const getEspData = () => async (dispatch) => {
   try {
      const { data } = await api.getEspData();

      dispatch({ type: GET_ESP_DATA, payload: data });
   } catch (error) {
      console.warn(error.response)
   }
}

export const postEspData = (newData) => async (dispatch) => {
   try {
      const { data } = await api.postEspData(newData)
      dispatch({ type: POST_ESP_DATA, payload: data })

   } catch (error) {
      console.warn(error.response);
   }
}

export const deleteEspData = (_id) => async (dispatch) => {
   try {
      await api.deleteEspData(_id);
      dispatch({ type: DELETE_ESP_DATA, payload: _id });

   } catch (error) {
      console.warn(error.response)
   }
}

export const updateEspData = (_id, updatedData) => async (dispatch) => {
   try {
      const { data } = await api.updateEspData(_id, updatedData)
      dispatch({ type: UPDATE_ESP_DATA, payload: data })

   } catch (error) {
      console.warn(error.response)
   }
}
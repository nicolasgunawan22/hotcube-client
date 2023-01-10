import { GET_ORDERS, POST_ORDER, DELETE_ORDER, UPDATE_ORDER } from '../constants/actionTypes'

const orderReducer = (state = [], action) => {
   switch (action.type) {
      case GET_ORDERS:
         return action.payload
      case POST_ORDER:
         return [...state, action.payload];
      case DELETE_ORDER:
         return state.filter((item) => item._id !== action.payload)
      case UPDATE_ORDER:
         return state.map((item) => item._id === action.payload._id ? action.payload : item);
      default:
         return state;
   }
}

export default orderReducer;
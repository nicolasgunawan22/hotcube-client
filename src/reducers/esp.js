import { GET_ESP_DATA, POST_ESP_DATA, DELETE_ESP_DATA, UPDATE_ESP_DATA } from '../constants/actionTypes'

const orderReducer = (state = [], action) => {
   switch (action.type) {
      case GET_ESP_DATA:
         return action.payload
      case POST_ESP_DATA:
         return [...state, action.payload];
      case DELETE_ESP_DATA:
         return state.filter((item) => item._id !== action.payload)
      case UPDATE_ESP_DATA:
         return state.map((item) => item._id === action.payload._id ? action.payload : item);
      default:
         return state;
   }
}

export default orderReducer;
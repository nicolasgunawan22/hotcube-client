import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes'

const cartReducer = (cart = [], action) => {
   switch (action.type) {
      case DELETE:
         return cart.filter((cartItem) => cartItem._id !== action.payload)
      case UPDATE:
         return cart.map((cartItem) => cartItem.itemId === action.payload.itemId ? action.payload: cartItem);
      case FETCH_ALL:
      case CREATE:
         return action.payload;   
         // return [...cart, action.payload];
      default:
         return cart;
   }
}
export default cartReducer;
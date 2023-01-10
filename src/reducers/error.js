import { USER_ERROR, CART_ERROR } from '../constants/actionTypes'

const error = (state = "", action) => {
   switch (action.type) {
      case USER_ERROR:
      case CART_ERROR:
         return action.payload;
      default:
         return state;
   }
}

export default error;
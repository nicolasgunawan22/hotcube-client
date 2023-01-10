import { GET_USER, UPDATE_USER } from '../constants/actionTypes'

const users = (state = [], action) => {
   switch (action.type) {
      case GET_USER:
         return action.payload;
      case UPDATE_USER:
         return state.map((user) => user._id === action.payload._id ? action.payload : user);
      default:
         return state;
   }
}

export default users;
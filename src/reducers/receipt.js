import { ORDERING } from '../constants/actionTypes'

const receiptReducer = (state = [], action) => {
   switch (action.type) {
      case ORDERING:
         return action.payload
      default:
         return state;
   }
}

export default receiptReducer;
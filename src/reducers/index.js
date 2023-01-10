import { combineReducers } from 'redux'

import cart from './cart'
import auth from './auth'
import users from './users'
import errorMessage from './error'
import order from './order'
import orderForReceipt from './receipt'
import espData from './esp'

export default combineReducers({ cart, auth, users, errorMessage, order, orderForReceipt, espData });
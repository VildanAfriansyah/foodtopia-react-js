import {combineReducers} from 'redux'

import item from './Item'
import restaurant from './Restaurant'
import category from './Category'
import comment from './Comment'
import user from './User'
// import items from './items'

const appReducer = combineReducers({
  item,
  restaurant,
  category,
  comment,
  user,
  // items
})

export default appReducer

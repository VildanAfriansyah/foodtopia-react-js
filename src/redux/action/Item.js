import axios from 'axios'
// import qs from 'qs'

import {APP_URL} from '../../source/config'


const url = APP_URL.concat('item/')


export const getItems = (search = '')=>{
  return {
    type: 'GET_ITEMS',
    payload: axios.get(url.concat(`?search[item_name]=${search}`))
  }
}

export const getItemsByPrice = (id)=>{
  return {
    type: 'GET_ITEMS',
    payload: axios.get(url.concat(`sort?sort=price`))
  }
}

export const getNextItems = (url1)=>{
  return {
    type: 'GET_NEXT_ITEMS',
    payload: axios.get(url1)
  }
}

export const getItemById = (id)=>{
  return {
    type: 'GET_ITEM_BY_ID',
    payload: axios.get(url.concat(`${id}`))
  }
}
// export const getItem = (id)=>{
//   return {
//     type: 'GET_ITEM',
//     payload: axios.get(url.concat(`/${id}`))
//   }
// }

// export const postEmployee=(data)=>{
//   return {
//     type: 'POST_ITEM',
//     payload: axios.post(url,qs.stringify(data))
//   }
// }
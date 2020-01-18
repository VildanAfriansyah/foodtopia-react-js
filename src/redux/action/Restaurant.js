import axios from 'axios'

import {APP_URL} from '../../source/config'


const url = APP_URL.concat('restaurant')


export const getRestaurant = ()=>{
  return {
    type: 'GET_RESTAURANT',
    payload: axios.get(url.concat(`/show`))
  }
}


export const getRestaurantById = (id)=>{
  return {
    type: 'GET_MENU_RESTAURANT',
    payload: axios.get(url.concat(`/item/${id}`))
  }
}
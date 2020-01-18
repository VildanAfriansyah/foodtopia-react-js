import axios from 'axios'

import {APP_URL} from '../../source/config'


const url = APP_URL.concat('category')


export const getCategory = ()=>{
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(url.concat(`/show`))
  }
}


export const getCategoryById = (id)=>{
  return {
    type: 'GET_MENU_CATEGORY',
    payload: axios.get(url.concat(`/item/${id}`))
  }
}
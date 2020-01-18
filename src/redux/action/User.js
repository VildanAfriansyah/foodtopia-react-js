import axios from 'axios'
import qs from 'qs'

import {APP_URL} from '../../source/config'


const url = APP_URL.concat('user')


export const postUser = (nameuser,username,password,roles)=>{
  return {
    type: 'POST_USER',
    payload: axios.post(url.concat(`/`),qs.stringify(nameuser,username,password,roles))
  }
}

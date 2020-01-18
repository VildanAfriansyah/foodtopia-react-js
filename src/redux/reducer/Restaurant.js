const initialState = {
    count:0,
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const restaurant = (state=initialState, action)=>{
    switch(action.type){
      case 'GET_RESTAURANT_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_RESTAURANT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_RESTAURANT_FULFILLED':
        return {
          count: action.payload.data.data.length,
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        case 'GET_MENU_RESTAURANT_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_MENU_RESTAURANT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_MENU_RESTAURANT_FULFILLED':
        return {
          count: action.payload.data.data.length,
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
  }
  
  export default restaurant
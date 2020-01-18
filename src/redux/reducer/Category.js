const initialState = {
    count:0,
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const category = (state=initialState, action)=>{
    switch(action.type){
      case 'GET_CATEGORY_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_CATEGORY_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_CATEGORY_FULFILLED':
        return {
          count: action.payload.data.data.length,
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        case 'GET_MENU_CATEGORY_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_MENU_CATEGORY_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_MENU_CATEGORY_FULFILLED':
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
  
  export default category
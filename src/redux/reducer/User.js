const initialState = {
    count:0,
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const user = (state=initialState, action)=>{
    switch(action.type){
      case 'POST_USER_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'POST_USER_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'POST_USER_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
  }
  
  export default user
const initialState = {
    count:0,
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }
  
  const item = (state=initialState, action)=>{
    switch(action.type){
      // case 'POST_ITEM_PENDING':
      //   return {
      //     ...state,
      //     isLoading: true,
      //     isSuccess: false,
      //     isError: false
      //   }
      // case 'POST_ITEM_REJECTED':
      //   return {
      //     ...state,
      //     isLoading: false,
      //     isSuccess: false,
      //     isError: true
      //   }
      // case 'POST_ITEM_FULFILLED':
      //   return {
      //     ...state,
      //     isLoading: false,
      //     isSuccess: true,
      //     isError: false
      //   }
      case 'GET_ITEMS_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_ITEMS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_ITEMS_FULFILLED':
        return {
          count: action.payload.data.data.length,
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        case 'GET_NEXT_ITEMS_PENDING':
          return {
            ...state,
            isLoading: true,
            isError: false,
          }
        case 'GET_NEXT_ITEMS_REJECTED':
          return {
            ...state,
            isLoading: false,
            isError: true
          }
        case 'GET_NEXT_ITEMS_FULFILLED':
          return {
            count: action.payload.data.data.length,
            data: action.payload.data,
            isLoading: false,
            isError: false
          }
          case 'GET_ITEMSBY_ID_PENDING':
          return {
            ...state,
            isLoading: true,
            isError: false,
          }
        case 'GET_ITEM_BY_ID_REJECTED':
          return {
            ...state,
            isLoading: false,
            isError: true
          }
        case 'GET_ITEM_BY_ID_FULFILLED':
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
  
  export default item
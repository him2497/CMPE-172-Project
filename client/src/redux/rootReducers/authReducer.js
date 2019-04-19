const initialState = {
    email: null,
    authorizing: false, 
    authorized: false,
    error: null,
    cancel: false,
    token: null
  }
  
  export default function reducer(state = initialState, action) {
    const { type } = action;
    switch(type){
      case 'USER_START_AUTHORIZING':
        return { ...state, authorizing: true }
      case 'USER_AUTHORIZED':
        return { ...state, authorizing: false, email: action.email, token: action.token, authorized: action.authorized}
      case 'LOG_OUT_USER':
        state = initialState
        return state
      case 'USER_NOT_AUTHORIZED':
        return { ...state, error: action.error }
      case 'USER_CANCELLED':
        return { ...state, cancel: true }
      default:
        return state
    }
  }
import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from './actionTypes';

const initialState = {
  isLoading: false,
  email: '',
  password: '',
  error: '',
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;

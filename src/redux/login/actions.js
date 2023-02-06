import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from './actionTypes';

export const fetchLogin = () => {
  return {
    type: FETCH_LOGIN_REQUEST
  };
};

export const fetchLoginSuccess = (user) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: user
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error
  };
};

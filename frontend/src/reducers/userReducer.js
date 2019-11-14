import { ASSIGN_LOGIN, ASSIGN_LOGOUT } from '../actions/ActionsList';

const INITIAL_STATE = {
  isLogin: false
};
const login = (state, action) => {
  return {
    ...state,
    isLogin: true
  };
};

const logout = (state, action) => {
  return {
    ...state,
    isLogin: false
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASSIGN_LOGIN:
      return login(state, action);
    case ASSIGN_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

import {
  OPEN_ALERT,
  CLOSE_ALERT,
  TOGGLE_DARK_MODE,
  TOGGLE_NAV_SIDE,
  OPEN_CONFIRM_LOGOUT,
  CLOSE_CONFIRM_LOGOUT
} from './ActionsList';
import { history } from '../system/history';

export const openAlert = message => {
  return (dispatch, getState) => {
    dispatch({ type: OPEN_ALERT, message });
  };
};
export const closeAlert = message => {
  return (dispatch, getState) => {
    dispatch({ type: CLOSE_ALERT });
  };
};

export const goToPostSummaryPage = postID => {
  history.push(`postResult=${postID}`);
  history.go();
};

export const toggleDarkMode = () => {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_DARK_MODE });
  };
};

export const toggleNavSide = () => {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_NAV_SIDE });
  };
};

export const openConfirmLogout = () => {
  return (dispatch: Function) => {
    dispatch({ type: OPEN_CONFIRM_LOGOUT });
  };
};

export const closeConfirmLogout = () => {
  return (dispatch: Function) => {
    dispatch({ type: CLOSE_CONFIRM_LOGOUT });
  };
};

import {
  OPEN_ALERT,
  CLOSE_ALERT,
  CLOSE_SPINNER,
  OPEN_SPINNER,
  CLOSE_CONFIRM_SAVE_MODAL,
  OPEN_CONFIRM_SAVE_MODAL,
  TOGGLE_DARK_MODE,
  TOGGLE_NAV_SIDE,
  OPEN_CONFIRM_LOGOUT,
  CLOSE_CONFIRM_LOGOUT
} from '../actions/ActionsList';
const INITIAL_STATE = {
  isAlertVisible: false,
  isNavSideExpand: false,
  isDarkModeEnable: false,
  isSpinnerVisible: false,
  isConfirmModalVisible: false,
  isConfirmLogoutVisible: false,
  alertData: {},
  dataToSave: {}
};

const openAlertModal = (state, action) => {
  return {
    ...state,
    isAlertVisible: true,
    alertData: action.message
  };
};
const closeAlertModal = state => {
  return {
    ...state,
    isAlertVisible: false,
    alertData: {}
  };
};

const openSpinner = state => {
  return {
    ...state,
    isSpinnerVisible: true
  };
};
const closeSpinner = state => {
  return {
    ...state,
    isSpinnerVisible: false
  };
};

const toggleDarkMode = state => {
  return {
    ...state,
    isDarkModeEnable: !state.isDarkModeEnable
  };
};

const toggleNavSide = state => {
  return {
    ...state,
    isNavSideExpand: !state.isNavSideExpand
  };
};

const openConfirmSaveModal = (state, action) => {
  return {
    ...state,
    isConfirmModalVisible: true,
    dataToSave: action.data
  };
};
const closeConfirmSaveModal = state => {
  return {
    ...state,
    isConfirmModalVisible: false,
    dataToSave: {}
  };
};

const openConfirmLogout = state => {
  return {
    ...state,
    isConfirmLogoutVisible: true
  };
};

const closeConfirmLogout = state => {
  return {
    ...state,
    isConfirmLogoutVisible: false
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_ALERT:
      return openAlertModal(state, action);
    case CLOSE_ALERT:
      return closeAlertModal(state);
    case OPEN_SPINNER:
      return openSpinner(state, action);
    case CLOSE_SPINNER:
      return closeSpinner(state);
    case OPEN_CONFIRM_SAVE_MODAL:
      return openConfirmSaveModal(state, action);
    case CLOSE_CONFIRM_SAVE_MODAL:
      return closeConfirmSaveModal(state);
    case TOGGLE_DARK_MODE:
      return toggleDarkMode(state);
    case TOGGLE_NAV_SIDE:
      return toggleNavSide(state);
    case OPEN_CONFIRM_LOGOUT:
      return openConfirmLogout(state);
    case CLOSE_CONFIRM_LOGOUT:
      return closeConfirmLogout(state);
    default:
      return state;
  }
};

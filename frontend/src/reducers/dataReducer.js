import { LOAD_SAVED_DATA } from '../actions/ActionsList';

const INITIAL_STATE = {
  data: {}
};

const saveData = (state, action) => {
  return {
    ...state,
    data: action.data
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SAVED_DATA:
      return saveData(state, action);
    default:
      return state;
  }
};

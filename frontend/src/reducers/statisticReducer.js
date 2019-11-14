import {
  LOAD_STATISTIC_DATA,
  LOAD_STATISTIC_IMAGE
} from '../actions/ActionsList';
const INITIAL_STATE = {
  statistic: [],
  comment: {},
  post: {},
  imageURL: []
};

const saveStatisticData = (state, { post, comment }) => {
  return {
    ...state,
    post: post,
    comment: comment
  };
};

const saveStatisticImage = (state, action) => {
  return {
    ...state,
    imageURL: [action.imageURL]
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_STATISTIC_DATA:
      return saveStatisticData(state, action);
    case LOAD_STATISTIC_IMAGE:
      return saveStatisticImage(state, action);
    default:
      return state;
  }
};

import {
  LOAD_RETRIEVED_POST_DATA,
  LOAD_POST_SUMMARY_DATA
} from '../actions/ActionsList';
const INITIAL_STATE = {
  posts: [],
  summary: {}
};

const saveRetrievedPostData = (state, action) => {
  return {
    ...state,
    posts: action.posts
  };
};

const savePostSummaryData = (state, action) => {
  return {
    ...state,
    summary: action.summary
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_RETRIEVED_POST_DATA:
      return saveRetrievedPostData(state, action);
    case LOAD_POST_SUMMARY_DATA:
      return savePostSummaryData(state, action);
    default:
      return state;
  }
};

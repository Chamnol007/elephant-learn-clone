import {
  LOAD_MODEL_COMMENT,
  LOAD_MODEL_COMMENT_SINGLE
} from '../actions/ActionsList';
const INITIAL_STATE = {
  comment: []
};

const saveModelComment = (state, action) => {
  return {
    ...state,
    comment: action.comment
  };
};
const saveModelCommentSingle = (state, action) => {
  return {
    ...state,
    comment: {
      ...state.comment,
      [action.comment.id]: action.comment
    }
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MODEL_COMMENT:
      return saveModelComment(state, action);
    case LOAD_MODEL_COMMENT_SINGLE:
      return saveModelCommentSingle(state, action);
    default:
      return state;
  }
};

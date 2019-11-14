import {
  LOAD_RETRIEVED_COMMENT_DATA,
  LOAD_PENDING_COMMENT_DATA,
  DELETE_COMMENT,
  SAVE_COMMENT_RESULT
} from '../actions/ActionsList';
import { getPendingComment } from '../selectors';
import _ from 'lodash';

const INITIAL_STATE = {
  currentPostID: '',
  comment: {},
  pendingComment: {},
  postDetail: ''
};

const saveRetrievedCommentData = (state, action) => {
  return {
    ...state,
    currentPostID: action.postID,
    postDetail: action.postDetail,
    comment: {
      ...state.comment,
      [action.postID]: action.comments
    }
  };
};

const deleteComment = (state, action) => {
  const { pendingComment, comment } = state;
  const { commentId, postId } = action;
  const postComment = _.get(pendingComment, [postId]);
  const commentList = _.get(comment, [postId]);
  return {
    ...state,
    comment: {
      ...comment,
      [postId]: _.omit(commentList, commentId)
    },
    pendingComment: {
      ...pendingComment,
      [postId]: _.omit(postComment, commentId)
    }
  };
};

const savePendingCommentData = (state, action) => {
  const { pendingComment, comment, currentPostID } = state;
  const commentsList = getPendingComment(
    action.comments,
    comment[currentPostID]
  );
  return {
    ...state,
    pendingComment: {
      ...pendingComment,
      [currentPostID]: _.omitBy(commentsList, _.isEmpty)
    }
  };
};

const saveCommentResult = (state, action) => {
  const { comment, currentPostID, pendingComment } = state;
  let newPendingCommentWithResult = {};
  let newCommentResult = {};
  try {
    newPendingCommentWithResult = _.cloneDeep(pendingComment[currentPostID]);
    newCommentResult = _.cloneDeep(comment[currentPostID]);
  } catch (error) {
    console.warn(error);
  }
  if (_.isEqual(action.comment.status, 'pending')) {
    newPendingCommentWithResult = {
      ...pendingComment[currentPostID],
      [action.comment.id]: {
        ...action.comment
      }
    };
  } else if (_.isEqual(action.comment.status, 'old')) {
    newCommentResult = _.merge(newCommentResult, {
      [action.comment.id]: { ...action.comment }
    });
  }

  return {
    ...state,
    comment: {
      ...comment,
      [currentPostID]: {
        ...newCommentResult
      }
    },
    pendingComment: {
      ...pendingComment,
      [currentPostID]: newPendingCommentWithResult
    }
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_RETRIEVED_COMMENT_DATA:
      return saveRetrievedCommentData(state, action);
    case LOAD_PENDING_COMMENT_DATA:
      return savePendingCommentData(state, action);
    case DELETE_COMMENT:
      return deleteComment(state, action);
    case SAVE_COMMENT_RESULT:
      return saveCommentResult(state, action);
    default:
      return state;
  }
};

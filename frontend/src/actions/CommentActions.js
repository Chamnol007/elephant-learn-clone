import { DELETE_COMMENT } from './ActionsList';

export const deleteCommentFromLocal = (postId, commentId) => {
  return dispatch => {
    dispatch({ type: DELETE_COMMENT, postId, commentId });
  };
};

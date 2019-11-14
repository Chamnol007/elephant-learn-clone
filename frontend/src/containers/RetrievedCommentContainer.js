import { connect } from 'react-redux';
import RetrievedComment from '../components/main-components/RetrievedComment';
import {
  downloadRetrievedComments,
  loadPendingCommentFromPost,
  preprocessingComment,
  loadPostSummary,
  openConfirmSaveModal,
  deleteComment,
  getCommentArrayResult
} from '../actions';
import _ from 'lodash';
import { mapCommentsList } from '../selectors';

const mapStateToProps = (state: Object) => {
  const { comment, currentPostID, pendingComment, postDetail } = state.comment;
  const {
    isSpinnerVisible,
    isConfirmModalVisible,
    isNavSideExpand
  } = state.scene;
  const newComment = _.get(pendingComment, [currentPostID]);
  const oldComments = _.get(comment, [currentPostID]);
  const wordsCloud = _.values(_.get(state, ['post', 'summary'], {}));
  return {
    comments: mapCommentsList(newComment, oldComments),
    currentPostID,
    postDetail,
    isSpinnerVisible,
    isConfirmModalVisible,
    wordsCloud,
    isNavSideExpand
  };
};
export default connect(
  mapStateToProps,
  {
    downloadRetrievedComments,
    loadPendingCommentFromPost,
    preprocessingComment,
    loadPostSummary,
    openConfirmSaveModal,
    deleteComment,
    getCommentArrayResult
  }
)(RetrievedComment);

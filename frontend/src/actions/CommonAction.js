import {
  OPEN_SPINNER,
  CLOSE_SPINNER,
  LOAD_RETRIEVED_COMMENT_DATA,
  OPEN_CONFIRM_SAVE_MODAL,
  CLOSE_CONFIRM_SAVE_MODAL
} from './ActionsList';
import _ from 'lodash';
import { goToCommentPage } from './remoteDatabaseActions';

export const openSpinner = () => {
  return dispatch => {
    dispatch({ type: OPEN_SPINNER });
  };
};
export const closeSpinner = () => {
  return dispatch => {
    dispatch({ type: CLOSE_SPINNER });
  };
};

export const openConfirmSaveModal = data => {
  return dispatch => {
    dispatch({ type: OPEN_CONFIRM_SAVE_MODAL, data: data });
  };
};
export const closeConfirmSaveModal = () => {
  return dispatch => {
    dispatch({ type: CLOSE_CONFIRM_SAVE_MODAL });
  };
};

export const composeSavedPostData = data => {
  const dataMapping = {};
  _.filter(data, (val, key) => {
    _.forEach(val, (valYear, keyYear) => {
      _.forEach(valYear, (valMonth, keyMonth) => {
        _.forEach(valMonth, (valDay, keyDay) => {
          _.forEach(valDay, (valPost, keyPost) => {
            _.forEach(valPost, (valPostDate, keyPostDate) => {
              const id = keyPost + '-' + valPostDate.date;
              _.merge(dataMapping, {
                [id]: {
                  id: id,
                  time: valPostDate.date,
                  day: keyDay,
                  month: keyMonth,
                  year: keyYear,
                  postId: keyPost,
                  comments: valPostDate.comments,
                  postDetail: valPostDate.postDetail
                }
              });
            });
          });
        });
      });
    });
  });
  return dataMapping;
};

export const loadDataAndGoToCommentPage = (postID, postDetail, comments) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_RETRIEVED_COMMENT_DATA,
      postID: postID,
      postDetail: postDetail,
      comments: comments
    });
    goToCommentPage(postID);
  };
};

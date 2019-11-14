import firebase from '../utils/firebase/firebase';
import {
  POST_REF,
  COMMENT_REF,
  STATISTIC_REF,
  MODEL_COMMENT_REF
} from '../constants/remoteDatabaseContants';
import {
  LOAD_RETRIEVED_POST_DATA,
  LOAD_RETRIEVED_COMMENT_DATA,
  LOAD_STATISTIC_DATA,
  LOAD_STATISTIC_IMAGE,
  LOAD_MODEL_COMMENT,
  LOAD_MODEL_COMMENT_SINGLE
} from './ActionsList';
import _ from 'lodash';
import { history } from '../system/history';
import { openAlert } from './SceneActions';
import { getStatisticResult } from './StatisticActions';

export const downloadRetrievedPosts = () => {
  return async (dispatch, getState) => {
    try {
      await firebase
        .database()
        .ref(POST_REF)
        .once('value', snapshot => {
          if (_.isEmpty(snapshot.val())) {
            alert('No Post Data!!!');
            return;
          }
          dispatch({
            type: LOAD_RETRIEVED_POST_DATA,
            posts: snapshot.val()
          });
          history.push('retrievedPost');
          history.go();
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const downloadRetrievedComments = postID => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const postDetail = _.get(state, ['post', 'posts', postID]);
      await firebase
        .database()
        .ref(COMMENT_REF)
        .child(postID)
        .once('value', snapshot => {
          if (_.isEmpty(snapshot.val())) {
            dispatch(
              openAlert({
                type: 'danger',
                header: 'No data',
                content: 'no comment data found for this post: ' + postID
              })
            );
            return;
          }
          dispatch({
            type: LOAD_RETRIEVED_COMMENT_DATA,
            postID: postID,
            postDetail: postDetail,
            comments: snapshot.val()
          });
          goToCommentPage(postID);
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const goToCommentPage = postID => {
  history.push(`/comment=${postID}`);
  history.go();
};

export const downloadStatistic = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getStatisticResult(['07/22/2019']));
      await dispatch(getStatisticImage('html/statistic/statistic.html'));
    } catch (error) {
      console.warn(error);
    }
  };
};

export const getStatisticImage = remotePath => {
  return async dispatch => {
    try {
      await firebase
        .storage()
        .ref(remotePath)
        .getDownloadURL()
        .then(url => {
          if (!url) {
            return;
          }
          dispatch({ type: LOAD_STATISTIC_IMAGE, imageURL: url });
          history.push('statistic');
          history.go();
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const downloadComments = () => {
  return async (dispatch, getState) => {
    try {
      await firebase
        .database()
        .ref(MODEL_COMMENT_REF)
        .once('value', snapshot => {
          if (_.isEmpty(snapshot.val())) {
            return;
          }
          dispatch({
            type: LOAD_MODEL_COMMENT,
            comment: snapshot.val()
          });
          history.push('model');
          history.go();
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const updateResutlComment = (commentID, value) => {
  return async (dispatch, getState) => {
    console.log(commentID, value);
    try {
      const commentRef = firebase
        .database()
        .ref(`${MODEL_COMMENT_REF}/${commentID}`);
      await commentRef.transaction(comment => {
        commentRef.child('result').set(value);
      });
      await commentRef.once('value', snapshot => {
        if (_.isEmpty(snapshot.val())) {
          return;
        }
        dispatch({
          type: LOAD_MODEL_COMMENT_SINGLE,
          comment: snapshot.val()
        });
      });
    } catch (error) {
      console.warn(error);
    }
  };
};

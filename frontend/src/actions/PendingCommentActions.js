import React from 'react';
import axios from 'axios';
import { REST_APIS } from '../utils/configurations/configurationAPIs';
import _ from 'lodash';
import { LOAD_PENDING_COMMENT_DATA } from './ActionsList';
import { openSpinner, closeSpinner } from './CommonAction';
import { openAlert } from './SceneActions';
import firebase from '../utils/firebase/firebase';
import { deleteCommentFromLocal } from './CommentActions';
import { Notification } from 'rsuite';

export const loadPendingCommentFromPost = postId => {
  return async (dispatch, getState) => {
    try {
      dispatch(openSpinner());
      const { pendingCommentRequestURL } = REST_APIS;
      await axios
        .get(`${pendingCommentRequestURL}${postId}`)
        .then(response => {
          if (_.isEmpty(response.data)) {
            if (_.isEmpty(response.data)) {
              dispatch(
                openAlert({
                  type: 'error',
                  header: 'No data',
                  content: 'No Comments Data!!!'
                })
              );
            }
            return;
          }
          dispatch({
            type: LOAD_PENDING_COMMENT_DATA,
            comments: response.data
          });
        })
        .catch(err => {
          console.warn(err);
          if (_.isEqual(err.message, 'Network Error')) {
            dispatch(
              openAlert({
                type: 'danger',
                header: 'Error',
                content: 'Can not connect to backend service!!!'
              })
            );
          }
        });
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(closeSpinner());
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch, getState) => {
    try {
      return firebase
        .database()
        .ref(`data/scraped/comment/${postId}/${commentId}`)
        .remove()
        .then(() => {
          console.warn('deleted comment', commentId);
          open('warning', `Deleted comment ${commentId}`);
          dispatch(deleteCommentFromLocal(postId, commentId));
        })
        .catch(err => {
          console.error(err);
          open('error', `Unable to delete comment ${commentId}`);
        });
    } catch (error) {
      console.warn(error);
      open('error', `Unable to delete comment ${commentId}`);
    }
  };
};

function open(funcName, message) {
  Notification[funcName]({
    title: _.upperFirst(funcName),
    description: (
      <div>
        <p>{message}</p>
      </div>
    )
  });
}

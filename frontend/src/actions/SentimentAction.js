import axios from 'axios';
import { REST_APIS } from '../utils/configurations/configurationAPIs';
import _ from 'lodash';
import { openAlert } from './SceneActions';
import { SAVE_COMMENT_RESULT } from './ActionsList';

export const preprocessingComment = (data: string) => {
  return async (dispatch, getState) => {
    try {
      const { preprocessingCommentURL } = REST_APIS;
      await axios
        .post(preprocessingCommentURL, {
          content: data
        })
        .then(response => {
          const message = _.isEmpty(response.data)
            ? {
                type: 'danger',
                header: 'No data',
                content: 'Error.......'
              }
            : {
                type: 'success',
                header: 'Comment',
                content: _.toString(data)
              };
          dispatch(openAlert(message));
        })
        .catch(err => {
          console.warn(err, preprocessingCommentURL);
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const getCommentResult = content => {
  return new Promise(async (resolve, reject) => {
    try {
      const { resultURL, predictURL } = REST_APIS;
      await axios
        .post(resultURL, {
          content: content
        })
        .then(async response => {
          try {
            await axios
              .post(predictURL, { data: [response.data] })
              .then(result => {
                resolve(result.data);
              })
              .catch(err => {
                console.warn(err);
              });
          } catch (error) {
            console.warn(error, predictURL);
          }
        })
        .catch(err => {
          console.warn(err, resultURL);
          reject(err);
        });
    } catch (error) {
      console.warn(error);
      reject(error);
    }
  });
};

export const getCommentResultLocal = content => {
  return new Promise(async (resolve, reject) => {
    try {
      const { predictLocalURL } = REST_APIS;
      await axios
        .post(predictLocalURL, {
          content: content
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          console.warn(err, predictLocalURL);
          reject(err);
        });
    } catch (error) {
      console.warn(error);
      reject(error);
    }
  });
};

export const getCommentArrayResult = comments => {
  return (dispatch, getState) => {
    try {
      _.forEach(comments, async comment => {
        if (comment.result || _.isEmpty(comment.content)) {
          if (_.isEmpty(comment.content)) {
            const resutlComment = _.merge(comment, {
              result: 0,
              playability: { negative: 0, neutral: 1, positive: 0 }
            });
            dispatch({ type: SAVE_COMMENT_RESULT, comment: resutlComment });
          }
          return;
        }
        await getCommentResultLocal(comment.content).then(data => {
          if (data) {
            const { result, playability } = data;
            const resutlComment = _.merge(comment, {
              result: result,
              playability: playability
            });
            dispatch({ type: SAVE_COMMENT_RESULT, comment: resutlComment });
          }
        });
      });
    } catch (error) {
      console.warn(error);
    }
  };
};

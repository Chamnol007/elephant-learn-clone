import firebase from '../utils/firebase/firebase';
import _ from 'lodash';
import moment from 'moment';
import { LOAD_SAVED_DATA } from './ActionsList';
import { history } from '../system/history';
import { openAlert } from './SceneActions';

export const loadSavedData = () => {
  return (dispatch, getState) => {
    try {
      return firebase
        .database()
        .ref('data/saved')
        .once('value', snapshot => {
          dispatch({ type: LOAD_SAVED_DATA, data: snapshot.val() });
          history.push('data');
          history.go();
        })
        .catch(err => {
          console.warn(err);
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const saveDataToDatabase = (data, dataType) => {
  return (dispatch, getState) => {
    try {
      const { comment } = getState();
      const postId = _.get(comment, ['currentPostID']);
      const date = moment();
      const currentDate = date.format('YYYY/MM/DD');
      const time = date.format('LTS');
      return firebase
        .database()
        .ref(`data/saved/${dataType}/${currentDate}/${postId}`)
        .update({
          [time]: {
            date: date.format('LTS'),
            comments: {
              ..._.keyBy(data, 'id')
            },
            postDetail: data.postDetail
          }
        })
        .then(() => {
          dispatch(
            openAlert({
              type: 'success',
              header: 'Saved Data',
              content: `Data of ${dataType} has been saved on ${currentDate} ${time}`
            })
          );
        })
        .catch(err => {
          console.warn(err);
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

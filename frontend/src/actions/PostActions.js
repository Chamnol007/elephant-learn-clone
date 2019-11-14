import axios from 'axios';
import { REST_APIS } from '../utils/configurations/configurationAPIs';
import { LOAD_POST_SUMMARY_DATA } from './ActionsList';
import _ from 'lodash';
import { openAlert } from './SceneActions';

export const loadPostSummary = (data: Object) => {
  return async (dispatch, getState) => {
    try {
      const { postSummaryURL } = REST_APIS;
      await axios
        .post(postSummaryURL, {
          ...data
        })
        .then(response => {
          if (_.isEmpty(response.data)) {
            dispatch(
              openAlert({
                type: 'danger',
                header: 'No data',
                content: 'No WordCloud!!!'
              })
            );
          }
          dispatch({ type: LOAD_POST_SUMMARY_DATA, summary: response.data });
        })
        .catch(err => {
          console.warn(err.message, postSummaryURL);
          if (_.isEqual(err.message, 'Network Error')) {
            dispatch(
              openAlert({
                type: 'danger',
                header: 'No data',
                content: 'Can not connect to backend service!!!'
              })
            );
          }
        });
    } catch (error) {
      console.warn(error.code);
    }
  };
};

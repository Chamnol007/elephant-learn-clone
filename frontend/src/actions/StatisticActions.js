import axios from 'axios';
import { REST_APIS } from '../utils/configurations/configurationAPIs';
import _ from 'lodash';
import { openAlert } from './SceneActions';
import { LOAD_STATISTIC_DATA } from './ActionsList';

export const getStatisticResult = (data: string) => {
  return async (dispatch, getState) => {
    try {
      const { statisticURL } = REST_APIS;
      await axios
        .post(statisticURL, {
          content: data
        })
        .then(response => {
          if (_.isEmpty(response.data)) {
            return;
          }
          const { comment, post } = response.data;
          dispatch({ type: LOAD_STATISTIC_DATA, post: post, comment: comment });
        })
        .catch(err => {
          console.warn(err, statisticURL);
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

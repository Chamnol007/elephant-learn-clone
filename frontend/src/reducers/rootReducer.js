import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import statisticReducer from './statisticReducer';
import modelReducer from './modelReducer';
import sceneReducer from './sceneReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  statistic: statisticReducer,
  model: modelReducer,
  scene: sceneReducer,
  data: dataReducer
});

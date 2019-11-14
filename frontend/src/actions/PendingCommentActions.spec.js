import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import firebase from '../utils/firebase/firebase';

import { deleteComment } from './PendingCommentActions';

const middlewares = [promiseMiddleware, thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../utils/firebase/firebase.js', () => {
  return {
    database: () => ({
      ref: () => ({
        remove: jest.fn(() => Promise.resolve())
      })
    })
  };
});
describe('delete actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    jest.resetModules();
  });
  it('delete actions and changing a delete status', () => {
    const data = {
      postId: '1234556',
      commentId: '189_test_comment'
    };
    store.dispatch(deleteComment(data.postId, data.commentId)).then(() => {
      expect(firebase.database().ref().remove).toHaveBeenCalled();
      expect(store.getActions()).toEqual({
        type: 'DELETE_COMMENT',
        postId: data.postId,
        commentId: data.commentId
      });
    });
  });
});

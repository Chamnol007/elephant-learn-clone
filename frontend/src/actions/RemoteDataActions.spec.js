import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import firebase from '../utils/firebase/firebase';

import { loadSavedData, saveDataToDatabase } from './RemoteDataActions';

const middlewares = [promiseMiddleware, thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../utils/firebase/firebase.js', () => {
  return {
    database: () => ({
      ref: () => ({
        update: jest.fn(() => Promise.resolve()),
        once: jest.fn(() => Promise.resolve())
      })
    })
  };
});
describe('load save data should call firebase', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    jest.resetModules();
  });
  it('load save data and dispatch', () => {
    store.dispatch(loadSavedData()).then(() => {
      expect(firebase.database().ref().once).toHaveBeenCalled();
      expect(store.getActions()).toEqual({
        type: 'LOAD_SAVED_DATA'
      });
    });
  });

  it('save data should call firebase', () => {
    store.dispatch(saveDataToDatabase({}, 'mock_test')).then(() => {
      expect(firebase.database().ref().update).toHaveBeenCalled();
    });
  });
});

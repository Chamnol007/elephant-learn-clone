import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import firebase from '../utils/firebase/firebase';

import { login, logout } from './AccountActions';

const middlewares = [promiseMiddleware, thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../utils/firebase/firebase.js', () => {
  return {
    auth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
      signOut: jest.fn(() => Promise.resolve())
    }))
  };
});
describe('login actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    jest.resetModules();
  });
  it('login actions and changing a login status', () => {
    const user = {
      email: 'test.test@test.com',
      password: 'test'
    };
    store.dispatch(login(user.email, user.password)).then(() => {
      expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
      expect(store.getActions()).toEqual({
        type: 'ASSIGN_LOGIN'
      });
    });
  });

  it('signOut should call firebase', () => {
    store.dispatch(logout()).then(() => {
      expect(firebase.auth().signOut).toHaveBeenCalled();
      expect(store.getActions()).toEqual({
        type: 'ASSIGN_LOGOUT'
      });
    });
  });
});

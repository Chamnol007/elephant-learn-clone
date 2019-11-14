import firebase from '../utils/firebase/firebase';
import { history } from '../system//history';
import { ASSIGN_LOGIN, ASSIGN_LOGOUT } from './ActionsList';

export const login = (email, password) => {
  return (dispatch, getState) => {
    try {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          console.log('login success', data);
          dispatch({ type: ASSIGN_LOGIN });
          history.push('/home');
          history.go();
        })
        .catch(err => {
          console.warn(err);
          return err;
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    try {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch({ type: ASSIGN_LOGOUT });
        })
        .catch(err => {
          console.warn(err);
          return err;
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

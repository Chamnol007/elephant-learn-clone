import { connect } from 'react-redux';
import Global from '../components/global-components/Global';
import {
  closeAlert,
  closeConfirmSaveModal,
  saveDataToDatabase,
  logout,
  closeConfirmLogout
} from '../actions';

const mapStateToProps = (state: Object) => {
  return {
    ...state.scene
  };
};
export default connect(
  mapStateToProps,
  {
    closeAlert,
    closeConfirmSaveModal,
    saveDataToDatabase,
    closeConfirmLogout,
    logout
  }
)(Global);

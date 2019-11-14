import { connect } from 'react-redux';
import Login from '../components/main-components/Login';
import { login } from '../actions/AccountActions';

export default connect(
  null,
  { login }
)(Login);

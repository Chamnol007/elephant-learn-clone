import { connect } from 'react-redux';
import Header from '../components/sub-components/Header';
import { toggleDarkMode, toggleNavSide } from '../actions';

const mapStateToProps = (state: Object) => {
  return {
    isLogin: state.user.isLogin
  };
};

export default connect(
  mapStateToProps,
  {
    toggleDarkMode,
    toggleNavSide
  }
)(Header);

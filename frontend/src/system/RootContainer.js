import { connect } from 'react-redux';
import Root from './Root';

const mapStateToProps = state => ({
  ...state,
  postID: state.comment.currentPostID,
  isLogin: state.user.isLogin
});

export default connect(
  mapStateToProps,
  null
)(Root);

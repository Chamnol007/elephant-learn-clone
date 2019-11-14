import { connect } from 'react-redux';
import Home from '../components/main-components/Home';
import {
  downloadRetrievedPosts,
  downloadComments
} from '../actions/remoteDatabaseActions';

const mapStateToProps = (state: Object) => {
  const { isNavSideExpand } = state.scene;
  return {
    isNavSideExpand
  };
};

export default connect(
  mapStateToProps,
  { downloadRetrievedPosts, downloadComments }
)(Home);

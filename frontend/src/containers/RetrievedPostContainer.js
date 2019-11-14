import { connect } from 'react-redux';
import RetrievedPost from '../components/main-components/RetrievedPost';
import { downloadRetrievedComments } from '../actions/remoteDatabaseActions';
import _ from 'lodash';

const mapStateToProps = (state: Object) => {
  const { isNavSideExpand } = state.scene;

  const postsData = _.values(_.get(state, ['post', 'posts']));
  return {
    posts: postsData,
    isNavSideExpand
  };
};

export default connect(
  mapStateToProps,
  { downloadRetrievedComments }
)(RetrievedPost);

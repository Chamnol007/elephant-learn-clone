import { connect } from 'react-redux';
import DataList from '../components/main-components/DataList';
import { composeSavedPostData, loadDataAndGoToCommentPage } from '../actions';
import _ from 'lodash';

const mapStateToProps = (state: Object) => {
  const data = _.get(state, ['data', 'data']);
  const { isNavSideExpand } = state.scene;
  return {
    data: composeSavedPostData(data),
    isNavSideExpand
  };
};
export default connect(
  mapStateToProps,
  { loadDataAndGoToCommentPage }
)(DataList);

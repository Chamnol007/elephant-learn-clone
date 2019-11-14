import { connect } from 'react-redux';
import Result from '../components/main-components/Result';
import { updateResutlComment } from '../actions/remoteDatabaseActions';
import _ from 'lodash';

const mapStateToProps = (state: Object) => {
  const { comment } = state.model;
  const { isNavSideExpand } = state.scene;
  return {
    comment: _.values(comment),
    isNavSideExpand
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateResutlComment: (comentID: String, value: Number) => {
      dispatch(updateResutlComment(comentID, value));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);

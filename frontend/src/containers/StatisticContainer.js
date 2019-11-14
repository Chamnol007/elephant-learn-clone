import { connect } from 'react-redux';
import Statistic from '../components/main-components/Statistic';
import { getStatisticResult } from '../actions/StatisticActions';

const mapStateToProps = (state: Object) => {
  const { isNavSideExpand } = state.scene;
  const { statistic } = state;
  return {
    statistic,
    url: state.statistic.imageURL,
    isNavSideExpand
  };
};
export default connect(
  mapStateToProps,
  { getStatisticResult }
)(Statistic);

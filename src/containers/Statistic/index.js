import { connect } from 'react-redux'

import Statistic from './Statistic'

// import {
//   setCostWeightArray,
//   setKnapsackWeight,
//   toggleAddingModal,
// } from '../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  statisticResults: state.inputBlock.statisticResults,
})

export default connect(mapStateToProps, null)(Statistic)

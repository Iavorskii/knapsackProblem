import { connect } from 'react-redux'

import Statistic from './Statistic'

// import {
//   setCostWeightArray,
//   setKnapsackWeight,
//   toggleRandomFillingModal,
// } from '../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  dynamicProgramResult: state.inputBlock.dynamicProgramResult,
})

export default connect(mapStateToProps, null)(Statistic)

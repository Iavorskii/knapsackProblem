import { connect } from 'react-redux'

import { changeStatistic } from '../../../reducers/InputBlock/InputBLockReducer'

import ChooseDecision from './ChooseDecision'

const mapStateToProps = state => ({
  knapsackWeight: state.inputBlock.knapsackWeight,
  dataSource: state.inputBlock.dataSource,
  currentDecisionMethod: state.inputBlock.currentDecisionMethod,
})

const mapDispatchToProps = {
  changeStatistic,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDecision)

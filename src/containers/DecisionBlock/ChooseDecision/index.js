import { connect } from 'react-redux'

import {
  changeStatistic,
  setNeedDecide,
  setCurrentDecisionMethod,
} from '../../../reducers/InputBlock/InputBLockReducer'

import ChooseDecision from './ChooseDecision'

const mapStateToProps = state => ({
  knapsackWeight: state.inputBlock.knapsackWeight,
  dataSource: state.inputBlock.dataSource,
  currentDecisionMethod: state.inputBlock.currentDecisionMethod,
  isNeedToDecide: state.inputBlock.isNeedToDecide,
  geneticAlgorithmParams: state.inputBlock.geneticAlgorithmParams,
})

const mapDispatchToProps = {
  changeStatistic,
  setNeedDecide,
  setCurrentDecisionMethod,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDecision)

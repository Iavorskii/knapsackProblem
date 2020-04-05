import { connect } from 'react-redux'

import { setDecisionResult } from '../../../reducers/InputBlock/InputBLockReducer'

import ChooseDecision from './ChooseDecision'

const mapStateToProps = state => ({
  ...state.inputBlock,
  // knapsackWeight: state.inputBlock.knapsackWeight,
})

const mapDispatchToProps = {
  setDecisionResult,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDecision)

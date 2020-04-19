import { connect } from 'react-redux'

import MainMenu from './MainMenu'

import {
  setCurrentDecisionMethod,
  setNeedDecide,
} from '../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  currentDecisionMethod: state.inputBlock.currentDecisionMethod,
})

const mapDispatchToProps = {
  setCurrentDecisionMethod,
  setNeedDecide,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)

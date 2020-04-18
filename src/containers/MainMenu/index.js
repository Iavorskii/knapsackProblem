import { connect } from 'react-redux'

import MainMenu from './MainMenu'

import { setCurrentDecisionMethod } from '../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  currentDecisionMethod: state.inputBlock.currentDecisionMethod,
})

const mapDispatchToProps = {
  setCurrentDecisionMethod,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)

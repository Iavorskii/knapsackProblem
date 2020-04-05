import { connect } from 'react-redux'

import {
  toggleRandomFillingModal,
  setRandomParams,
  setCostWeightArray,
} from '../../../reducers/InputBlock/InputBLockReducer'

import RandomFillingModal from './RandomFillingModal'

const mapStateToProps = state => ({
  ...state.inputBlock,
})

const mapDispatchToProps = {
  toggleRandomFillingModal,
  setRandomParams,
  setCostWeightArray,
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomFillingModal)

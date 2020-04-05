import { connect } from 'react-redux'

import InputBlock from './InputBlock'

import {
  setCostWeightArray,
  setKnapsackWeight,
  toggleRandomFillingModal,
} from '../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  ...state.inputBlock,
})

const mapDispatchToProps = {
  setCostWeightArray,
  setKnapsackWeight,
  toggleRandomFillingModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBlock)

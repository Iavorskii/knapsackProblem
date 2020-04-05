import { connect } from 'react-redux'

import InputBlock from './InputBlock'

import {
  setCostWeightArray,
  setKnapsackWeight,
  setNumberOfItems,
  toggleRandomFillingModal,
} from '../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  ...state.inputBlock,
})

const mapDispatchToProps = {
  setCostWeightArray,
  setKnapsackWeight,
  setNumberOfItems,
  toggleRandomFillingModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBlock)

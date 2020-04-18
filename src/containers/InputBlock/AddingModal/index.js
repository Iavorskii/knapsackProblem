import { connect } from 'react-redux'

import {
  toggleAddingModal,
  setRandomParams,
  setCostWeightArray,
  setNumberOfItems,
  setKnapsackWeight,
} from '../../../reducers/InputBlock/InputBLockReducer'

import AddingModal from './AddingModal'

const mapStateToProps = state => ({
  ...state.inputBlock,
})

const mapDispatchToProps = {
  toggleAddingModal,
  setRandomParams,
  setCostWeightArray,
  setNumberOfItems,
  setKnapsackWeight,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddingModal)

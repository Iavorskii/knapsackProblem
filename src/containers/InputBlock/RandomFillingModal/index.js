import { connect } from 'react-redux'

import {
  toggleRandomFillingModal,
  setRandomParams,
  setCostWeightArray,
  setNumberOfItems,
} from '../../../reducers/InputBlock/InputBLockReducer'

import RandomFillingModal from './RandomFillingModal'

const mapStateToProps = state => ({
  ...state.inputBlock,
})

const mapDispatchToProps = {
  toggleRandomFillingModal,
  setRandomParams,
  setCostWeightArray,
  setNumberOfItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomFillingModal)

import { connect } from 'react-redux'

import GeneticModal from './GeneticModal'

import {
  setGeneticAlgorithmParams,
  toggleGeneticModal,
} from '../../../reducers/InputBlock/InputBLockReducer'

const mapStateToProps = state => ({
  ...state.inputBlock,
})

const mapDispatchToProps = {
  setGeneticAlgorithmParams,
  toggleGeneticModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneticModal)

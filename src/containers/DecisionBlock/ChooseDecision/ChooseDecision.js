/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
// import { isEqual, isNil } from 'lodash'
// import BrandAndBoundMethod from '../../../components/Algorithms/BranchAndBoundMethod'
// import DynamicProgram from '../../../components/Algorithms/DynamicProgram'
// import GreedyAlgorithm from '../../../components/Algorithms/GreedyAlgorithm'
// import ExhaustiveSearch from '../../../components/Algorithms/ExhaustiveSearch'
// import { decisionMethods } from '../../../constants/index'
import CommonResultTable from '../CommonResultTable'

export default class DecisionMethodsTabs extends Component {
  // state = {
  //   choosedMethod: null,
  //   isDisabledDecideButton: false,
  //   isNeedToDecide: false,
  //   oldDataSource: [],
  // }

  // static getDerivedStateFromProps(props, state) {
  //   const { knapsackWeight, dataSource } = props
  //   if (!isEqual(dataSource, state.oldDataSource)) {
  //     return {
  //       isDisabledDecideButton: isNil(knapsackWeight),
  //       isNeedToDecide: false,
  //       oldDataSource: dataSource,
  //     }
  //   }
  //   return {
  //     isDisabledDecideButton: isNil(knapsackWeight),
  //   }
  // }

  // renderDecideButton = () => {
  //   const { isDisabledDecideButton } = this.state
  //   return (
  //     <StyledDecisionButton
  //       type='primary'
  //       disabled={isDisabledDecideButton}
  //       onClick={() => this.setState({ isNeedToDecide: true })}
  //     >
  //       Решить задачу
  //     </StyledDecisionButton>
  //   )
  // }

  // chooseMethod = key => {
  //   this.setState({ choosedMethod: key, isNeedToDecide: false })
  // }

  // setNeedDecide = value => {
  //   this.setState({ isNeedToDecide: value })
  // }

  render() {
    // const { dataSource, knapsackWeight, changeStatistic } = this.props
    // const { isNeedToDecide, choosedMethod } = this.state
    // console.log('chhos', choosedMethod)
    // const commonProps = {
    //   dataSource,
    //   knapsackWeight,
    //   changeStatistic,
    //   setNeedDecide: this.setNeedDecide,
    // }

    return (
      <StyledCard title='Результат'>
        <CommonResultTable />
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)`
  grid-row-start: 3;
  grid-column-start: 1;

  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
  .ant-btn-default {
    height: 32px;
  }
`

// const StyledDecisionButton = styled(Button)`
//   background-color: #9575cd;
//   border-color: #9575cd;
// `
// DecisionMethodsTabs.propTypes = {
//   dataSource: PropTypes.array,
//   knapsackWeight: PropTypes.number,
//   changeStatistic: PropTypes.func,
// }

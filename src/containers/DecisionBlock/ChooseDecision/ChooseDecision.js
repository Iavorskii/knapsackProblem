import React, { Component } from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { isEqual, isNil } from 'lodash'
import BrandAndBoundMethod from '../../../components/Algorithms/BranchAndBoundMethod'
import DynamicProgram from '../../../components/Algorithms/DynamicProgram'
import GreedyAlgorithm from '../../../components/Algorithms/GreedyAlgorithm'
import ExhaustiveSearch from '../../../components/Algorithms/ExhaustiveSearch'
import DecisionHeader from './DecisionHeader'
import { decisionMethods } from '../../../constants/index'

export default class DecisionMethodsTabs extends Component {
  state = {
    isDisabledDecideButton: false,
    isNeedToDecide: false,
    oldDataSource: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { knapsackWeight, dataSource } = props
    if (!isEqual(dataSource, state.oldDataSource)) {
      return {
        isDisabledDecideButton: isNil(knapsackWeight),
        isNeedToDecide: false,
        oldDataSource: dataSource,
      }
    }
    return {
      isDisabledDecideButton: isNil(knapsackWeight),
    }
  }

  onClickDecideButton = () => {
    this.setState({ isNeedToDecide: true })
  }

  chooseMethod = key => {
    this.setState({ choosedMethod: key, isNeedToDecide: false })
  }

  setNeedDecide = value => {
    this.setState({ isNeedToDecide: value })
  }

  renderDecision = (key, commonProps) => {
    switch (key) {
      case decisionMethods.greedyAlgorithm:
        return <GreedyAlgorithm {...commonProps} />
      case decisionMethods.exhaustiveSearch:
        return <ExhaustiveSearch {...commonProps} />
      case decisionMethods.dynamicProgram:
        return <DynamicProgram {...commonProps} />
      case decisionMethods.brandAndBound:
        return <BrandAndBoundMethod {...commonProps} />
      default:
        return null
    }
  }

  render() {
    const { dataSource, knapsackWeight, changeStatistic, currentDecisionMethod } = this.props
    const { isNeedToDecide, isDisabledDecideButton } = this.state
    console.log('currentDecisionMethod', currentDecisionMethod)
    const commonProps = {
      dataSource,
      knapsackWeight,
      changeStatistic,
      setNeedDecide: this.setNeedDecide,
    }

    return (
      <StyledCard
        title={
          <DecisionHeader
            isDisabledDecideButton={isDisabledDecideButton}
            onClickDecideButton={this.onClickDecideButton}
          />
        }
      >
        {isNeedToDecide && this.renderDecision(currentDecisionMethod, commonProps)}
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

DecisionMethodsTabs.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  currentDecisionMethod: PropTypes.string,
  changeStatistic: PropTypes.func,
}

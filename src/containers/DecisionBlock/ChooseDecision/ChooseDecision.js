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
    oldDataSource: [],
    countDecision: 0,
  }

  static getDerivedStateFromProps(props, state) {
    const { knapsackWeight, dataSource, setNeedDecide } = props
    if (!isEqual(dataSource, state.oldDataSource)) {
      setNeedDecide({ isNeedToDecide: false })
      return {
        isDisabledDecideButton: isNil(knapsackWeight),
        oldDataSource: dataSource,
      }
    }
    return {
      isDisabledDecideButton: isNil(knapsackWeight),
    }
  }

  onClickDecideButton = () => {
    const { setNeedDecide } = this.props
    const { countDecision } = this.state
    setNeedDecide({ isNeedToDecide: true })
    const oldCountDecision = countDecision
    this.setState({ countDecision: oldCountDecision + 1 })
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
    const {
      dataSource,
      knapsackWeight,
      changeStatistic,
      currentDecisionMethod,
      isNeedToDecide,
      setCurrentDecisionMethod,
    } = this.props
    const { isDisabledDecideButton } = this.state
    const commonProps = {
      dataSource,
      knapsackWeight,
      changeStatistic,
      setCurrentDecisionMethod,
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
  setNeedDecide: PropTypes.func,
  setCurrentDecisionMethod: PropTypes.func,
  isNeedToDecide: PropTypes.bool,
}

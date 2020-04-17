import React, { Component } from 'react'
import { Button, Col, Row, Tabs } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { isEqual, isNil } from 'lodash'
import BrandAndBoundMethod from '../../../components/Algorithms/BranchAndBoundMethod'
import DynamicProgram from '../../../components/Algorithms/DynamicProgram'
import GreedyAlgorithm from '../../../components/Algorithms/GreedyAlgorithm'
import ExhaustiveSearch from '../../../components/Algorithms/ExhaustiveSearch'
import { decisionMethods } from '../../../constants/index'

const { TabPane } = Tabs

export default class DecisionMethodsTabs extends Component {
  state = {
    choosedMethod: null,
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

  renderDecideButton = () => {
    const { isDisabledDecideButton } = this.state
    return (
      <StyledDecisionButton
        type='primary'
        disabled={isDisabledDecideButton}
        onClick={() => this.setState({ isNeedToDecide: true })}
      >
        Решить задачу
      </StyledDecisionButton>
    )
  }

  chooseMethod = key => {
    this.setState({ choosedMethod: key, isNeedToDecide: false })
  }

  setNeedDecide = value => {
    this.setState({ isNeedToDecide: value })
  }

  render() {
    const { dataSource, knapsackWeight, changeStatistic } = this.props
    const { isNeedToDecide, choosedMethod } = this.state
    console.log('chhos', choosedMethod)
    const commonProps = {
      dataSource,
      knapsackWeight,
      changeStatistic,
      setNeedDecide: this.setNeedDecide,
    }

    return (
      <Wrapper>
        <Row type='flex' justify='space-around'>
          <Col span={22}>
            <Tabs
              tabBarExtraContent={this.renderDecideButton()}
              onChange={key => this.chooseMethod(key)}
              defaultActiveKey={decisionMethods.exhaustiveSearch}
            >
              <StyledTabPane tab='Метод ветвей и границ' key={decisionMethods.brandAndBound}>
                {dataSource.length !== 0 &&
                  isNeedToDecide &&
                  choosedMethod === decisionMethods.greedyAlgorithm && (
                    <BrandAndBoundMethod {...commonProps} />
                  )}
              </StyledTabPane>
              <StyledTabPane tab='Жадный алгоритм' key={decisionMethods.greedyAlgorithm}>
                {dataSource.length !== 0 &&
                  isNeedToDecide &&
                  choosedMethod === decisionMethods.greedyAlgorithm && (
                    <GreedyAlgorithm {...commonProps} />
                  )}
              </StyledTabPane>
              <StyledTabPane tab='Алгоритм перебора' key={decisionMethods.exhaustiveSearch}>
                {dataSource.length !== 0 &&
                  isNeedToDecide &&
                  choosedMethod === decisionMethods.exhaustiveSearch && (
                    <ExhaustiveSearch {...commonProps} />
                  )}
              </StyledTabPane>
              <StyledTabPane
                tab='Метод динамического программирования'
                key={decisionMethods.dynamicProgram}
              >
                {dataSource.length !== 0 &&
                  isNeedToDecide &&
                  choosedMethod === decisionMethods.dynamicProgram && (
                    <DynamicProgram {...commonProps} />
                  )}
              </StyledTabPane>
            </Tabs>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  // grid-row-start: 3;
  // grid-column-start: 1;
  // grid-column-end: 3;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);

  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
  .ant-btn-default {
    height: 32px;
  }
  .ant-tabs-tab {
    font-size: 18px;
  }
  .ant-tabs-ink-bar {
    background-color: #64b5f6;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #64b5f6;
  }
`
const StyledTabPane = styled(TabPane)`
  font-size: 20px;
`

const StyledDecisionButton = styled(Button)`
  background-color: #9575cd;
  border-color: #9575cd;
`
DecisionMethodsTabs.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  changeStatistic: PropTypes.func,
}

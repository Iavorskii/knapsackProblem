import React, { Component } from 'react'
import { Tabs, Row, Col, Button } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { isNil, isNull, isEqual } from 'lodash'
// import BrandAndBoundMethod from '../../../components/Algorithms/BranchAndBoundMethod'
import DynamicProgram from '../../../components/Algorithms/DynamicProgram'
// import GreedyAlgorithm from '../../../components/Algorithms/GreedyAlgorithm'
// import GeneticAlgorithm from '../../../components/Algorithms/GeneticAlgorithm'
import { decisionMethods } from '../../../constants/index'

const { TabPane } = Tabs

export default class DecisionMethodsTabs extends Component {
  state = {
    choosedMethod: decisionMethods.dynamicProgram,
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

  checkWeightEntered = () => {
    const { knapsackWeight } = this.props
    const isWeightEntered = isNull(knapsackWeight)
    return isWeightEntered
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
    const { choosedMethod, isNeedToDecide } = this.state

    return (
      <Wrapper>
        <Row type='flex' justify='space-around'>
          <Col span={22}>
            <Tabs
              tabBarExtraContent={this.renderDecideButton()}
              onChange={key => this.chooseMethod(key)}
              defaultActiveKey={decisionMethods.dynamicProgram}
            >
              {/*
                  <StyledTabPane tab='Метод ветвей и границ' key={decisionMethods.brandAndBound}>
                    Метод ветвей и границ
                  </StyledTabPane>
                  <StyledTabPane tab='Жадный алгоритм' key={decisionMethods.greedyAlgorithm}>
                    Жадный алгоритм
                  </StyledTabPane>
                  <StyledTabPane tab='Генетический алгоритм' key={decisionMethods.geneticAlgorithm}>
                    Генетический алгоритм
                  </StyledTabPane>
                 */}
              <StyledTabPane
                tab='Метод динамического программирования'
                key={decisionMethods.dynamicProgram}
              >
                {!isNil(dataSource) &&
                  dataSource.length !== 0 &&
                  choosedMethod === '2' &&
                  isNeedToDecide && (
                    <DynamicProgram
                      dataSource={dataSource}
                      knapsackWeight={knapsackWeight}
                      changeStatistic={changeStatistic}
                      setNeedDecide={this.setNeedDecide}
                    />
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
  grid-row-start: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);

  .ant-btn-primary {
    height: 32px;
    background-color: #7986cb;
    border-color: #7986cb;
  }
  .ant-btn-default {
    height: 32px;
  }
  .ant-tabs-tab {
    font-size: 18px;
  }
  .ant-tabs-ink-bar {
    background-color: #7986cb;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: #7986cb;
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
  statisticResults: PropTypes.arrayOf(),
}

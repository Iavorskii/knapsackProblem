import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

const _ = require('lodash')

const finalResult = {
  weight: 0,
  optimalValue: 0,
  solution: [],
}
let countNode = 0
let bounds = []

export default class BranchAndBoundMethod extends Component {
  validateBound = (tempArr, values, finalResult1, bounds1) => {
    // calculate sum value
    let sumValue = 0
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === 1) {
        sumValue += values[i]
      }
    }

    if (finalResult1.optimalValue > sumValue + bounds1[tempArr.length - 1]) return false
    return true
  }

  dfs = (tempArr, index, weights, values, limitWeight) => {
    countNode++
    // reach the end of state-space search tree
    if (index === weights.length) {
      let sumWeight = 0
      let sumValue = 0

      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === 1) {
          sumWeight += weights[i]
          sumValue += values[i]
        }
      }

      // update optimal solution if found
      if (sumWeight <= limitWeight && sumValue > finalResult.optimalValue) {
        finalResult.weight = sumWeight
        finalResult.optimalValue = sumValue
        finalResult.solution = tempArr
      }

      return
    }

    if (!this.validateBound(tempArr, values, finalResult, bounds)) {
      return
    }

    this.dfs(tempArr.concat(0), index + 1, weights, values, limitWeight)
    this.dfs(tempArr.concat(1), index + 1, weights, values, limitWeight)
  }

  branchAndBound = (dataSource, knapsackWeight) => {
    const values = _.map(dataSource, 'Cost')
    const weights = _.map(dataSource, 'Weight')
    for (let i = values.length - 1; i >= 0; i--) {
      bounds = [values[i] + (bounds[0] || 0)].concat(bounds)
    }

    this.dfs([], 0, weights, values, knapsackWeight)
    finalResult.countNode = countNode
    return finalResult
  }

  refreshStatistic = (decisionTime, maxBenefit) => {
    const { changeStatistic } = this.props

    const methodName = 'Метод ветвей и границ'
    const currentStatistic = {
      methodName,
      decisionTime,
      maxBenefit,
    }
    changeStatistic({ currentStatistic })
  }

  render() {
    const { dataSource, knapsackWeight } = this.props

    const start = performance.now()
    const result = this.branchAndBound(dataSource, knapsackWeight)
    const end = performance.now()
    const decisionTime = end - start
    const { optimalValue } = result
    this.refreshStatistic(decisionTime, optimalValue)
    const indexes = []
    for (let i = 0; i < result.solution.length; i++) {
      if (result.solution[i] === 1) {
        indexes.push(i)
      }
    }
    const decision = _.pullAt(_.cloneDeep(dataSource), indexes)
    console.log('decision', decision)
    return <CommonResultTable resultDataSource={decision} />
  }
}

BranchAndBoundMethod.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  changeStatistic: PropTypes.func,
}

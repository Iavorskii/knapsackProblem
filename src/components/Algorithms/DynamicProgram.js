import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

export default class DynamicProgrammingAlgorithm extends Component {
  dynamicAlgorithm = (items, knapsackWeight) => {
    let item = 0
    let weight = 0
    let maxBefore = 0
    let maxAfter = 0
    const numberOfItems = items.length
    const matrixWeight = new Array(numberOfItems + 1)
    const matrixToKeep = new Array(numberOfItems + 1)
    const solutionArray = []

    for (item = 0; item < numberOfItems + 1; item++) {
      matrixWeight[item] = new Array(knapsackWeight + 1)
      matrixToKeep[item] = new Array(knapsackWeight + 1)
    }

    for (item = 0; item <= numberOfItems; item++) {
      for (weight = 0; weight <= knapsackWeight; weight++) {
        if (item === 0 || weight === 0) {
          matrixWeight[item][weight] = 0
        } else if (items[item - 1].Weight <= weight) {
          maxAfter = items[item - 1].Cost + matrixWeight[item - 1][weight - items[item - 1].Weight]
          maxBefore = matrixWeight[item - 1][weight]

          if (maxAfter > maxBefore) {
            matrixWeight[item][weight] = maxAfter
            matrixToKeep[item][weight] = 1
          } else {
            matrixWeight[item][weight] = maxBefore
            matrixToKeep[item][weight] = 0
          }
        } else {
          matrixWeight[item][weight] = matrixWeight[item - 1][weight]
        }
      }
    }

    weight = knapsackWeight
    item = numberOfItems
    for (item; item > 0; item--) {
      if (matrixToKeep[item][weight] === 1) {
        solutionArray.push(items[item - 1])
        weight -= items[item - 1].Weight
      }
    }

    const maxBenefit = matrixWeight[numberOfItems][knapsackWeight]
    // The right-bottom-corner cell of the grid contains the final solution for the whole problem.

    return { solutionArray, maxBenefit }
  }

  refreshStatistic = (decisionTime, maxBenefit) => {
    const { changeStatistic } = this.props

    const methodName = 'Дин. программирование'
    const currentStatistic = {
      methodName,
      decisionTime,
      maxBenefit,
    }
    changeStatistic({ currentStatistic })
  }

  render() {
    const { dataSource, knapsackWeight } = this.props

    const start = new Date().getTime()
    const result = this.dynamicAlgorithm(dataSource, knapsackWeight)
    const end = new Date().getTime()

    const decisionTime = end - start
    const { maxBenefit } = result
    this.refreshStatistic(decisionTime, maxBenefit)
    console.log('dynamic')
    return <CommonResultTable resultDataSource={result.solutionArray} />
  }
}

DynamicProgrammingAlgorithm.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  changeStatistic: PropTypes.func,
}

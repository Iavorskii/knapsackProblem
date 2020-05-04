import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

const _ = require('lodash')
const BnB = require('./BranchAndBound')

export default class BranchAndBoundMethod extends Component {
  // constructor() {
  //   super()
  //   const sortedList = orderBy()
  // }

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
    // const { dataSource, knapsackvalue } = this.props
    const list = [
      {
        name: 'vegetables',
        value: 12,
        cost: 4,
      },
      {
        name: 'candy',
        value: 1,
        cost: 1,
      },
      {
        name: 'magazines',
        value: 4,
        cost: 2,
      },
      {
        name: 'dvd',
        value: 6,
        cost: 2,
      },
      {
        name: 'earphones',
        value: 6,
        cost: 3,
      },
      {
        name: 'shoes',
        value: 4,
        cost: 2,
      },
      {
        name: 'supplies',
        value: 9,
        cost: 3,
      },
    ]
    const start = performance.now()
    const data = {}
    data.values = _.map(list, 'cost')
    data.weights = _.map(list, 'value')
    data.limitWeight = 10
    const result1 = BnB(data)
    console.log('result111', result1)
    const end = performance.now()

    const decisionTime = end - start
    console.log('decisionTime', decisionTime)
    // const { maxBenefit } = result
    // this.refreshStatistic(decisionTime, maxBenefit)
    const indexes = []
    for (let i = 0; i < result1.solution.length; i++) {
      if (result1.solution[i] === 1) {
        indexes.push(i)
      }
    }
    console.log('indexes', indexes)

    const decision = _.pullAt(list, indexes)
    console.log('decision', decision)
    return <CommonResultTable resultDataSource={result1.items} />
  }
}

BranchAndBoundMethod.propTypes = {
  dataSource: PropTypes.array,
  knapsackvalue: PropTypes.number,
  changeStatistic: PropTypes.func,
}

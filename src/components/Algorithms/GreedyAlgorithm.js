import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

export default class GreedyMethod extends Component {
  implementation = (items, knapsackWeight) => {
    console.log('items', items)
    console.log('knapsackWeight', knapsackWeight)
    const copyArray = [...items]
    copyArray.sort(function(cur, next) {
      const currentRatio = cur.Cost / cur.Weight
      const nextRatio = next.Cost / next.Weight
      return nextRatio - currentRatio
    })
    const solution = []
    let availableWeight = knapsackWeight
    for (let i = 0; i < copyArray.length; i++) {
      if (copyArray[i].Weight <= availableWeight) {
        solution.push(copyArray[i])
        availableWeight -= copyArray[i].Weight
      }
    }
    console.log('copyearr', copyArray)
    console.log('solution', solution)
  }

  render() {
    const { dataSource, knapsackWeight } = this.props

    // const start = new Date().getTime()
    const result = this.implementation(dataSource, knapsackWeight)
    console.log('result', result)
    // const end = new Date().getTime()
    //
    // const decisionTime = end - start
    // const { maxBenefit } = result
    // this.refreshStatistic(decisionTime, maxBenefit)

    return <CommonResultTable />
  }
}

GreedyMethod.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
}

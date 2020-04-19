import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

export default class BranchAndBoundMethod extends Component {
  // calculate = () => {
  //   const size = _.size(values)
  // }
  //
  // // function compareFunc (itemA, itemB) {
  // //   const ratioA = itemA.Cost / itemA.Weight
  // //   const ratioB = itemB.Cost / itemB.Weight
  // //   return ratioA > ratioB
  // // }
  //
  // implementation = (items, knapsackWeight) => {
  //   const node = {
  //     level: null,
  //     profit: null,
  //     bound: null,
  //     weight: null,
  //   }
  // }

  refreshStatistic = (decisionTime, maxBenefit) => {
    const { changeStatistic } = this.props

    const methodName = 'Жадный алгоритм'
    const currentStatistic = {
      methodName,
      decisionTime,
      maxBenefit,
    }
    changeStatistic({ currentStatistic })
  }

  render() {
    const { dataSource, knapsackWeight } = this.props

    // const start = performance.now().now()
    const result = this.implementation(dataSource, knapsackWeight)
    console.log('result', result)
    // const end = performance.now().now()
    //
    // const decisionTime = end - start
    // const { maxBenefit } = result
    // this.refreshStatistic(decisionTime, maxBenefit)

    return <CommonResultTable resultDataSource={result.solution} />
  }
}

BranchAndBoundMethod.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  changeStatistic: PropTypes.func,
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

export default class ExhaustiveSearch extends Component {
  implementation = (items, knapsackWeight) => {
    const countItems = items.length
    let maxBenefit = 0
    let solution = []
    // внешний цикл по всем возможным наборам предметов
    for (let set = 0; set < 2 ** countItems; set++) {
      let tempSetWeight = 0
      let tempSetCost = 0
      const tempSolution = []
      // внутренний цикл по каждому из наборов и для каждого из наборов вычислим ценность
      // и вес и запишем и выберем лучший набор
      // запускаем цикл по маскам, интерпретируя как бы  цикл по предметам
      for (let itemIndex = 0; itemIndex < countItems; itemIndex++) {
        const mask = 1 << itemIndex
        if ((set & mask) > 0) {
          tempSetCost += items[itemIndex].Cost
          tempSetWeight += items[itemIndex].Weight
          tempSolution.push(items[itemIndex])
        }
      }
      if (tempSetCost > maxBenefit && tempSetWeight <= knapsackWeight) {
        maxBenefit = tempSetCost
        solution = [...tempSolution]
      }
    }
    return { solution, maxBenefit }
  }

  refreshStatistic = (decisionTime, maxBenefit) => {
    const { changeStatistic } = this.props

    const methodName = 'Алгоритм перебора'
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
    const result = this.implementation(dataSource, knapsackWeight)
    const end = performance.now()

    const decisionTime = end - start
    const { maxBenefit } = result
    this.refreshStatistic(decisionTime, maxBenefit)

    return <CommonResultTable resultDataSource={result.solution} />
  }
}

ExhaustiveSearch.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  changeStatistic: PropTypes.func,
}

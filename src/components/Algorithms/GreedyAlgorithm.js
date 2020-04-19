import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonResultTable from '../../containers/DecisionBlock/CommonResultTable'

export default class GreedyMethod extends Component {
  // находим сначала среднее значение стоимости \ вес(среднее за кг), затем сортируем массив по среднему значению
  // после этого проходим по каждому элементу массива и проверяем, помещается ли он в рюкзак
  implementation = (items, knapsackWeight) => {
    const copyItems = items.slice().sort(function(cur, next) {
      const currentRatio = cur.Cost / cur.Weight
      const nextRatio = next.Cost / next.Weight
      return nextRatio - currentRatio
    })
    const solution = []
    let availableWeight = knapsackWeight
    let maxBenefit = 0
    for (let i = 0; i < copyItems.length; i++) {
      if (copyItems[i].Weight <= availableWeight) {
        solution.push(copyItems[i])
        availableWeight -= copyItems[i].Weight
        maxBenefit += copyItems[i].Cost
      }
    }
    return { solution, maxBenefit }
  }

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

    const start = new Date().getTime()
    const result = this.implementation(dataSource, knapsackWeight)
    const end = new Date().getTime()

    const decisionTime = end - start
    const { maxBenefit } = result
    this.refreshStatistic(decisionTime, maxBenefit)

    return <CommonResultTable resultDataSource={result.solution} />
  }
}

GreedyMethod.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  changeStatistic: PropTypes.func,
}

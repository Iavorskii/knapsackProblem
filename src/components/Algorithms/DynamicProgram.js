import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'

export default class DynamicProgrammingAlgorithm extends Component {
  columns = [
    {
      title: 'Название',
      dataIndex: 'Name',
      key: 'Name',
      width: '30%',
    },
    {
      title: 'Вес',
      dataIndex: 'Weight',
      key: 'Weight',
      width: '30%',
    },
    {
      title: 'Стоимость',
      dataIndex: 'Cost',
      key: 'Cost',
      width: '30%',
    },
  ]

  state = {
    dataSourceState: [],
  }

  newResultArray = []

  componentDidMount() {
    const { dataSource, knapsackWeight } = this.props

    this.setState({ dataSourceState: this.knapsack(dataSource, knapsackWeight) })
  }

  knapsack = (items, knapsackWeight) => {
    const { setDecisionResult, dynamicProgramResult } = this.props
    let item = 0
    let weight = 0
    let maxBefore = 0
    let maxAfter = 0
    const numberOfItems = items.length
    const matrixWeight = new Array(numberOfItems + 1)
    const matrixToKeep = new Array(numberOfItems + 1)
    const solutionArray = []
    const start = new Date().getTime()

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
    // console.log('Max Benefit: ', matrixWeight[numberOfItems][knapsackWeight])
    // console.log('Max Benefit From: ', solutionArray)
    const end = new Date().getTime()
    const decisionTime = end - start
    // console.log(`SecondWay: ${end - start}ms`)
    // The right-bottom-corner cell of the grid contains the final solution for the whole problem.
    this.newResultArray = [...dynamicProgramResult]
    this.newResultArray.push({
      methodName: 'Метод динамического программирования',
      decisionTime,
      maxBenefit,
    })
    setDecisionResult({
      kindProgramResult: 'dynamicProgramResult',
      resultArray: this.newResultArray,
    })
    return solutionArray
  }

  render() {
    const { dataSourceState } = this.state
    // const { setNeedDecide } = this.props
    console.log('dataSourceState', dataSourceState)
    // setNeedDecide(false)

    return (
      <StyledTable
        dataSource={dataSourceState}
        columns={this.columns}
        bordered
        pagination={{ pageSize: 7 }}
      />
    )
  }
}
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    text-align: center;
    background-color: #c5cae9;
    color: #000;
    font-size: 16px;
    font-family: sans-serif;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    color: #000;
    font-size: 16px;
    font-family: sans-serif;
    padding: 12px;
  }
  .ant-table-header.ant-table-hide-scrollbar {
    background-color: #c5cae9;
  }
  .ant-table-row.ant-table-row-level-0 {
    td {
      cursor: pointer;
      word-break: break-word;
    }
  }
`
DynamicProgrammingAlgorithm.propTypes = {
  dataSource: PropTypes.array,
  knapsackWeight: PropTypes.number,
  setDecisionResult: PropTypes.func,
  setNeedDecide: PropTypes.func,
  dynamicProgramResult: PropTypes.arrayOf(),
}

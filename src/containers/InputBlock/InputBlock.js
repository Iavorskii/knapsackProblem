import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import InputBlockHeader from './InputBlockHeader'
import InitialTable from './InitialTable/InitialTable'
import RandomFillingModal from './RandomFillingModal'

export default class InputBlock extends Component {
  state = {
    count: 0,
  }

  handleAdd = () => {
    const { count } = this.state
    const { setCostWeightArray, dataSource } = this.props
    const newData = {
      key: count,
      Name: `Предметт ${count}`,
      Weight: 0,
      Cost: 0,
    }
    this.setState({
      count: count + 1,
    })
    setCostWeightArray({ dataSource: [...dataSource, newData] })
  }

  handleDelete = key => {
    const { setCostWeightArray, dataSource } = this.props
    setCostWeightArray({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  handleSave = row => {
    const { dataSource } = this.props
    const { setCostWeightArray } = this.props
    const newData = dataSource
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]

    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setCostWeightArray({ dataSource: [...newData] })
  }

  clearDatasource = () => {
    const { setCostWeightArray } = this.props
    setCostWeightArray({ dataSource: [] })
  }

  setWeight = value => {
    const { setKnapsackWeight } = this.props
    setKnapsackWeight({ knapsackWeight: value })
  }

  render() {
    const { isOpenRandomFillingModal, toggleRandomFillingModal, dataSource } = this.props

    return (
      <Wrapper>
        <InputBlockHeader
          handleAdd={this.handleAdd}
          handleSave={this.handleSave}
          setWeight={this.setWeight}
          clearDatasource={this.clearDatasource}
          toggleRandomFillingModal={toggleRandomFillingModal}
        />
        <InitialTable
          dataSource={dataSource}
          handleSave={this.handleSave}
          handleDelete={this.handleDelete}
        />
        {isOpenRandomFillingModal && <RandomFillingModal />}
      </Wrapper>
    )
  }
}

InputBlock.propTypes = {
  isOpenRandomFillingModal: PropTypes.bool,
  toggleRandomFillingModal: PropTypes.func,
  setCostWeightArray: PropTypes.func,
  setKnapsackWeight: PropTypes.func,
  dataSource: PropTypes.arrayOf(),
}

const Wrapper = styled.div`
  grid-row-start: 2;
  width: 900px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #fff;
  height: 600px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);
`

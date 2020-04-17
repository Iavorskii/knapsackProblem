import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { notification, Card } from 'antd'
import InputBlockHeader from './InputBlockHeader'
import InitialTable from './InitialTable/InitialTable'
import RandomFillingModal from './RandomFillingModal'

export default class InputBlock extends Component {
  handleAdd = () => {
    const { setCostWeightArray, dataSource, numberOfItems, setNumberOfItems } = this.props
    const newData = {
      key: numberOfItems,
      Name: `Предмет ${numberOfItems}`,
      Weight: 0,
      Cost: 0,
    }
    const modifyiedNumberOfItems = numberOfItems + 1
    setNumberOfItems({ numberOfItems: modifyiedNumberOfItems })
    setCostWeightArray({ dataSource: [...dataSource, newData] })
    notification.success({
      message: 'Предмет успешно добавлен',
      duration: 3,
    })
  }

  handleDelete = key => {
    const { setCostWeightArray, dataSource, setNumberOfItems, numberOfItems } = this.props
    const modifyiedNumberOfItems = numberOfItems - 1
    setNumberOfItems({ numberOfItems: modifyiedNumberOfItems })
    setCostWeightArray({ dataSource: dataSource.filter(item => item.key !== key) })
    notification.success({
      message: 'Предмет успешно удален',
      duration: 3,
    })
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
    const { setCostWeightArray, setNumberOfItems } = this.props
    setCostWeightArray({ dataSource: [] })
    setNumberOfItems({ numberOfItems: 0 })
    notification.success({
      message: 'Таблица успешно очищена',
      duration: 3,
    })
  }

  setWeight = value => {
    const { setKnapsackWeight } = this.props
    setKnapsackWeight({ knapsackWeight: value })
  }

  render() {
    const { isOpenRandomFillingModal, toggleRandomFillingModal, dataSource } = this.props
    return (
      <StyledCard title='Начальные данные'>
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
      </StyledCard>
    )
  }
}

InputBlock.propTypes = {
  isOpenRandomFillingModal: PropTypes.bool,
  toggleRandomFillingModal: PropTypes.func,
  setCostWeightArray: PropTypes.func,
  setKnapsackWeight: PropTypes.func,
  setNumberOfItems: PropTypes.func,
  dataSource: PropTypes.arrayOf(),
  numberOfItems: PropTypes.number,
}

const StyledCard = styled(Card)`
  grid-row-start: 2;
  // width: 950px;
`

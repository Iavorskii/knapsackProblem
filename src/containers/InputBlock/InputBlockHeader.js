import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Tooltip, Icon } from 'antd'

const InputBlockHeader = props => {
  const { toggleAddingModal, toggleGeneticModal, clearDatasource } = props

  return (
    <Wrapper>
      <Row type='flex' justify='space-between'>
        <Col span={6}>Начальные данные</Col>
        <StyleIconsCol span={4}>
          <Tooltip title='Параметры генетического алгоритма'>
            <StyleIcon type='deployment-unit' onClick={() => toggleGeneticModal()} />
          </Tooltip>
          <Tooltip title='Заполнение рандомными предметами'>
            <StyleIcon type='form' onClick={() => toggleAddingModal()} />
          </Tooltip>
          <Tooltip title='Очистить таблицу'>
            <StyleIcon type='close' onClick={clearDatasource} />
          </Tooltip>
        </StyleIconsCol>
      </Row>
    </Wrapper>
  )
}

export default InputBlockHeader

const Wrapper = styled.div`
  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
`

const StyleIcon = styled(Icon)`
  font-size: 20px;
  margin-left: 17px;
  @media (max-width: 1368px) {
    margin-left: 5px;
  }
`
const StyleIconsCol = styled(Col)`
  display: flex;
  justify-contet: space-between;
  padding-top: 5px;
`

InputBlockHeader.propTypes = {
  toggleGeneticModal: PropTypes.func,
  toggleAddingModal: PropTypes.func,
  clearDatasource: PropTypes.func,
}

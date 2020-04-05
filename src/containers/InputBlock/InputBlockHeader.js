import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputNumber, Row, Col, Button, Tooltip, Icon } from 'antd'

const InputBlockHeader = props => {
  const { handleAdd, toggleRandomFillingModal, clearDatasource, setWeight } = props
  const [weightState, setWeightState] = useState(10000)

  return (
    <Wrapper>
      <StyledRow type='flex'>
        <StyledCol span={6}>
          <StyledText>Вместимость рюкзака</StyledText>
        </StyledCol>
        <StyledCol span={10}>
          <StyledInputNumber
            min={1}
            value={weightState}
            onChange={value => setWeightState(value)}
            parser={value => value.replace(/[^+\d]/g, '')}
          />
        </StyledCol>
        <StyledCol span={5}>
          <StyledButton type='primary' onClick={() => setWeight(weightState)}>
            Применить
          </StyledButton>
        </StyledCol>
        <StyleIconsCol span={3}>
          <Tooltip title='Заполнение рандомными предметами'>
            <StyleIcon type='form' onClick={() => toggleRandomFillingModal()} />
          </Tooltip>
          <Tooltip title=' Добавить предмет'>
            <StyleIcon type='plus' onClick={handleAdd} />
          </Tooltip>
          <Tooltip title='Очистить таблицу'>
            <StyleIcon type='close' onClick={clearDatasource} />
          </Tooltip>
        </StyleIconsCol>
      </StyledRow>
    </Wrapper>
  )
}

export default InputBlockHeader

const Wrapper = styled.div`
  margin-top: 50px;
  .ant-btn-primary {
    height: 32px;
    background-color: #7986cb;
    border-color: #7986cb;
  }
`
const StyledRow = styled(Row)`
  margin: 0px 20px 0 25px;
`
const StyledButton = styled(Button)`
  margin-bottom: 15px;
  margin-right: 10px;
`
const StyleIcon = styled(Icon)`
  font-size: 24px;
  margin-left: 10px;
`
const StyledText = styled.div`
  font-size: 16px;
  color: #000;
  padding-top: 5px;
`
const StyledCol = styled(Col)`
  // border: 1px solid red;
`
const StyleIconsCol = styled(Col)`
  display: flex;
  justify-contet: space-between;
  // border: 1px solid;
  padding-top: 5px;
`
const StyledInputNumber = styled(InputNumber)`
  width: 300px;
`
InputBlockHeader.propTypes = {
  handleAdd: PropTypes.bool,
  toggleRandomFillingModal: PropTypes.func,
  clearDatasource: PropTypes.func,
  setWeight: PropTypes.func,
}

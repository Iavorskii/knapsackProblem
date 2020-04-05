import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputNumber, Row, Col, Button } from 'antd'

const InputBlockHeader = props => {
  const { handleAdd, toggleRandomFillingModal, clearDatasource, setWeight } = props
  const [weightState, setWeightState] = useState(10000)

  return (
    <Wrapper>
      <StyledRow type='flex'>
        <StyledCol span={3}>
          <StyledText>Вместимость рюкзака</StyledText>
        </StyledCol>
        <StyledCol span={3}>
          <InputNumber
            min={1}
            value={weightState}
            onChange={value => setWeightState(value)}
            parser={value => value.replace(/[^+\d]/g, '')}
          />
        </StyledCol>
        <StyledCol span={4}>
          <StyledButton type='primary' onClick={() => setWeight(weightState)}>
            Применить
          </StyledButton>
        </StyledCol>
        <StyledCol span={6}>
          <StyledButton type='primary' onClick={() => toggleRandomFillingModal()}>
            Рандомное заполнение
          </StyledButton>
        </StyledCol>
        <StyledCol span={5}>
          <StyledButton type='primary' onClick={handleAdd}>
            Добавить предмет
          </StyledButton>
        </StyledCol>

        <StyledCol span={3}>
          <StyledButton type='primary' onClick={clearDatasource}>
            Сбросить
          </StyledButton>
        </StyledCol>
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
  // border: 1px solid;
`
const StyledButton = styled(Button)`
  margin-bottom: 15px;
  margin-right: 10px;
`
const StyledText = styled.div`
  font-size: 16px;
  color: #000;
`
const StyledCol = styled(Col)`
  // border: 1px solid red;
`
InputBlockHeader.propTypes = {
  handleAdd: PropTypes.bool,
  toggleRandomFillingModal: PropTypes.func,
  clearDatasource: PropTypes.func,
  setWeight: PropTypes.func,
}

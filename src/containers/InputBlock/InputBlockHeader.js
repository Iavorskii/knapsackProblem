import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Tooltip, Icon } from 'antd'

const InputBlockHeader = props => {
  const { toggleRandomFillingModal, clearDatasource } = props
  // const [weightState, setWeightState] = useState(10)

  return (
    <Wrapper>
      <Row type='flex' justify='space-between'>
        <Col span={5}>Начальные данные</Col>
        <StyleIconsCol span={2}>
          <Tooltip title='Заполнение рандомными предметами'>
            <StyleIcon type='form' onClick={() => toggleRandomFillingModal()} />
          </Tooltip>
          {/* <Tooltip title=' Добавить предмет'>
            <StyleIcon type='plus' onClick={handleAdd} />
          </Tooltip> */}
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
// const StyledButton = styled(Button)`
//   margin-bottom: 15px;
//   // margin-right: 10px;
// `
const StyleIcon = styled(Icon)`
  font-size: 20px;
  margin-left: 17px;
  @media (max-width: 1368px) {
    margin-left: 5px;
  }
`
// const StyledText = styled.div`
//   font-size: 14px;
//   color: #000;
//   padding-top: 5px;
// `
// const StyledCol = styled(Col)`
//   // border: 1px solid red;
// `
const StyleIconsCol = styled(Col)`
  display: flex;
  justify-contet: space-between;
  // border: 1px solid;
  padding-top: 5px;
`
// const StyledInputNumber = styled(InputNumber)`
//   width: 250px;
//   @media (max-width: 1368px) {
//     width: 150px;
//   }
// `
InputBlockHeader.propTypes = {
  handleAdd: PropTypes.bool,
  toggleRandomFillingModal: PropTypes.func,
  clearDatasource: PropTypes.func,
  // setWeight: PropTypes.func,
}

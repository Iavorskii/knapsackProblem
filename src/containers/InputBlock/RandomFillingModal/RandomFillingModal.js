import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Row, Col, InputNumber, Form, Button, notification } from 'antd'

class RandomFillingModal extends PureComponent {
  state = {
    temporaryCostWeightArray: [],
  }

  componentDidMount() {
    const {
      form: { validateFields, setFieldsValue },
    } = this.props
    validateFields({ force: true })
    setFieldsValue({
      thingsCount: 5,
      minWeight: 1,
      maxWeight: 10,
      minCost: 1,
      maxCost: 10,
    })
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  randomInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min

  handleOk = () => {
    const {
      toggleRandomFillingModal,
      setCostWeightArray,
      dataSource,
      form: { getFieldsValue },
      setNumberOfItems,
      numberOfItems,
    } = this.props
    const { thingsCount, minWeight, maxWeight, minCost, maxCost } = getFieldsValue()

    const { temporaryCostWeightArray } = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < thingsCount; i++) {
      const tempObject = {
        key: numberOfItems + i,
        Name: `Предмет ${i.toString()}`,
        Cost: this.randomInteger(+minCost, +maxCost),
        Weight: this.randomInteger(+minWeight, +maxWeight),
      }
      temporaryCostWeightArray.push(tempObject)
    }
    setCostWeightArray({ dataSource: [...dataSource, ...temporaryCostWeightArray] })
    const modyfiedNumberOfItems = numberOfItems + thingsCount
    setNumberOfItems({ numberOfItems: modyfiedNumberOfItems })
    toggleRandomFillingModal()
    notification.success({
      message: 'Предметы  успешно сгенерированы и добавлены в таблицу',
      duration: 3,
    })
  }

  renderFooterButtons = () => {
    const {
      form: { getFieldsError },
    } = this.props

    const disabledButtonPrimary = this.hasErrors(getFieldsError())

    return [
      <div>
        <Button type='primary' disabled={disabledButtonPrimary} onClick={this.handleOk}>
          Сохранить
        </Button>
      </div>,
    ]
  }

  render() {
    const {
      isOpenRandomFillingModal,
      toggleRandomFillingModal,
      form: { getFieldDecorator },
      // knapsackWeight,
    } = this.props

    return (
      <StyledModal
        width={800}
        visible={isOpenRandomFillingModal}
        title='Рандомное добавление предметов'
        onCancel={toggleRandomFillingModal}
        footer={this.renderFooterButtons()}
      >
        <Form>
          <StyledRow>
            <Col span={8}>Количество предметов</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('thingsCount', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(
                  <StyledInput
                    parser={value => value.replace(/[^+\d]/g, '')}
                    // onChange={value => this.handleChange(value, 'thingsCount')}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>Минимальный вес предметов</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('minWeight', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(
                  <StyledInput min={1} parser={value => value.replace(/[^+\d]/g, '')} allowClear />
                )}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>Максимальный вес предметов</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('maxWeight', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                    // {
                    //   max: 10000,
                    //   message: `Макс. вес не должен превышать вес рюкзака!`,
                    // },
                  ],
                })(<StyledInput parser={value => value.replace(/[^+\d]/g, '')} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>Минимальная стоимость предметов</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('minCost', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(<StyledInput parser={value => value.replace(/[^+\d]/g, '')} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>Максимальная стоимость предметов</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('maxCost', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(<StyledInput parser={value => value.replace(/[^+\d]/g, '')} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
        </Form>
      </StyledModal>
    )
  }
}

export default Form.create()(RandomFillingModal)

RandomFillingModal.propTypes = {
  isOpenRandomFillingModal: PropTypes.bool,
  toggleRandomFillingModal: PropTypes.func,
  setCostWeightArray: PropTypes.func,
  setNumberOfItems: PropTypes.func,
  dataSource: PropTypes.arrayOf(),
  form: PropTypes.object,
  knapsackWeight: PropTypes.number,
  numberOfItems: PropTypes.number,
}

const StyledModal = styled(Modal)`
  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
`
const StyledRow = styled(Row)``
const StyledInput = styled(InputNumber)`
  width: 100%;
`

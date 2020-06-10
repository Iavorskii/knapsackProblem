import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Form, Button, Col, Row, Input } from 'antd'

class GeneticModal extends PureComponent {
  componentDidMount() {
    const {
      form: { setFieldsValue },
    } = this.props

    setFieldsValue({
      populationSize: 25,
      mutationRate: 0.5,
      numberOfGenerations: 25,
      selectionThreshold: 0.5,
      numberOfCrossoverPoints: 1,
    })
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  handleOk = () => {
    const {
      toggleGeneticModal,
      form: { getFieldsValue },
      setGeneticAlgorithmParams,
    } = this.props

    const {
      populationSize,
      mutationRate,
      numberOfGenerations,
      selectionThreshold,
      numberOfCrossoverPoints,
    } = getFieldsValue()

    const geneticAlgorithmParams = {
      populationSize: +populationSize,
      crossoverType: 'onePoint',
      selectionType: 'rouletteWheel',
      resamplingType: 'fitnessBased',
      crossoverParams: {
        numberOfCrossoverPoints: +numberOfCrossoverPoints,
        selectionThreshold: +selectionThreshold,
      },
      mutation: {
        mutationRate: +mutationRate,
      },
      numberOfGenerations: +numberOfGenerations,
    }
    setGeneticAlgorithmParams({ geneticAlgorithmParams })
    toggleGeneticModal()
  }

  renderFooterButtons = () => {
    const {
      form: { getFieldsError },
    } = this.props

    const disabledButtonPrimary = this.hasErrors(getFieldsError())

    return (
      <Button type='primary' disabled={disabledButtonPrimary} onClick={this.handleOk}>
        Сохранить
      </Button>
    )
  }

  render() {
    const {
      isGeneticModalOpened,
      toggleGeneticModal,
      form: { getFieldDecorator },
    } = this.props
    console.log('form', this.props.form.getFieldsValue())
    return (
      <StyledModal
        width={800}
        visible={isGeneticModalOpened}
        title='Параметры генетического алгоритма'
        onCancel={toggleGeneticModal}
        footer={this.renderFooterButtons()}
      >
        <Form>
          <StyledRow>
            <Col span={8}>Размер популяции</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('populationSize', {
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
            <Col span={8}>Вероятность мутации</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('mutationRate', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(<StyledInput min={1} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>Количество поколений</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('numberOfGenerations', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(<StyledInput min={1} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>selectionThreshold</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('selectionThreshold', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(<StyledInput min={1} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={8}>Количество точек кроссовера</Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator('numberOfCrossoverPoints', {
                  rules: [
                    {
                      required: true,
                      message: `Поле обязательно для заполнения`,
                    },
                  ],
                })(<StyledInput min={1} allowClear />)}
              </Form.Item>
            </Col>
          </StyledRow>
        </Form>
      </StyledModal>
    )
  }
}

export default Form.create()(GeneticModal)

GeneticModal.propTypes = {
  isGeneticModalOpened: PropTypes.bool,
  toggleGeneticModal: PropTypes.func,
  setGeneticAlgorithmParams: PropTypes.func,
  form: PropTypes.object,
}

const StyledModal = styled(Modal)`
  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
  .ant-col ant-col-8 {
    padding-top: 10px;
  }
`
const StyledRow = styled(Row)``
const StyledInput = styled(Input)`
  width: 100%;
`

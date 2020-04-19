import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, InputNumber, Form } from 'antd'

const RandomAdding = ({ form: { getFieldDecorator, validateFields, setFieldsValue } }) => {
  RandomAdding.propTypes = {
    form: PropTypes.object,
  }
  useEffect(() => {
    validateFields({ force: true })
    setFieldsValue({
      knapsackWeight: 10,
      thingsCount: 5,
      minWeight: 1,
      maxWeight: 10,
      minCost: 1,
      maxCost: 10,
    })
  }, [])

  return (
    <div>
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
            })(<StyledInput min={1} parser={value => value.replace(/[^+\d]/g, '')} allowClear />)}
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
    </div>
  )
}

const StyledRow = styled(Row)``
const StyledInput = styled(InputNumber)`
  width: 100%;
`
export default RandomAdding

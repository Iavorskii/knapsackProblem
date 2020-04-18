import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, InputNumber, Form } from 'antd'

const CommonFields = ({ form: { getFieldDecorator }, form }) => {
  CommonFields.propTypes = {
    form: PropTypes.object,
  }
  console.log('form1', form.getFieldsValue())
  return (
    <StyledRow>
      <Col span={8}>Вес рюкзака</Col>
      <Col span={8}>
        <Form.Item>
          {getFieldDecorator('knapsackWeight', {
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
  )
}

const StyledRow = styled(Row)``
const StyledInput = styled(InputNumber)`
  width: 100%;
`
export default CommonFields

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react'
import { InputNumber, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

export const EditableFormRow = Form.create()(EditableRow)

EditableRow.propTypes = {
  form: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export class EditableCell extends Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const { editing: editingFromState } = this.state
    const editing = !editingFromState
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = form => {
    this.form = form
    const { children, dataIndex, record } = this.props
    const { editing } = this.state

    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: false,
              message: `Введите корректные данные`,
            },
          ],
          initialValue: record[dataIndex],
          // eslint-disable-next-line no-return-assign
        })(
          dataIndex === 'Name' ? (
            <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />
          ) : (
            <InputNumber
              ref={node => (this.input = node)}
              onPressEnter={this.save}
              onBlur={this.save}
              parser={value => value.replace(/[^+\d]/g, '')}
            />
          )
        )}
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

EditableCell.propTypes = {
  form: PropTypes.object.isRequired,
  index: PropTypes.number,
  editable: PropTypes.bool,
  dataIndex: PropTypes.number,
  title: PropTypes.string,
  record: PropTypes.object,
  handleSave: PropTypes.func,
  children: PropTypes.object,
  onChange: PropTypes.func,
}

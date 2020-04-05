import React from 'react'
import { Table, Popconfirm } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { EditableFormRow, EditableCell } from './EditableCell'

const InitialTable = props => {
  const { handleSave, dataSource, handleDelete } = props

  const columns = [
    {
      title: 'Название',
      dataIndex: 'Name',
      key: 'Name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Вес',
      dataIndex: 'Weight',
      key: 'Weight',
      width: '30%',
      editable: true,
    },
    {
      title: 'Стоимость',
      dataIndex: 'Cost',
      key: 'Cost',
      width: '30%',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (text, record) => (
        <Popconfirm title='Уверены в удалении?' onConfirm={() => handleDelete(record.key)}>
          <a>Удалить</a>
        </Popconfirm>
      ),
    },
  ]

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  }
  const columnsMap = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  return (
    <TableWrapper>
      <StyledTable
        bordered
        components={components}
        dataSource={dataSource}
        columns={columnsMap}
        pagination={{ pageSize: 6 }}
      />
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  margin-top: 50px;
  background-color: #fff;
`
const StyledTable = styled(Table)`
  padding: 0 25px;
  .ant-table-thead > tr > th {
    text-align: center;
    background-color: #c5cae9;
    color: #000;
    font-size: 16px;
    font-family: sans-serif;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    color: #000;
    font-size: 16px;
    font-family: sans-serif;
    padding: 12px;
  }
  .ant-table-header.ant-table-hide-scrollbar {
    background-color: #c5cae9;
  }
  .ant-table-row.ant-table-row-level-0 {
    td {
      cursor: pointer;
      word-break: break-word;
    }
  }
`
export default InitialTable

InitialTable.propTypes = {
  handleSave: PropTypes.func,
  dataSource: PropTypes.arrayOf(),
  handleDelete: PropTypes.func,
}

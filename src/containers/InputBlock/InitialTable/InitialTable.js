import React from 'react'
import { Table, Popconfirm } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { EditableFormRow, EditableCell } from './EditableCell'
import { numSorter, stringSorter } from '../../../utils'

const InitialTable = props => {
  const { handleSave, dataSource, handleDelete } = props

  const columns = [
    {
      title: 'Название',
      dataIndex: 'Name',
      key: 'Name',
      width: '30%',
      editable: true,
      sorter: (cur, next) => stringSorter(cur.Name, next.Name),
    },
    {
      title: 'Вес',
      dataIndex: 'Weight',
      key: 'Weight',
      width: '25%',
      editable: true,
      sorter: (cur, next) => numSorter(cur.Weight, next.Weight),
    },
    {
      title: 'Стоимость',
      dataIndex: 'Cost',
      key: 'Cost',
      width: '25%',
      editable: true,
      sorter: (cur, next) => numSorter(cur.Cost, next.Cost),
    },
    {
      title: '',
      width: '15%',
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
        pagination={{ pageSize: 5 }}
      />
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  background-color: #fff;
`
const StyledTable = styled(Table)`
  padding: 0 25px;
  margin-top: 10px;
  .ant-card-bordered {
    height: -webkit-fill-available;
  }

  .ant-table-thead > tr > th {
    text-align: center;
    background-color: #64b5f6;
    color: #000;
    font-size: 14px;
    font-family: sans-serif;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    color: #000;
    font-size: 14px;
    font-family: sans-serif;
    padding: 12px;
  }
  .ant-table-header.ant-table-hide-scrollbar {
    background-color: #64b5f6;
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

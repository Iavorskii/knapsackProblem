import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import { numSorter, stringSorter } from '../../utils'

const CommonResultTable = ({ resultDataSource }) => {
  CommonResultTable.propTypes = {
    resultDataSource: PropTypes.array,
  }
  const columns = [
    {
      title: 'Название',
      dataIndex: 'Name',
      key: 'Name',
      width: '30%',
      sorter: (cur, next) => stringSorter(cur.Name, next.Name),
    },
    {
      title: 'Вес',
      dataIndex: 'Weight',
      key: 'Weight',
      width: '30%',
      sorter: (cur, next) => numSorter(cur.Weight, next.Weight),
    },
    {
      title: 'Стоимость',
      dataIndex: 'Cost',
      key: 'Cost',
      width: '30%',
      sorter: (cur, next) => numSorter(cur.Cost, next.Cost),
    },
  ]

  return (
    <StyledTable
      dataSource={resultDataSource}
      columns={columns}
      bordered
      pagination={{ pageSize: 5 }}
    />
  )
}

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
export default CommonResultTable

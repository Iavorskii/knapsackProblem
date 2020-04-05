import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { numSorter } from '../../utils'

const Statistic = props => {
  const { dynamicProgramResult } = props

  const columns = [
    {
      title: 'Название метода',
      dataIndex: 'methodName',
      key: 'methodName',
      width: '50%',
    },
    {
      title: 'Время решения (мс)',
      dataIndex: 'decisionTime',
      key: 'decisionTime',
      width: '25%',
      sorter: (cur, next) => {
        numSorter(cur, next)
      },
    },
    {
      title: 'Макс. стоимость',
      dataIndex: 'maxBenefit',
      key: 'maxBenefit',
      width: '25%',
      sorter: (cur, next) => {
        numSorter(cur, next)
      },
    },
  ]

  console.log('dynamicProgramResult', dynamicProgramResult)

  return (
    <Wrapper>
      <StyledTable
        columns={columns}
        dataSource={dynamicProgramResult}
        bordered
        pagination={{ pageSize: 6 }}
      />
    </Wrapper>
  )
}

export default Statistic

const Wrapper = styled.div`
  margin-top: 60px;
  width: 900px;
  .ant-btn-primary {
    height: 32px;
    background-color: #7986cb;
    border-color: #7986cb;
  }
  .ant-btn-default {
    height: 32px;
  }
`
const StyledTable = styled(Table)`
  margin-top: 10px;
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

Statistic.propTypes = {
  dynamicProgramResult: PropTypes.arrayOf(),
}

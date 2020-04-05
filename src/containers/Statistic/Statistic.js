import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { numSorter, stringSorter } from '../../utils'

const Statistic = props => {
  const { statisticResults } = props

  const columns = [
    {
      title: 'Название метода',
      dataIndex: 'methodName',
      key: 'methodName',
      width: '50%',
      sorter: (cur, next) => stringSorter(cur.methodName, next.methodName),
    },
    {
      title: 'Время решения (мс)',
      dataIndex: 'decisionTime',
      key: 'decisionTime',
      width: '25%',
      sorter: (cur, next) => numSorter(cur.decisionTime, next.decisionTime),
    },
    {
      title: 'Макс. стоимость',
      dataIndex: 'maxBenefit',
      key: 'maxBenefit',
      width: '25%',
      sorter: (cur, next) => numSorter(cur.maxBenefit, next.maxBenefit),
    },
  ]

  return (
    <Wrapper>
      <StyledTable
        columns={columns}
        dataSource={statisticResults}
        bordered
        pagination={{ pageSize: 6 }}
      />
    </Wrapper>
  )
}

export default Statistic

const Wrapper = styled.div`
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
    background-color: #9fa8da;
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
    background-color: #9fa8da;
  }
  .ant-table-row.ant-table-row-level-0 {
    td {
      cursor: pointer;
      word-break: break-word;
    }
  }
`

Statistic.propTypes = {
  statisticResults: PropTypes.arrayOf(),
}

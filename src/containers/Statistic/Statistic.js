import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table, Card } from 'antd'
import { numSorter, stringSorter } from '../../utils'

const Statistic = props => {
  const { statisticResults } = props

  const columns = [
    {
      title: 'Название метода',
      dataIndex: 'methodName',
      key: 'methodName',
      width: '70%',
      sorter: (cur, next) => stringSorter(cur.methodName, next.methodName),
    },
    {
      title: 'Время решения (мс)',
      dataIndex: 'decisionTime',
      key: 'decisionTime',
      width: '15%',
      sorter: (cur, next) => numSorter(cur.decisionTime, next.decisionTime),
    },
    {
      title: 'Макс. стоимость',
      dataIndex: 'maxBenefit',
      key: 'maxBenefit',
      width: '15%',
      sorter: (cur, next) => numSorter(cur.maxBenefit, next.maxBenefit),
    },
  ]

  return (
    <Wrapper>
      <Card title='Статистическая информация'>
        <StyledTable
          columns={columns}
          dataSource={statisticResults}
          bordered
          pagination={{ pageSize: 6 }}
        />
      </Card>
    </Wrapper>
  )
}

export default Statistic

const Wrapper = styled.div`
  .ant-card-bordered {
    height: -webkit-fill-available;
  }
  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
  .ant-btn-default {
    height: 32px;
  }
`
const StyledTable = styled(Table)`
  margin-top: 15px;
  padding: 0 25px;

  .ant-table-thead > tr > th {
    text-align: center;
    background-color: #64b5f6;
    color: #000;
    font-size: 14px;
    font-family: sans-serif;
    white-space: nowrap;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    white-space: nowrap;
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

Statistic.propTypes = {
  statisticResults: PropTypes.arrayOf(),
}

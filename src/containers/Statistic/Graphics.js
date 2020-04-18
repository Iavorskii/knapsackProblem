import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from 'antd'

const Statistic = () => {
  return (
    <Wrapper>
      <StyledCard title='Область для каких-то графиков' />
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
const StyledCard = styled(Card)`
  grid-row-start: 3;
  grid-column-start: 2;

  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
  .ant-btn-default {
    height: 32px;
  }
`

// Statistic.propTypes = {
// }

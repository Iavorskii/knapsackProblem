import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import styled from 'styled-components'

const DecisionHeader = ({ isDisabledDecideButton, onClickDecideButton }) => {
  DecisionHeader.propTypes = {
    isDisabledDecideButton: PropTypes.bool,
    onClickDecideButton: PropTypes.func,
  }

  return (
    <Wrapper>
      <div>Решение</div>
      <StyledDecisionButton
        type='primary'
        disabled={isDisabledDecideButton}
        onClick={() => onClickDecideButton()}
      >
        Решить задачу
      </StyledDecisionButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledDecisionButton = styled(Button)`
  background-color: #9575cd;
  border-color: #9575cd;
`

export default DecisionHeader

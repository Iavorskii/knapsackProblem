import React from 'react'
import styled from 'styled-components'
import InputBlock from '../containers/InputBlock'
// import ChooseDecision from '../containers/DecisionBlock/ChooseDecision'
import MainMenu from './MainMenu'
import Statistic from '../containers/Statistic'
import { diplomaTitle } from '../constants'

const StartPage = () => {
  return (
    <CommonWrapper>
      <MainMenu />
      <Wrapper>
        <Title>{diplomaTitle}</Title>
        <InputBlock />
        {/* <ChooseDecision /> */}
        <Statistic />
      </Wrapper>
    </CommonWrapper>
  )
}

export default StartPage

const CommonWrapper = styled.div`
  display: flex;
`
const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 60px 450px;
`

const Title = styled.div`
  grid-column-end: 3;
  grid-column-start: 1;
  padding: 7px;
  height: 6vh;
  background-color: #fff;

  font-size: 22px;
  text-align: center;
  color: #000;
  border: 1px solid #e8e8e8;
`

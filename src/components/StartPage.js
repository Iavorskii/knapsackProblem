import React from 'react'
import styled from 'styled-components'
import InputBlock from '../containers/InputBlock'
import ChooseDecision from '../containers/DecisionBlock/ChooseDecision'
import Statistic from '../containers/Statistic'
import { courseTitle } from '../constants'

const StartPage = () => {
  return (
    <Wrapper>
      <Title>{courseTitle}</Title>
      <InputBlock />
      <ChooseDecision />
      <StatisticWrapper>
        <StatisticTitle>Статистическая информация</StatisticTitle>
        <Statistic />
      </StatisticWrapper>
    </Wrapper>
  )
}

export default StartPage

const Wrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 60px 550px 550px;
  padding: 0px 30px;
  margin: 30px auto;

  font-family: Raleway-Bold;
  background-color: #c5cae9;
  border-radius: 5px;
`

const Title = styled.div`
  grid-column-end: 3;
  grid-column-start: 1;
  padding: 12px;
  background-color: #fff;
  height: max-content;

  font-size: 21px;
  text-align: center;
  color: #000;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);
  // @media (max-width: 1368px) {
  //   font-size: 21px;
  // }
`
const StatisticWrapper = styled.div`
  grid-row-start: 2;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);
`
const StatisticTitle = styled.div`
  text-align: center;
  font-size: 21px;
  color: black;
  margin-top: 50px;
`

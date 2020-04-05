import React from 'react'
import styled from 'styled-components'
import InputBlock from '../containers/InputBlock'
import ChooseDecision from '../containers/DecisionBlock/ChooseDecision'
import Statistic from '../containers/Statistic'
// Реализация точного алгоритма решения задачи о рюкзаке с помощью метода динамического
// программирования
// Решение задачи о рюкзаке приближенными и точными методами
const StartPage = () => {
  return (
    <Wrapper>
      <Title>
        Реализация точного алгоритма решения задачи о рюкзаке с помощью метода динамического
        программирования
      </Title>
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
  padding: 0px 30px;
  font-family: Raleway-Bold;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 60px 50% 60%;
  // grid-auto-rows: 100px;
  margin: 50px auto;
  height: 1000px;
  background-color: #c5cae9;
  border-radius: 5px;
`

const Title = styled.div`
  grid-column-end: 3;
  grid-column-start: 1;
  padding: 12px;
  background-color: #fff;

  font-size: 24px;
  text-align: center;
  color: #000;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);
`
const StatisticWrapper = styled.div`
  grid-row-start: 2;
  background-color: #fff;
  height: 600px;

  border-radius: 10px;
  margin-left: 30px;
  margin-top: 20px;
  box-shadow: 2px 2px 3px rgba(0.4, 0, 0, 0.12), 0 1px 2px rgba(0.4, 0.4, 0.4, 01);
`
const StatisticTitle = styled.div`
  text-align: center;
  font-size: 24px;
  color: black;
  margin-top: 50px;
`

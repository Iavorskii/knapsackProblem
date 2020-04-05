import React from 'react'
import { useRoutes, useRedirect, usePath } from 'hookrouter'
import { Result } from 'antd'
import StartPage from '../components/StartPage'

const routes = {
  '/knapsackProblem': () => <StartPage />,
}

const Routes = () => {
  const routeResult = useRoutes(routes)
  useRedirect('/', '/knapsackProblem')
  const path = usePath()
  return (
    <>
      {(routeResult &&
        (path.includes('/knapsackProblem') ? <StartPage /> : [<div />, routeResult])) || (
        <Result status='404' title='404' subTitle='Страница не найдена' />
      )}
    </>
  )
}

export default Routes

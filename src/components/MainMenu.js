import React from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import { menuItems } from '../constants'

const MainMenu = () => {
  return (
    <MenuWrapper>
      <StyledMenu mode='inline' theme='dark' defaultSelectedKeys={['1']}>
        {menuItems.map(item => (
          <Menu.Item key={item.key}>{item.title}</Menu.Item>
        ))}
      </StyledMenu>
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  grid-gap: 0px;
  height: 100vh;
  .ant-menu-dark {
    height: 100vh;
  }
`
const StyledMenu = styled(Menu)`
  .ant-menu-dark {
    height: 100vh;
  }
`

export default MainMenu

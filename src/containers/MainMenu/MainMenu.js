import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu } from 'antd'
import { menuItems } from '../../constants'

const MainMenu = ({ currentDecisionMethod, setCurrentDecisionMethod, setNeedDecide }) => {
  MainMenu.propTypes = {
    currentDecisionMethod: PropTypes.string,
    setCurrentDecisionMethod: PropTypes.func,
    setNeedDecide: PropTypes.func,
  }

  const onSelectMenuItem = item => {
    setNeedDecide({ isNeedDecide: false })
    setCurrentDecisionMethod({ currentDecisionMethod: item.key })
  }

  return (
    <MenuWrapper>
      <StyledMenu
        mode='inline'
        theme='dark'
        defaultSelectedKeys={[currentDecisionMethod]}
        onSelect={item => onSelectMenuItem(item)}
      >
        {menuItems.map((item, index) => (
          <StyledMenuItem key={item.key} isFirstItem={index === 0}>
            {item.title}
          </StyledMenuItem>
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
const StyledMenuItem = styled(Menu.Item)`
  .ant-menu-item {
    padding-top: ${props => (props.isFirstItem ? 20 : 150)}px; // TODO
  }
`

export default MainMenu

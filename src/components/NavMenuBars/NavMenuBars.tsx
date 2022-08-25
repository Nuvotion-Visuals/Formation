import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../internal'

interface Props {
  onClick: () => void
}

export const NavMenuBars = ({ onClick }: Props) => {
  return (
    <S_NavMenuBars onClick={onClick}>
      <Icon icon='bars' iconPrefix='fas' />
    </S_NavMenuBars>
  )
}

const S_NavMenuBars = styled.div`
  width: var(--F_Sidebar_Icon_Width);
  height: var(--F_Header_Height);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
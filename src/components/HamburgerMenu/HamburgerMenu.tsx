import React from 'react'
import styled from 'styled-components'

import { Icon } from '../Icon/Icon'

interface Props {
  onClick: () => void
}

export const HamburgerMenu = ({ onClick }: Props) => {
  return (
    <S_HamburgerMenu onClick={onClick}>
      <Icon icon='bars' iconPrefix='fas' />
    </S_HamburgerMenu>
  )
}

const S_HamburgerMenu = styled.div`
  width: var(--Header_Height);
  height: var(--Header_Height);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
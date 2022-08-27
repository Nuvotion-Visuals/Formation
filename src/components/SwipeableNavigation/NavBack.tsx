import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../internal'

interface Props {
  onClick: () => void
}

export const NavBack = ({
  onClick
}: Props) => {
  return (<S.NavBack onClick={onClick}>
    <Icon icon='chevron-left' iconPrefix='fas' size='lg'/>
  </S.NavBack>)
}

const S = {
  NavBack: styled.button`
    width: var(--F_Input_Height);
    height: var(--F_Input_Height);
    border-radius: 50%;
    background: var(--F_Surface);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    &:hover {
      background: var(--F_Surface_1);
    }
  `
}
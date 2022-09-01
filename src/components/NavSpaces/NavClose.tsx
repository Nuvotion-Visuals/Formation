import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../internal'

interface Props {
  onClick?: () => void,
  small?: boolean
}

export const NavClose = ({
  onClick,
  small
}: Props) => {
  return (<S.NavClose onClick={onClick} small={small}>
    <Icon icon='times' iconPrefix='fas' size='lg'/>
  </S.NavClose>)
}

const S = {
  NavClose: styled.button<{
    small?: boolean
  }>`
    width: var(--F_Input_Height);
    height: var(--F_Input_Height);
    border-radius: 50%;
    background: var(--F_Surface);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transform: ${props => props.small ? 'scale(0.75)' : 'none'};
    * {
      color: var(--F_Font_Color);
    }
    &:hover {
      background: var(--F_Surface_1);
    }
  `
}
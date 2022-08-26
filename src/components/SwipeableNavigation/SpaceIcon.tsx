import React from 'react'
import styled from 'styled-components'

interface Props {

}

export const SpaceIcon = ({ }: Props) => {
  return (
    <S.SpaceIcon>
      
    </S.SpaceIcon>
  )
}

const S = {
  SpaceIcon: styled.div<{
    active?: boolean
  }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 60px;
    background-size: cover;
    background-position: center;
    box-shadow: ${props => props.active ? 'none' : 'var(--F_Outline)'};
    overflow: hidden;
    align-items: start;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: var(--F_Surface);
    }
  `
}

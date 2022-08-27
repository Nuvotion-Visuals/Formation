import React from 'react'
import styled from 'styled-components'

interface Props {
  src?: string,
  onClick: () => void
}

export const SpaceIcon = ({ src, onClick }: Props) => {
  return (
    <S.SpaceIcon 
      src={src}
      onClick={onClick}
    >
      
    </S.SpaceIcon>
  )
}

const S = {
  SpaceIcon: styled.div<{
    active?: boolean,
    src?: string
  }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
    box-shadow: ${props => props.active ? 'none' : 'var(--F_Outline)'};
    overflow: hidden;
    align-items: start;
    border-radius: 8px;
    cursor: pointer;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `
}

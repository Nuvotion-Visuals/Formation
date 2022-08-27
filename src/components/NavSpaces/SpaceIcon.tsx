import React from 'react'
import styled from 'styled-components'

interface Props {
  src?: string,
  onClick?: () => void,
  date?: Date,
  small?: boolean
}

export const SpaceIcon = ({ 
  src, 
  onClick,
  date,
  small
}: Props) => {
  return (
    <S.SpaceIcon 
      src={src}
      onClick={onClick}
      small={small}
    >
      {
        date
          ? <S.Date>
              <S.Month>{ date.toLocaleString('en-us', { month: 'short' }).toUpperCase() }</S.Month>
              <S.Day>{ date.toLocaleString('en-us', { day: 'numeric' }) }</S.Day>
            </S.Date>
          : null
      }
      
    </S.SpaceIcon>
  )
}

const S = {
  SpaceIcon: styled.div<{
    active?: boolean,
    src?: string,
    small?: boolean,
  }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    background-size: cover;
    background-position: center;
    /* transform-origin: 0 0; */
    transform: ${props => props.small ? 'scale(0.75)' : 'none'};
    /* box-shadow: ${props => props.active ? 'none' : 'var(--F_Outline)'}; */
    overflow: hidden;
    align-items: start;
    border-radius: 8px;
    cursor: pointer;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `,
  Date: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    color: white;
    background: var(--F_Backdrop);
  `,
  Month: styled.div`
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    text-align: center;
  `,
  Day: styled.div`
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin-top: -0.875rem;
  `
}

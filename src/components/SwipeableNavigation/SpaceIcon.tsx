import React from 'react'
import styled from 'styled-components'

interface Props {
  src?: string,
  onClick: () => void,
  date?: Date
}

export const SpaceIcon = ({ 
  src, 
  onClick,
  date
}: Props) => {
  return (
    <S.SpaceIcon 
      src={src}
      onClick={onClick}
    >
      {
        date
          ? <S.Date>
              <S.Month>{ date.toLocaleString('en-us', { month: 'short' }).toUpperCase() }</S.Month>
              <S.Day>{ date.getDay() }</S.Day>
            </S.Date>
          : null
      }
      
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

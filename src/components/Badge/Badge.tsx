import styled, { css, keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'

export type Color = 'red' | 'pink' | 'purple' | 'darkpurple' | 'indigo' | 'blue' | 'lightblue' | 'cyan' | 'teal' | 'orange'


const getBadgeColor = (color: string | undefined): string => {
  switch(color) {
    case 'red':
      return 'var(--F_Label_Background_Red)'
    case 'pink':
      return 'var(--F_Label_Background_Pink)'
    case 'purple':
      return 'var(--F_Label_Background_Purple)'
    case 'darkpurple':
      return 'var(--F_Label_Background_Dark_Purple)'
    case 'indigo':
      return 'var(--F_Label_Background_Indigo)'
    case 'blue':
      return 'var(--F_Label_Background_Blue)'
    case 'lightblue':
      return 'var(--F_Label_Background_Light_Blue)'
    case 'cyan':
      return 'var(--F_Label_Background_Cyan)'
    case 'teal':
      return 'var(--F_Label_Background_Teal)'
    case 'orange':
      return 'var(--F_Label_Background_Orange)'
    default:
      return 'var(--F_Label_Background_Gray)'
  }
}

interface Props {
  colorString: Color,
  count: number,
  children: React.ReactNode
}

export const Badge = ({ colorString, count, children }: Props) => {
  
  const [badgeColor, setBadgeColor] = useState<string>('')
  const [isInvisible, setIsInvisible] = useState<boolean>(true)

  useEffect(() => {
    setBadgeColor(getBadgeColor(colorString))
  }, [colorString])

  useEffect(() => {
    count === 0 ? setIsInvisible(true) : setIsInvisible(false)
  }, [count])
    
  return (
    <S.Container>
      { 
        children 
      }
      <S.Badge color={badgeColor} invisible={isInvisible}>
        <S.Text>
          {
            count !== undefined && count < 100
              ? count 
              : '99+'
          }
        </S.Text>
      </S.Badge>
    </S.Container>
  )
}

const shrinkBadge = keyframes`
  0% {
    opacity: 100%;
    transform: scale(1);
  }

  100% {
    opacity: 0%;
    transform: scale(0);
  }
`

const expandBadge = keyframes`
  0% {
    opacity: 0%;
    transform: scale(0)
  }

  100% {
    opacity: 100%;
    transform: scale(1)
  }
`

const S = {
  Container: styled.div`
    position: relative;
    max-width: fit-content;
  `,
  Badge: styled.div<{
    invisible: boolean,
  }>`
    position: absolute;
    top: -.5rem;
    right: -.65rem;
    width: 1.125rem;
    height: 1.125rem;
    background: ${props => props.color};
    font-size: 10px;
    border-radius: 50%;
    pointer-events: none;
    animation: ${props => props.invisible
      ? css`${shrinkBadge} .25s forwards`
      : css`${expandBadge} .25s forwards`
    };
  `,
  Text: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white !important;
  `
}
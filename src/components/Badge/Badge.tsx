import styled, { css, keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'

import { Icon } from '../../internal'

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
  content: number,
  children: JSX.Element
}

interface BadgeProps {
  invisible: boolean,
}

export const Badge = ({ colorString, content, children }: Props) => {
  
  const [badgeColor, setBadgeColor] = useState<string>('')
  const [isInvisible, setIsInvisible] = useState<boolean>(true)

  useEffect(() => {
    setBadgeColor(getBadgeColor(colorString))
  }, [colorString])

  useEffect(() => {
    if (content !== undefined) {
      content === 0 ? setIsInvisible(true) : setIsInvisible(false)
    }
  }, [content])
    
  return (
    <S.Parent >
      { children }
      <Icon
        icon='envelope'  
        iconPrefix='fas'
      />
      <S.Badge color={badgeColor} invisible={isInvisible}>
        <S.Span>
          {
            content < 100
              ? content 
              : '+99'
          }
        </S.Span>
      </S.Badge>
    </S.Parent>
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
  Parent: styled.div`
    position: relative;
    width: 1.5rem;
    padding-top: 0.45rem;
  `,
  Badge: styled.div<BadgeProps>`
    position: absolute;
    top: 0;
    right: 0;
    width: 0.85rem;
    height: 0.85rem;
    background: ${props => props.color};
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${props => props.invisible
                            ? css`${shrinkBadge} .25s forwards`
                            : css`${expandBadge} .25s forwards`};
  `,
  Span: styled.div`
    padding-top: 1px;
    font-size: 0.4rem;
    font-weight: 800;
  `
}
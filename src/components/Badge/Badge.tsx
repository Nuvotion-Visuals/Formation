import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import { Icon } from '../../internal'


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
  colorString?: string,
  content?: string
}

export const Badge = ({ colorString, content }: Props) => {
  
  const [badgeColor, setBadgeColor] = useState<string>('')

  useEffect(() => {
    setBadgeColor(getBadgeColor(colorString))
  }, [colorString])

  return (
    <S.Parent>
      <Icon
        icon='envelope' 
        iconPrefix='fas'
      />
      <S.Badge color={badgeColor}>
        <S.Span>{content}</S.Span>
      </S.Badge>
    </S.Parent>
  )
}

const S = {
  Parent: styled.div`
    position: relative;
    width: 1.5rem;
    padding-top: 0.45rem;
  `,
  Badge: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 0.75rem;
    height: 0.75rem;
    background: ${props => props.color};
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Span: styled.div`
    padding-top: 1px;
    font-size: 0.4rem;
    font-weight: 800;
  `
}
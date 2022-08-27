import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export type Color = 'red' | 'pink' | 'purple' | 'darkpurple' | 'indigo' | 'blue' | 'lightblue' | 'cyan' | 'teal' | 'orange'

const getBackground = (color: string) => {
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

const getOutline = (color: string) => {
  switch(color) {
    case 'red':
      return 'var(--F_Label_Outline_Red)'
    case 'pink':
      return 'var(--F_Label_Outline_Pink)'
    case 'purple':
      return 'var(--F_Label_Outline_Purple)'
    case 'darkpurple':
      return 'var(--F_Label_Outline_Dark_Purple)'
    case 'indigo':
      return 'var(--F_Label_Outline_Indigo)'
    case 'blue':
      return 'var(--F_Label_Outline_Blue)'
    case 'lightblue':
      return 'var(--F_Label_Outline_Light_Blue)'
    case 'cyan':
      return 'var(--F_Label_Outline_Cyan)'
    case 'teal':
      return 'var(--F_Label_Outline_Teal)'
    case 'orange':
      return 'var(--F_Label_Outline_Orange)'
    default:
      return 'var(--F_Label_Outline_Gray)'
  }
}

interface Props {
  label: string,
  color: Color
}

export const Label = ({ 
  label,
  color
}: Props) => {

  const [background, setBackground] = useState<string>('gray')
  const [outline, setOutline] = useState<string>('gray')

  useEffect(() => {

    setBackground(getBackground(color))
    setOutline(getOutline(color))

  }, [color])


  return (
    <S.Label background={background} outline={outline}>
      {
        label
      }
    </S.Label>
  )
}

const S = {
  Label: styled.div<{
    background: string,
    outline: string
  }>`
    padding: .125rem .5rem;
    border-radius: 16px;
    font-size: var(--F_Font_Size_Label);
    margin-left: .5rem;
    background: ${props => props.background};
    box-shadow: ${props => `inset 0 0 0 1px ${props.outline}`};
    color: white;
    width: fit-content;
  `
}
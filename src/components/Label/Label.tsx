import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export type Color = 'red' | 'pink' | 'purple' | 'darkpurple' | 'indigo' | 'blue' | 'lightblue' | 'cyan' | 'teal' | 'orange'

import { getOutline, getBackground } from '../../internal'

interface Props {
  label: string,
  color: Color,
  title?: string
}

export const Label = ({ 
  label,
  color,
  title
}: Props) => {

  const [background, setBackground] = useState<string>('gray')
  const [outline, setOutline] = useState<string>('gray')

  useEffect(() => {

    setBackground(getBackground(color))
    setOutline(getOutline(color))

  }, [color])


  return (
    <S.Label background={background} outline={outline} title={title}>
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
    background: ${props => props.background};
    box-shadow: ${props => `inset 0 0 0 1px ${props.outline}`};
    color: white;
    width: fit-content;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 1.125rem;
  `
}
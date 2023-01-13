import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getLabelColor, getLabelOutlineColor } from '../../internal'
import { ColorType } from '../../types' 

interface Props {
  label: string,
  color: ColorType,
  title?: string
}

export const Label = ({ 
  label,
  color,
  title
}: Props) => {

  const [background, setBackground] = useState<string>('blue')
  const [outline, setOutline] = useState<string>('blue')

  useEffect(() => {

    setBackground(getLabelColor(color))
    setOutline(getLabelOutlineColor(color))

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
    padding: .25rem .5rem;
    border-radius: 16px;
    font-size: var(--F_Font_Size_Label);
    background: ${props => props.background ? props.background : 'var(--F_Label_Background_Gray)'};
    color: white;
    width: fit-content;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  `
}
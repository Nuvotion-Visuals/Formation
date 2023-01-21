import React from 'react'
import styled from 'styled-components'

import { getLabelColor } from '../../internal'
import { ColorType } from '../../types'

interface Props {
  color: ColorType,
  ref: any,
  onClick: () => void
}

export const LabelColor = ({ color, onClick }: Props) => {
  return (<S.LabelColor
    onClick={onClick}
    color={getLabelColor(color)}
  >
    
  </S.LabelColor>)
}

const S = {
  LabelColor: styled.div<{
    color: any
  }>`
    width: 1rem;
    height: 1rem;
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    background: ${props => props.color};
    cursor: pointer;
    border-radius: 50%;
  `,
}
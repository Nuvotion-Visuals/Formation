import React from 'react'
import styled from 'styled-components'

import { getLabelColor, getLabelOutlineColor } from '../../internal'
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
    outline={getLabelOutlineColor(color)}
  >
    
  </S.LabelColor>)
}

const S = {
  LabelColor: styled.div<{
    color: any
    outline: any
  }>`
    width: 1rem;
    height: 1rem;
    /* width: 100%; */
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    background: ${props => props.color};
    cursor: pointer;
    border-radius: 50%;
    border : ${props => ` 2px solid ${props.outline}`};
  `,
}
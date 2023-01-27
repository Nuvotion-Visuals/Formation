import React from 'react'
import styled from 'styled-components'

import { getLabelColor, LabelColor as LabelColorType } from '../../internal'

interface Props {
  labelColor: LabelColorType,
  ref: any,
  onClick: () => void
}

export const LabelColorCircle = (props: Props) => {
  return (<S.LabelColor
    onClick={props.onClick}
    ref={props.ref}
    labelColor={props.labelColor}
  >
    
  </S.LabelColor>)
}

const S = {
  LabelColor: styled.div<Props>`
    width: 1rem;
    height: 1rem;
    color: var(--F_Font_Color);
    font-size: var(--F_Font_Size);
    background: ${props => getLabelColor(props.labelColor)};
    cursor: pointer;
    border-radius: 50%;
  `,
}
import React from 'react'
import styled from 'styled-components'

import { getLabelColor, LabelColor } from '../../internal'

interface Props {
  label: string,
  labelColor: LabelColor,
  title?: string,
  onClick?: () => void
}

export const Label = (props: Props) => {
  return (
    <S.Label {...props}>
      {
        props.label
      }
    </S.Label>
  )
}

const S = {
  Label: styled.div<Props>`
    padding: .25rem .5rem;
    border-radius: 16px;
    font-size: var(--F_Font_Size_Label);
    background-color: ${props => getLabelColor(props.labelColor)};
    color: white;
    width: fit-content;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  `
}
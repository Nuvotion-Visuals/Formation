import React from 'react'
import styled from 'styled-components'

import { getLabelColor, LabelColor } from '../../internal'

interface Props {
  label: string,
  labelColor: LabelColor,
  title?: string,
  onClick?: (e: React.MouseEvent) => void
}

/**
 * `Label` is a component that displays a text label with a colored background. The color of the label can be customized through predefined color options. The component can be clicked, making it interactive if an `onClick` handler is provided.
 *
 * @component
 * @param {string} label - The text content of the label.
 * @param {LabelColor} labelColor - The predefined color key for the label's background color.
 * @param {string} [title] - An optional tooltip text that appears on hover over the label.
 * @param {function} [onClick] - An optional click handler that will be invoked when the label is clicked.
 *
 * @example
 * // Label with click handler and custom color
 * <Label 
 *   label="Click Me" 
 *   labelColor="red" 
 *   onClick={(e) => console.log('Label clicked!')}
 * />
 */
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
import React from 'react'
import styled from 'styled-components'

interface Props {
  light?: boolean,
  color?: string
}

/**
 * `LineBreak` is a simple component that renders a horizontal line, often used as a visual separator between sections of content.
 * It can be styled to be lighter or darker depending on the `light` prop.
 *
 * @component
 * @param {boolean} [light=false] - If true, the line break will have a lighter color, suitable for subtle separation.
 * @param {string} [color] - If provided, the line break will be of the supplied color.
 *
 * @example
 * // Default darker line break
 * <LineBreak />
 *
 * @example
 * // Lighter line break for subtle separation
 * <LineBreak light />
 */
export const LineBreak = React.memo(({ light, color } : Props) => <S.Break light={light} color={color} />)

const S = {
  Break: React.memo(styled.div<Props>`
    width: 100%;
    display: flex;
    border-bottom: ${props => 
      props.color
        ? `1px solid ${props.color}` 
        : props.light 
          ? '1px solid var(--F_Surface_0)' 
          : '1px solid var(--F_Surface)'
    };
  `)
}

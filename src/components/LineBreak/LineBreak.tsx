import React from 'react'
import styled from 'styled-components'

interface Props {
  light?: boolean
}

/**
 * `LineBreak` is a simple component that renders a horizontal line, often used as a visual separator between sections of content.
 * It can be styled to be lighter or darker depending on the `light` prop.
 *
 * @component
 * @param {boolean} [light=false] - If true, the line break will have a lighter color, suitable for subtle separation.
 *
 * @example
 * // Default darker line break
 * <LineBreak />
 *
 * @example
 * // Lighter line break for subtle separation
 * <LineBreak light />
 */
export const LineBreak = React.memo(({ light } : Props) => <S.Break light={light}/>)

const S = {
  Break: React.memo(styled.div<Props>`
    width: 100%;
    display: flex;
    border-bottom: ${props => props.light ? '1px solid var(--F_Surface_0)' : '1px solid var(--F_Surface)'};
  `)
}

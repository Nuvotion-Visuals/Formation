import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode,
  maxWidth: number,
  fit?: boolean,
  gap?: number | string
}

/**
 * `Grid` is a container that arranges its children in a grid layout. The grid can be configured to fit the content or fill the available space, and allows for a customizable gap between grid items. The maximum width for each grid item can also be specified.
 *
 * @component
 * @param {React.ReactNode} children - The content to be laid out in grid format.
 * @param {number} maxWidth - The maximum width for each grid item, specified as a number which translates to 'rem' units.
 * @param {boolean} [fit] - If true, the grid items are sized to fit the content. If false, the grid items fill the available horizontal space.
 * @param {number|string} [gap] - The size of the gap between grid items, either as a number (interpreted in 'rem') or a CSS unit string.
 *
 * @example
 * // Grid with a max width for items and a specified gap
 * <Grid maxWidth={10} gap="1rem">
 *   <ItemOne />
 *   <ItemTwo />
 *   <ItemThree />
 * </Grid>
 *
 * @example
 * // Grid where items fit the content with no stretching
 * <Grid maxWidth={10} fit>
 *   <ItemOne />
 *   <ItemTwo />
 *   <ItemThree />
 * </Grid>
 */

export const Grid = React.memo(({ 
  children, 
  maxWidth, 
  fit, 
  gap 
}: Props) => {
  return (
    <S.Grid 
      maxWidth={maxWidth} 
      fit={fit} 
      gap={gap}
    >
      {
        children
      }
    </S.Grid>
  )
})

const S = {
  Grid: styled.div<Props>`
    width: 100%;
    display: grid;
    flex-shrink: 0;
    grid-template-columns: ${props => 
      `repeat(auto-${ props.fit ? 'fit' : 'fill' }, minmax(${ props.maxWidth }rem, 1fr))`
    };
    grid-gap: ${props => 
      props.gap 
        ? typeof props.gap === 'string' 
          ? props.gap 
          : `${props.gap}rem`
        : '.5rem'
    };
  `
}
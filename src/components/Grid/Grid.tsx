import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode,
  maxWidth: number,
  fit?: boolean,
  gap?: number | string
}

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
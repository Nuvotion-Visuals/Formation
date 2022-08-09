import React from 'react'
import styled from 'styled-components'

interface Props {
  children: (JSX.Element | null)[] | null | JSX.Element,
  autoWidth?: boolean,
  disableWrap?: boolean,
  gap?: number | string
}

export const Gap = React.memo(({ 
  children, 
  autoWidth, 
  disableWrap,
  gap 
}: Props) => 
  <S.Gap 
    autoWidth={autoWidth} 
    disableWrap={disableWrap}
    gap={gap}
  >
    { 
      children 
    }
  </S.Gap>
)

interface GapProps {
  autoWidth?: boolean,
  disableWrap?: boolean,
  gap?: number | string
}

const S = {
  Gap: styled.div<GapProps>`
    width: ${props => props.autoWidth ? 'auto' : '100%'};
    display: flex;
    align-items: center;
    flex-wrap: ${props => props.disableWrap ? 'none' : 'wrap'};
    justify-content: center;
    gap: 8px;
    gap: ${props => props.gap ? 'none' : 'flex'};
    gap: ${props => 
      props.gap 
        ? typeof props.gap === 'string' 
          ? props.gap 
          : `${props.gap}rem`
        : '.5rem'
    };
  `
}


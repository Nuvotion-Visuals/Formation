import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  m?: number,
  mb?: number,
  mt?: number,
  mr?: number,
  ml?: number,
  mx?: number,
  my?: number,
  p?: number,
  pb?: number,
  pt?: number,
  pr?: number,
  pl?: number,
  px?: number,
  py?: number,
  children?: any,
  width?: number | string,
  wrap?: boolean,
  height?: number | string,
  alignLeft?: boolean,
  gap?: number
}

export const Box: FC<Props> = React.memo((props : Props) => <S.Box { ...props }>
  {
    props.children
  }
</S.Box>)

const S = {
  Box: styled.div<Props>`
    flex-wrap: ${props => props.wrap ? 'wrap' : 'none'};
    display: flex;
    gap: ${props => props.gap ? `${props.gap}rem` : '0'};
    justify-content: ${props => props.alignLeft ? 'auto' : 'center'};
    align-items: center;
    margin: ${props => {
      if (props?.m) {
        return `${props.m}rem`
      }
      if (props?.my) {
        return `${props.my}rem 0`
      }
      if (props?.mx) {
        return `0 ${props.mx}rem`
      }
      return `${props?.mt ? `${props.mt}rem` : '0'} ${props?.mr ? `${props.mr}rem` : '0'} ${props?.mb ? `${props.mb}rem` : '0'} ${props?.ml ? `${props?.ml}rem` : '0'}`
    }};
    padding: ${props => {
      if (props?.p) {
        return `${props.p}rem`
      }
      if (props?.py) {
        return `${props.py}rem 0`
      }
      if (props?.px) {
        return `0 ${props.px}rem`
      }
      return `${props?.pt ? `${props.pt}rem` : '0'} ${props.pr ? `${props.pr}rem` : '0'} ${props.pb ? `${props.pb}rem` : '0'} ${props.pl ? `${props.pl}rem` : '0'}`
    }};
    width: ${props => typeof props.width === 'string' ? props.width : `${props.width}rem`};
    height: ${props => typeof props.height === 'string' ? props.height : `${props.height}rem`};
  `
}
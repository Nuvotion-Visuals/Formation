import React from 'react'
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
  children?: React.ReactNode,
  width?: number | string,
  maxWidth?: number | string,
  minWidth?: number | string,
  height?: number | string,
  maxHeight?: number | string,
  minHeight?: number | string,
  hide?: boolean,
  wrap?: boolean,
}

export const Box = React.memo((props : Props) => {
  return (
    <S.Box { ...props }>
      {
        props.children
      }
    </S.Box>
  )
})

const calculateMargin = (props : Props) => {
  if (props.m) {
    return `${props.m}rem`
  }
  if (props.my) {
    return `${props.my}rem 0`
  }
  if (props.mx) {
    return `0 ${props.mx}rem`
  }
  return `${props.mt ? `${props.mt}rem` : '0'} ${props.mr ? `${props.mr}rem` : '0'} ${props.mb ? `${props.mb}rem` : '0'} ${props.ml ? `${props.ml}rem` : '0'}`
}

const calculatePadding = (props : Props) => {
  if (props.p) {
    return `${props.p}rem`
  }
  if (props.py) {
    return `${props.py}rem 0`
  }
  if (props.px) {
    return `0 ${props.px}rem`
  }
  return `${props.pt ? `${props.pt}rem` : '0'} ${props.pr ? `${props.pr}rem` : '0'} ${props.pb ? `${props.pb}rem` : '0'} ${props.pl ? `${props.pl}rem` : '0'}`
}

const S = {
  Box: styled.div<Props>`
    display: ${props => props.hide ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    margin: ${props => calculateMargin(props)};
    padding: ${props => calculatePadding(props)};
    width: ${props => typeof props.width === 'string' ? props.width : `${props.width}rem`};
    max-width: ${props => typeof props.maxWidth === 'string' ? props.maxWidth : `${props.maxWidth}rem`};
    min-width: ${props => typeof props.minWidth === 'string' ? props.minWidth : `${props.minWidth}rem`};
    height: ${props => typeof props.height === 'string' ? props.height : `${props.height}rem`};
    max-height: ${props => typeof props.maxHeight === 'string' ? props.maxHeight : `${props.maxHeight}rem`};
    min-height: ${props => typeof props.minHeight === 'string' ? props.minHeight : `${props.minHeight}rem`};
    flex-wrap: ${props => props.wrap ? 'wrap' : 'auto'};
    position: relative;
  `
}

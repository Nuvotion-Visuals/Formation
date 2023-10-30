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
  expand?: boolean,
  expandVertical?: boolean,
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
  let mt = props.mt ?? props.my ?? props.m ?? 0
  let mr = props.mr ?? props.mx ?? props.m ?? 0
  let mb = props.mb ?? props.my ?? props.m ?? 0
  let ml = props.ml ?? props.mx ?? props.m ?? 0

  return `${mt}rem ${mr}rem ${mb}rem ${ml}rem`
}

const calculatePadding = (props : Props) => {
  let pt = props.pt ?? props.py ?? props.p ?? 0
  let pr = props.pr ?? props.px ?? props.p ?? 0
  let pb = props.pb ?? props.py ?? props.p ?? 0
  let pl = props.pl ?? props.px ?? props.p ?? 0

  return `${pt}rem ${pr}rem ${pb}rem ${pl}rem`
}

const S = {
  Box: React.memo(styled.div<Props>`
    display: ${props => props.hide ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    margin: ${props => calculateMargin(props)};
    padding: ${props => calculatePadding(props)};
    width: ${props => props.expand ? `calc(100% - ${calculatePadding(props)})` : (typeof props.width === 'string' ? props.width : `${props.width}rem`)};
    max-width: ${props => typeof props.maxWidth === 'string' ? props.maxWidth : `${props.maxWidth}rem`};
    min-width: ${props => typeof props.minWidth === 'string' ? props.minWidth : `${props.minWidth}rem`};
    height: ${props => props.expandVertical ? `calc(100% - ${calculatePadding(props)})` : (typeof props.height === 'string' ? props.height : `${props.height}rem`)};
    max-height: ${props => typeof props.maxHeight === 'string' ? props.maxHeight : `${props.maxHeight}rem`};
    min-height: ${props => typeof props.minHeight === 'string' ? props.minHeight : `${props.minHeight}rem`};
    flex-wrap: ${props => props.wrap ? 'wrap' : 'auto'};
  `)
}

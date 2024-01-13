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
  tag?: keyof JSX.IntrinsicElements
}

/**
 * `Box` is a highly customizable container component that provides a way to apply spacing,
 * sizing, and flexibility to its children. It supports margins, padding, width, height, and visibility
 * properties, along with the ability to expand to fill its container's width and/or height.
 *
 * @component
 * @param {number} [m] - Margin on all sides (in rem).
 * @param {number} [mb] - Margin bottom (in rem).
 * @param {number} [mt] - Margin top (in rem).
 * @param {number} [mr] - Margin right (in rem).
 * @param {number} [ml] - Margin left (in rem).
 * @param {number} [mx] - Horizontal margin (applied to both left and right) (in rem).
 * @param {number} [my] - Vertical margin (applied to both top and bottom) (in rem).
 * @param {number} [p] - Padding on all sides (in rem).
 * @param {number} [pb] - Padding bottom (in rem).
 * @param {number} [pt] - Padding top (in rem).
 * @param {number} [pr] - Padding right (in rem).
 * @param {number} [pl] - Padding left (in rem).
 * @param {number} [px] - Horizontal padding (applied to both left and right) (in rem).
 * @param {number} [py] - Vertical padding (applied to both top and bottom) (in rem).
 * @param {React.ReactNode} [children] - The content to be rendered inside the Box.
 * @param {number|string} [width] - The width of the Box (in rem or any CSS unit).
 * @param {number|string} [maxWidth] - The maximum width of the Box (in rem or any CSS unit).
 * @param {number|string} [minWidth] - The minimum width of the Box (in rem or any CSS unit).
 * @param {number|string} [height] - The height of the Box (in rem or any CSS unit).
 * @param {number|string} [maxHeight] - The maximum height of the Box (in rem or any CSS unit).
 * @param {number|string} [minHeight] - The minimum height of the Box (in rem or any CSS unit).
 * @param {boolean} [hide] - If true, the Box will not be displayed.
 * @param {boolean} [wrap] - If true, allows the children to wrap within the Box.
 * @param {boolean} [expand] - If true, the Box will expand to fill the width of its container, minus any defined padding.
 * @param {boolean} [expandVertical] - If true, the Box will expand to fill the height of its container, minus any defined padding.
 * @param {keyof JSX.IntrinsicElements} [tag='div'] - The HTML tag type to be used for the Box container, enhancing flexibility for semantic HTML structure.
 *
 * @example
 * // Box with specific padding and margins, containing text
 * <Box p={2} mt={1} mb={1}>
 *   Sample text inside the box.
 * </Box>
 */
export const Box = React.memo(({ tag = 'div', wrap, ...restProps }: Props) => (
  <S.Box as={tag} wrap={wrap} {...restProps}>
    {restProps.children}
  </S.Box>
))

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

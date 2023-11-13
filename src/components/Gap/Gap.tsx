import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode,
  autoWidth?: boolean,
  disableWrap?: boolean,
  gap?: number | string,
  center?: boolean
}

/**
 * `Gap` is a layout component that creates spacing between its child elements. It can be configured for automatic width, wrapping behavior, gap size, and center alignment. This component simplifies creating consistent spacing within a flex container.
 *
 * @component
 * @param {React.ReactNode} children - The content to be displayed within the gap container.
 * @param {boolean} [autoWidth] - If true, the container width is set to 'auto', otherwise it takes the full width.
 * @param {boolean} [disableWrap] - If true, disables wrapping of child elements, otherwise children will wrap to the next line.
 * @param {number|string} [gap] - The size of the gap between child elements, either as a number (in rem) or a string with any CSS unit.
 * @param {boolean} [center] - If true, the child elements are centered within the container, otherwise they align to the left.
 *
 * @example
 * // Gap with automatic width and custom gap size
 * <Gap autoWidth gap="1.5rem">
 *   <ComponentOne />
 *   <ComponentTwo />
 * </Gap>
 *
 * @example
 * // Centered Gap with wrapping disabled
 * <Gap center disableWrap>
 *   <ComponentOne />
 *   <ComponentTwo />
 * </Gap>
 */

export const Gap = React.memo(({ 
  children, 
  autoWidth, 
  disableWrap,
  gap,
  center
}: Props) => 
  <S.Gap 
    autoWidth={autoWidth} 
    disableWrap={disableWrap}
    gap={gap}
    center={center}
  >
    { 
      children 
    }
  </S.Gap>
)

interface GapProps {
  autoWidth?: boolean,
  disableWrap?: boolean,
  gap?: number | string,
  center?: boolean
}

const S = {
  Gap: React.memo(styled.div<GapProps>`
    width: ${props => props.autoWidth ? 'auto' : '100%'};
    display: flex;
    align-items: center;
    justify-content: ${props => props.center ? 'center' : 'left'};
    flex-wrap: ${props => props.disableWrap ? 'none' : 'wrap'};
    gap: 8px;
    gap: ${props => 
      props.gap 
        ? typeof props.gap === 'string' 
          ? props.gap 
          : `${props.gap}rem`
        : '.5rem'
    };
  `)
}


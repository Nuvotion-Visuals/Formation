import styled, { css, keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'

import { getLabelColor, LabelColor } from '../../internal'

interface Props {
  labelColor: LabelColor,
  count: number,
  children: React.ReactNode
}

interface BadgeProps {
  invisible: boolean,
}

/**
 * `Badge` is a UI component used to display a small badge on top of another element. It's often used to show a count of items, notifications, or status.
 * It can be made invisible if the count is 0 or set to a specific number otherwise, with an animation for the change in visibility.
 *
 * @component
 * @param {LabelColor} labelColor - The predefined color for the badge background, fetched from a label color utility.
 * @param {number} count - The numerical value to be displayed in the badge. If the count is 0, the badge is invisible. If over 99, it displays '99+'.
 * @param {React.ReactNode} children - The content over which the badge is to be displayed.
 *
 * @example
 * // Badge with a count, displaying over an icon
 * <Badge labelColor="primary" count={5}>
 *   <Icon name="bell" />
 * </Badge>
 */
export const Badge = ({ labelColor, count, children }: Props) => {
  const [isInvisible, setIsInvisible] = useState<boolean>(true)

  useEffect(() => {
    if (count !== undefined) {
      count === 0 ? setIsInvisible(true) : setIsInvisible(false)
    }
  }, [count])
    
  return (
    <S.Container >
      { children }
      <S.Badge labelColor={labelColor} invisible={isInvisible}>
        <S.Text>
          {
            count !== 0
              ? count < 100
                ? count 
                : '99+'
              : null
          }
        </S.Text>
      </S.Badge>
    </S.Container>
  )
}

const shrinkBadge = keyframes`
  0% {
    opacity: 100%;
    transform: scale(1);
  }

  100% {
    opacity: 0%;
    transform: scale(0);
  }
`

const expandBadge = keyframes`
  0% {
    opacity: 0%;
    transform: scale(0)
  }

  100% {
    opacity: 100%;
    transform: scale(1)
  }
`

const S = {
  Container: styled.div`
    position: relative;
    max-width: fit-content;
  `,
  Badge: styled.div<{
    invisible: boolean,
    labelColor: LabelColor
  }>`
    position: absolute;
    top: -.5rem;
    right: -.65rem;
    width: 1.125rem;
    height: 1.125rem;
    min-width: 1.125rem;
    min-height: 1.125rem;
    background: ${props => getLabelColor(props.labelColor)};
    font-size: 10px;
    border-radius: 50%;
    pointer-events: none;
    animation: ${props => props.invisible
      ? css`${shrinkBadge} .25s forwards`
      : css`${expandBadge} .25s forwards`
    };
  `,
  Text: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white !important;
    line-height: 0;
  `
}
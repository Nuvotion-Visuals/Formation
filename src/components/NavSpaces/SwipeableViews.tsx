import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import ReactSwipeableViews from 'react-swipeable-views'

interface Props {
  children: React.ReactNode[],
  activeSwipeIndex: number,
  onSwipe: (index: number) => void,
  onIncrement: () => void
}

export const SwipeableViews = ({
  children,
  activeSwipeIndex,
  onSwipe,
  onIncrement
} : Props) => {
  const handle = (index : number) => {
    onSwipe(index)
  }

  return (
    <ReactSwipeableViews 
      onChangeIndex={index => handle(index)} 
      index={activeSwipeIndex}
      style={{ position: 'relative', overflowX: 'hidden', width: '100%' }}
      containerStyle={{ width: activeSwipeIndex == 0 ? '90%' : '100%', position: 'relative'}}
      slideStyle={{ position: 'relative' }}
    >
      {
        children.map((child, index) => 
          <S.View 
            onClick={e => {
              if (index !== activeSwipeIndex) {
                onIncrement()
              }
            }}
          >
            {
              child
            }
            <S.Backdrop active={index === activeSwipeIndex} />
          </S.View>
        )
      }
    </ReactSwipeableViews>
  )
}

const appear = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const disappear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const S = {
  View: styled.div`
    position: relative;
    width: 100%;
  `,
  Backdrop: styled.div<{
    active: boolean
  }>`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: var(--F_Backdrop);
    z-index: 1;
    pointer-events: none;
    animation: ${props => props.active ? css`${appear} .25s ease-in-out forwards;` : css`${disappear} .25s ease-in-out forwards;`};

  `
}

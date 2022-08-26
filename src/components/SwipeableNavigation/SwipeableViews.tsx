import React, { useState } from 'react'

import styled from 'styled-components'

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
      style={{position: 'relative', overflowX: 'hidden'}}
      containerStyle={{width: activeSwipeIndex == 0 ? '90%' : '100%', position: 'relative'}}
      slideStyle={{position: 'relative'}}
    >
      {
        children.map((child, index) => 
          <S_View 
            darken={index !== activeSwipeIndex} 
            onClick={e => {
              if (index !== activeSwipeIndex) {
                onIncrement()
              }
            }}
          >
            {
              child
            }
          </S_View>
        )
      }
    </ReactSwipeableViews>
  )
}

const S_View = styled.div<{
  darken: boolean
}>`
  filter: ${props => props.darken ? 'brightness(60%)' : 'none'};
  transition: .3s;
  width: 100%;
  * {
    pointer-events: ${props => props.darken ? 'none' : 'all'};
  }
`
import React from 'react'
import styled from 'styled-components'

// @ts-ignore
import ReactReorder from 'react-reorder'

interface Props {
  reorderId: string,
  children: React.ReactNode[],
  onChange: (event: any, previousIndex: number, nextIndex: number, fromId: string, toId: string) => void,
  fullWidth?: boolean,
  maxItemWidth?: number,
  gap?: number,
  disabled?: boolean,
  placeholder?: React.ReactNode,
  holdTime: number
}

export const Reorder = ({ 
  children, 
  onChange,
  reorderId,
  fullWidth,
  maxItemWidth,
  gap,
  disabled,
  placeholder,
  holdTime
} : Props) => {

  return (
    <S.DraggableContainer
      reorderId={reorderId}
      holdTime={holdTime}
      onReorder={onChange} 
      autoScroll={false} 
      disabled={disabled}
      placeholder={placeholder ? placeholder : <div></div>}
      maxItemWidth={maxItemWidth}
      fullWidth={fullWidth}
      component='div'
      gap={gap}
    >
      {
        children.map((child, index) =>
          <S.DraggableItem key={index}>
            {
              child
            }
          </S.DraggableItem>
        )
      }
    </S.DraggableContainer>
  )
}

const S = {
  DraggableContainer: styled(props => <ReactReorder {...props} />)`
    width: 100%;
    display: grid;
    grid-template-columns: ${props => 
      props.fullWidth 
        ? '100%' 
        : `repeat(auto-fill, minmax(${props.maxItemWidth}rem, 1fr))`
    };
    grid-gap: ${props => props.gap ? `${props.gap}rem` : '0'};
  `,
  DraggableItem: styled.div`
    display: flex;
    flex-basis: 100%;
    width: 100%;
    max-width: 100%;
    height: 100%;
  `
}

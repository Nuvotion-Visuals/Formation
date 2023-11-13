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
  placeholder: React.ReactNode,
  holdTime?: number
}

/**
 * This component facilitates reordering of its children by clicking and dragging to various positions. 
 * The child components, provided in an order, can be dynamically rearranged within the layout. 
 * It leverages the 'react-reorder' library to provide this functionality.
 * The intended use is in conjunction with the 'reorderItems' function included in this component library's utilities.
 *
 * @component
 * @param {string} reorderId - An unique identifier for the reorder group.
 * @param {React.ReactNode[]} children - Elements to be reordered.
 * @param {function(event: any, previousIndex: number, nextIndex: number, fromId: string, toId: string): void} onChange - Callback to be executed when an element is reordered.
 * @param {boolean} [fullWidth=false] - Defines whether children should span the full width of their parent. The default behaviour will apply if not set.
 * @param {number} [maxItemWidth=Infinity] - Specifies the maximum width for a child element during the reordering process.
 * @param {number} [gap=0] - Represents the gap in relative units between child elements in the reordering block.
 * @param {boolean} [disabled=false] - If true, the reordering functionality is deactivated.
 * @param {React.ReactNode} [placeholder] - Serves as a placeholder display in the area a child node was extracted from during reordering.
 * @param {number} [holdTime=150] - The minimum hold time in milliseconds before initiating dragging.
 *
 * @example
 * // An illustration of a basic reorderable list:
 * <Reorder 
 *   reorderId="reorder"
 *   onChange={(event, previousIndex, nextIndex) => setItems(oldItems => [...reorderItems(oldItems, previousIndex, nextIndex)])}
 * >
 *   {
 *     items.map((item, index) => 
 *       <div key={index}>{item}</div>
 *     )
 *   }
 * </Reorder>
 */
export const Reorder = React.memo(({ 
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
      holdTime={holdTime ? holdTime : 150}
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
})

const S = {
  DraggableContainer: React.memo(styled(props => <ReactReorder {...props} />)`
    width: 100%;
    display: grid;
    grid-template-columns: ${props => 
      props.fullWidth 
        ? '100%' 
        : `repeat(auto-fill, minmax(${props.maxItemWidth}rem, 1fr))`
    };
    grid-gap: ${props => props.gap ? `${props.gap}rem` : '0'};
    
    .dragged {
      z-index: 99;
      cursor: move;
    }
  `),
  DraggableItem: React.memo(styled.div`
    display: flex;
    flex-basis: 100%;
    width: 100%;
    max-width: 100%;
    height: 100%;
    flex-wrap: wrap;
  `)
}

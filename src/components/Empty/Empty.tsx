import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
}

/**
 * `Empty` is a simple component that displays its children within a styled container. 
 * The styling provides a subtle background pattern, often used to indicate an empty or neutral state.
 * This component can be used to present messages or content in areas that are awaiting user interaction or data.
 *
 * @component
 * @param {React.ReactNode} [children] - The content to be displayed within the empty state container.
 *
 * @example
 * // Use Empty to display a message when a list is empty
 * <Empty>
 *   <p>No items found.</p>
 * </Empty>
 */
export const Empty = ({ children }: Props) => {
  return (
    <S.Empty>
      {
        children
      }
    </S.Empty>
  )
}

const S = {
  Empty: styled.div`
    background-position: 0px 0px, .5rem .5rem;
    background-size: 1rem 1rem;
    background-image: 
      linear-gradient(
        45deg, 
        var(--F_Background) 25%, transparent 25%, 
        transparent 75%, var(--F_Background) 75%, 
        var(--F_Background) 100%
      ),
      linear-gradient(
        45deg, 
        var(--F_Background) 25%, black 25%, 
        black 75%, var(--F_Background) 75%, 
        var(--F_Background) 100%
      );
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color_Disabled);
`
}

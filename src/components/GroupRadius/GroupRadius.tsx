import React from 'react'
import styled from 'styled-components'

/**
 * `GroupRadius` is a component that groups its children within a container that has a unified border radius.
 * The component ensures that all child elements have their border radius set to zero to maintain a consistent 
 * appearance that aligns with the border radius of the container. It can either expand to the full width of its 
 * container or fit to the content.
 *
 * @component
 * @param {boolean} [expand] - If true, the component will expand to fill the width of its container; otherwise, it will fit to the content width.
 * @param {React.ReactNode} children - The child elements to be grouped within the container.
 *
 * @example
 * // GroupRadius component with full width
 * <GroupRadius expand>
 *   <ChildComponent />
 *   <AnotherChildComponent />
 * </GroupRadius>
 *
 * @example
 * // GroupRadius fitting to the content
 * <GroupRadius>
 *   <ChildComponent />
 *   <AnotherChildComponent />
 * </GroupRadius>
 */

export const GroupRadius = React.memo(styled.div<{
  expand?: boolean
  children: React.ReactNode
}>`
  display: flex;
  gap: 1px;
  overflow: hidden;
  border-radius: var(--F_Tile_Radius);
  width: ${props => props.expand ? '100%' : 'auto'};
  * {
    border-radius: 0 !important;
  }
`)

import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
}

/**
 * The Spacer component is a utility component used to provide space around elements.
 * It grows to take up remaining horizontal space within a container.
 * Children passed to this component will be displayed within the created space.
 *
 * @param {React.ReactNode} [children=null] - The child elements to be contained within the space
 *
 * @example
 * return (
 *  <div style={{ display: 'flex' }}>
 *    <div>
 *      Item 1
 *    </div>
 *    <Spacer />
 *    <div>
 *      Item 2
 *    </div>
 *  </div>
 * )
 * 
 * @component
 */
export const Spacer = React.memo(({ children } : Props) => 
  <S.Spacer> 
    { 
      children 
    } 
  </S.Spacer>
)

const S = {
  Spacer: styled.div`
    display: flex;
    flex-grow: 1;
  `
}

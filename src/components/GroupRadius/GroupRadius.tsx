import React from 'react'
import styled from 'styled-components'

export const GroupRadius = React.memo(styled.div<{
  expand?: boolean
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
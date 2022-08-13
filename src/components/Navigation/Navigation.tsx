import React, { useState } from 'react'
import styled from 'styled-components'

import { NavHeader } from '../NavHeader/NavHeader'
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu'

interface Props {
  
}

export const Navigation = ({  }: Props) => {
  const [open, set_open] = useState(true)
  return (
    <NavHeader>
      <HamburgerMenu onClick={() => set_open(!open)}/>
    </NavHeader>
  )
}

export default Navigation

const S_Navigation = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
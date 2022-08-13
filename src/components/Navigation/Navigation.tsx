import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { NavHeader } from '../NavHeader/NavHeader'
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu'
import { Sidebar } from '../Sidebar/Sidebar'
import { NavLogo } from '../NavLogo/NavLogo'

interface Props {
  
}

export const Navigation = ({  }: Props) => {
  const [open, set_open] = useState(true)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--Sidebar_Width', 
      open 
        ? 'var(--Sidebar_Width_Expanded)' 
        : '0'
    )
  }, [open])

  return (<>
    <NavHeader>
      <HamburgerMenu onClick={() => set_open(!open)}/>
      <NavLogo src="logo-white.svg"/>
    </NavHeader>
    <Sidebar onClose={() => set_open(false)} open={open} />
  </>
)
}
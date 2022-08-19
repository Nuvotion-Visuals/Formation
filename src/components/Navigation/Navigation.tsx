import React, { useState, useEffect } from 'react'

import { NavHeader } from '../../internal'
import { HamburgerMenu } from '../../internal'
import { Sidebar, Navs } from '../../internal'
import { NavLogo } from '../../internal'

interface Props {
  navs: Navs,
  navLogoSrc: string
}

export const Navigation = ({ navs, navLogoSrc }: Props) => {
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
      <NavLogo src={navLogoSrc}/>
    </NavHeader>
    <Sidebar 
      navs={navs}
      onClose={() => set_open(false)} 
      open={open} 
    />
  </>
)
}
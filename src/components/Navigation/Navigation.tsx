import styled from 'styled-components'

import React, { useState, useEffect } from 'react'

import { NavHeader } from '../../internal'
import { HamburgerMenu } from '../../internal'
import { Sidebar, Navs } from '../../internal'
import { NavLogo } from '../../internal'

interface Props {
  navs: Navs,
  navLogoSrc: string,
  children: React.ReactNode
}

export const Navigation = ({ 
  navs, 
  navLogoSrc,
  children
}: Props) => {
  const [open, set_open] = useState(true)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--Sidebar_Width', 
      open 
        ? 'var(--Sidebar_Width_Expanded)' 
        : '0'
    )
  }, [open])

  return (<S.Navigation>
    <NavHeader>
      <HamburgerMenu onClick={() => set_open(!open)}/>
      <NavLogo src={navLogoSrc}/>
    </NavHeader>
    <Sidebar 
      navs={navs}
      onClose={() => set_open(false)} 
      open={open} 
    />
    <S.Content>
      {
        children
      }
    </S.Content>
  </S.Navigation>)
}

const S = {
  Navigation: styled.div`
    width: 100%;
    display: flex;
    height: var(calc(100vh * var(--Zoom)));
    overflow: hidden;
  `,
  Content: styled.div`
    margin-top: var(--Header_Height);
    height: calc(100vh - var(--Header_Height));
    width: 100%;
    overflow-y: auto;
  `
}
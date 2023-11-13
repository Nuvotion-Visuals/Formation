import styled from 'styled-components'

import React, { useState, useEffect } from 'react'

import { NavHeader } from '../../internal'
import { NavMenuBars } from '../../internal'
import { Sidebar, Navs } from '../../internal'
import { NavLogo, Box } from '../../internal'

interface Props {
  navs: Navs,
  navLogoSrc: string,
  children: React.ReactNode,
  navChildren?: React.ReactNode,
  open: boolean,
  onSetOpen: (isOpen: boolean) => void
}
/**
 * A navigation component that includes a sidebar, header, and content.
 *
 * @component
 * @param {Object} props - The props for the Navigation component.
 * @param {Navs} props.navs - An array of navigation items to display in the sidebar.
 * @param {string} props.navLogoSrc - The source URL of the navigation logo.
 * @param {React.ReactNode} props.children - The content to be displayed in the main content area.
 * @param {React.ReactNode} props.navChildren - Additional elements to be displayed in the header.
 * @param {boolean} props.open - A boolean indicating whether the sidebar is open.
 * @param {Function} props.onSetOpen - A callback function to toggle the sidebar open/close.
 *
 */

export const Navigation = ({ 
  navs, 
  navLogoSrc,
  children,
  navChildren,
  open,
  onSetOpen
}: Props) => {

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--F_Sidebar_Width', 
      open 
        ? 'var(--F_Sidebar_Width_Expanded)' 
        : '0'
    )
  }, [open])

  return (<S.Navigation>
    <NavHeader>
        <NavMenuBars onClick={() => onSetOpen(!open)}/>
        <NavLogo src={navLogoSrc}/>

        {
          navChildren
        }
    </NavHeader>

    <Sidebar 
      navs={navs}
      onClose={() => onSetOpen(false)} 
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
    height: var(calc(100vh * var(--F_Zoom)));
    overflow: hidden;
  `,
  Content: styled.div`
    margin-top: var(--F_Header_Height);
    height: calc(100vh - var(--F_Header_Height));
    width: 100%;
    overflow-y: auto;
  `
}
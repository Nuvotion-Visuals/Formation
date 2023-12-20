import styled from 'styled-components'
import React from 'react'

interface Props {
  children: React.ReactNode
}

/**
 * A fixed navigation header component for a web page. It typically contains child elements such as a logo, navigation links, or other content.
 *
 * @component
 * @param {Object} props - The props for the NavHeader component.
 * @param {React.ReactNode} props.children - The child elements to be displayed within the navigation header.
 *
 * @example
 * return (
 *   <NavHeader>
 *     <Logo />
 *     <NavigationLinks />
 *   </NavHeader>
 * )
 */
export const NavHeader = React.memo(({ 
  children
} : Props) => {

  return (<S.NavHeader>
    {
      children
    }
  </S.NavHeader>)
})

const S = {
  NavHeader: styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    height: calc(var(--F_Header_Height) - 1px);
    background: var(--F_Background);
    border-bottom: 1px solid var(--F_Surface);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    user-select: none;
  `
}

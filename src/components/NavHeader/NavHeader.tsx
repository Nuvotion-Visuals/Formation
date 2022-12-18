import styled from 'styled-components'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export const NavHeader = ({ 
  children
} : Props) => {

  return (<S.NavHeader>
    {
      children
    }
  </S.NavHeader>)
}

const S = {
  NavHeader: styled.div`
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

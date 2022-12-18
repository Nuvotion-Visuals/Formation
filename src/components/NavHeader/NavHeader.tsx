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
    height: var(--F_Header_Height);
    background: var(--F_Background);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    user-select: none;
  `
}

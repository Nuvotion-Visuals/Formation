import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import { Box } from '../Box/Box'
import { TextInput } from '../TextInput/TextInput';
import { HamburgerMenu } from 'components/HamburgerMenu/HamburgerMenu';


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
    height: var(--Header_Height);
    background: var(--Surface_0);
    position: fixed;
    top: 0;
    left: 0;
  `
}

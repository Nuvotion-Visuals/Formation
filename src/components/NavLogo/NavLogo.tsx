import React from 'react'
import styled from 'styled-components'

import { getLinkComponent } from '../../internal'

interface Props {
  src: string
}

export const NavLogo = ({ src }: Props) => {
  const Link = getLinkComponent()
  
  return (
    <Link href='/'>
      <S.NavLogo src={src} className='F_Empty'>
      
      </S.NavLogo>
    </Link>
  )
}

const S = {
  NavLogo: styled.img`
    object-fit: contain;
    width: 110px;
  `
}

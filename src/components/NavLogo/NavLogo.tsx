import React from 'react'
import styled from 'styled-components'

import { getLinkComponent } from '../../internal'

interface Props {
  src: string
}

export const NavLogo = ({ src }: Props) => {
  const Link = getLinkComponent()
  
  return (<S.Container>
    <Link href='/'>
      <S.NavLogo src={src} className='F_Empty'>
      
      </S.NavLogo>
    </Link>
    </S.Container>)
}

const S = {
  NavLogo: styled.img`
    object-fit: contain;
    height: calc(var(--F_Header_Height) - 1.75rem);
    padding: .875rem 0;
  `,
  Container: styled.div`
    height: 100%;
  `
}

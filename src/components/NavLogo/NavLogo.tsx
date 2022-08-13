import React from 'react'
import styled from 'styled-components'

interface Props {
  src: string
}

export const NavLogo = ({ src }: Props) => {
  return (
    <S.Link href='/'>
      <S.NavLogo src={src} className='F_Empty'>
      
      </S.NavLogo>
    </S.Link>
  )
}

const S = {
  Link: styled.a`
    display: flex;
    height: 100%;
    align-items: center;
    user-select: none;
  `,
  NavLogo: styled.img`
    object-fit: contain;
    width: 110px;
  `
}

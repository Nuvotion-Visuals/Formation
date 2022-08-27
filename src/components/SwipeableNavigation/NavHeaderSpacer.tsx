import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

export const NavHeaderSpacer = ({ children }: Props) => {
  return (<></>)
}

const S = {
  NavHeaderSpacer: styled.div`
    height: var(--F_Header_Height);
    width: 100%;
    border-bottom: 2px solid var(--F_Surface);
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    left: 0;
  `,
  Container: styled.div`
    width: 100%;
    position: relative;
  `,
  VSpacer: styled.div`
    width: 100%;
    height: 100%;
  `
}
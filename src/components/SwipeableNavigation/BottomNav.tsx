import React from 'react'
import styled from 'styled-components'


interface Props {
}

export const BottomNav = ({ } : Props) => {
  return (<S_Header>
    <S_Top>
    </S_Top>
  </S_Header>)
}


const S_Header = styled.div`
  position: absolute;
  bottom: 0;
  background: var(--EC_White_100);
  width: 100%;
  z-index: 1;
  box-shadow: var(--Border_Top);
`

const S_Top = styled.div`
  height: var(--Header_Height);
  display: flex;
  align-items: center;
  padding: 0 1rem;
`

const S_NavContainer = styled.div`
  height: var(--Header_Height);
  display: flex;
  align-items: center;
  border-right: 1px solid #bbb;

`
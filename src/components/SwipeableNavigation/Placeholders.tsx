import React from 'react'

import styled from 'styled-components'

interface Props {
  
}

export const Placeholders = ({  }: Props) => {
  return (
    <S_Placeholders>
      <S_Absolute />

      {
        new Array(12).fill(0).map(() => 
        <S_Placeholder>
          <S_PlaceholderLeft />
          <S_PlaceholderRight />
        </S_Placeholder>
        )
      }
    </S_Placeholders>
  )
}

const S_Placeholders = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: calc(100% - 2rem);
  padding: 1rem;
  gap: 1rem;
  overflow: hidden;
`

const S_Absolute = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 1px;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,.2), rgba(255,255,255,1));
  z-index: 1;
`

const S_Placeholder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: .5rem;
`

const S_PlaceholderLeft = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  background: #ccc;
`

const S_PlaceholderRight = styled.div`
  height: 1.5rem;
  width: calc(100% - 3rem);
  border-radius: 1rem;
  background: #ccc;
`
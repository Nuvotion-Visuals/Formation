import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  children?: React.ReactNode
}

export const Placeholders = ({ children }: Props) => {
  return (
    <S.Placeholders>
      <S.Absolute>
        {
          children
        }
      </S.Absolute>

      {
        new Array(12).fill(0).map((_, index) => <S.Placeholder key={index} />
        )
      }

    </S.Placeholders>
  )
}

const S = {
  Placeholders: styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    gap: 2px;
    overflow: hidden;
    height: 160px; 
  `,
  Absolute: styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 1px;
    z-index: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, var(--F_Background) 0%, rgba(0,0,0,0) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Placeholder: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: var(--F_Surface_0);
    border-radius: var(--F_Tile_Radius);
    height: 31px;
  `,
  Message: styled.div`
    color: var(--F_Font_Color_Disabled);
    font-size: var(--F_Font_Size_Label);
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: .25rem;
  `
}

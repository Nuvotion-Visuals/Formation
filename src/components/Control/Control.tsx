import React from 'react'
import styled from "styled-components"

interface Props {
  children: React.ReactNode,
  label: string,
  emphasize?: boolean
}

export const Control = ({ 
  label,
  children,
  emphasize
}: Props) => {
  return (
    <S.Control emphasize={emphasize}>
      <S.Left emphasize={emphasize}>
        <S.Label>
          { label }
        </S.Label>
      </S.Left>
      <S.Right>
        {
          children
        }
      </S.Right>
    </S.Control>
  )
}

const S = {
  Control: styled.div<{
    emphasize?: boolean
  }>`
    width: 100%;
    height: auto;
    display: flex;
    border-top: 1px solid var(--F_Background);
    background: ${props => props.emphasize ? 'var(--F_Primary_Hover_Subtle)' : 'var(--F_Surface_0)'};
  `,

  Left: styled.div<{
    emphasize?: boolean
  }>`
    width: 6rem;
    min-width: 6rem;
    max-width: 6rem;
    color: ${props => props.emphasize ? 'var(--F_Font_Color)' : 'var(--F_Font_Color_Label)'};
    border-right: 1px solid var(--F_Background);
    padding: 2px 0;
    padding-right: 2px;
  `,

  Right: styled.div`
    width: calc(100% - calc(6rem + 4px));
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  `,

  Label: styled.div`
    font-size: var(--F_Font_Size_Label);
    text-align: right;
    padding-right: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  `,
}
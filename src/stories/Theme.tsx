import React from 'react'
import styled from 'styled-components'

interface Props {
  
}

export const Theme = ({  }: Props) => {
  const colors = [
    '--Background',
    '--Primary',
    '--Surface_0',
    '--Surface',
    '--Surface_1',
    '--Surface_2'
  ]

  const outlines = [
    '--Outline',
    '--Outline_Light',
    '--Outline_Hover',
    '--Outline_Primary',
    '--Outline_Error',
    '--Outline_Disabled',
    '--Outline_Success'
  ]

  return (
    <S.Theme>
      <S.H1>Theming With CSS Variables</S.H1>
      <S.P>
        Formation uses CSS variables to adjust the colors, typography, and proportions of components.
      </S.P>

      <S.P>
        To modify these properties, add them to your project's global CSS stylesheet.
      </S.P>

      <S.Pre>
{`
  :root {
    --Primary: hotpink;
  }
`}
      </S.Pre>

      <S.H2>Background Colors</S.H2>
      <S.Table>
      <tr>
        <th>CSS Variable</th>
        <th>Value</th>
      </tr>
      {
        colors.map(color =>
          <tr>
            <S.Label>{
              color
            }</S.Label>
            <td><S.Color background={color}>
            
            {
              getComputedStyle(document.documentElement).getPropertyValue(color)
            }
          </S.Color></td>
          </tr>
          
        )
      }

    </S.Table>

    <S.H2>Outlines</S.H2>
    <S.Table>
      <tr>
        <th>CSS Variable</th>
        <th>Value</th>
      </tr>
      {
        outlines.map(outline =>
          <tr>
            <S.Label>{
              outline
            }</S.Label>
            <td><S.Color outline={outline} >
            
            {
              getComputedStyle(document.documentElement).getPropertyValue(outline)
            }
          </S.Color></td>
          </tr>
          
        )
      }

    </S.Table>
    </S.Theme>
  )
}

interface ColorProps {
  background?: string,
  outline?: string
}

const S = {
  H1: styled.h1`
    font-size: 20px;
    padding-bottom: 1.75rem;
  `,
  H2: styled.h2`
    font-size: var(--Font_Size_Title);
    padding-top: 1rem;
    padding-bottom: 1rem;
  `,
  P: styled.p`
    padding-bottom: 1rem;
    line-height: 1.1em;
    font-size: var(--Font_Size);
  `,
  Pre: styled.pre`
    margin-bottom: 1rem;
  `,
  Theme: styled.div`
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: var(--Font_Color);
  `,
  Color: styled.div<ColorProps>`
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    /* justify-content: center; */
    background: ${props => props.background ? `var(${props.background})` : null};
    color: var(--Font_Color);
    box-shadow: ${props => props.outline ? `var(${props.outline})` : null};
    font-family: monospace;
  `,
  Table: styled.table`
    color: var(--Font_Color);
    margin-bottom: 2rem;
    /* border: 2px solid var(--Surface); */
    th {
      padding: 1rem;
      border: 1px solid var(--Surface);
    }
    td {
      /* padding: 0 1rem; */
    /* border: 2px solid var(--Surface); */
      padding: .75rem;
    border: 1px solid var(--Surface);

    }
    tr {
    border: 1px solid var(--Surface);

      /* border: 2px solid var(--Surface); */
    }
  `,
  Label: styled.div`
    font-family: monospace;
    padding: 0 .75rem;
  `
}
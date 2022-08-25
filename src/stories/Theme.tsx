import React from 'react'
import styled from 'styled-components'
      
import { Page } from '../components/Page/Page'
import { Article } from '../components/Article/Article'

interface Props {
  
}

export const Theme = ({  }: Props) => {
  const colors = [
    '--F_Background',
    '--F_Primary',
    '--F_Surface_0',
    '--F_Surface',
    '--F_Surface_1',
    '--F_Surface_2'
  ]

  const outlines = [
    '--F_Outline',
    '--F_Outline_Light',
    '--F_Outline_Hover',
    '--F_Outline_Primary',
    '--F_Outline_Error',
    '--F_Outline_Disabled',
    '--F_Outline_Success'
  ]

  const fontColors = [
    '--F_Font_Color',
    '--F_Font_Color_Label',
    '--F_Font_Color_Disabled',
    '--F_Font_Color_Error',
    '--F_Font_Color_Success',
    '--F_Font_Color_Warning',
    '--F_Font_Color_Link'
  ]

  return (
    <S.Theme>
      <Page>
        <Article>
          <h1>Theme</h1>
          <h2>Theming With CSS Variables</h2>
          <p>
            Formation uses CSS variables to adjust the colors, typography, and proportions of components.
          </p>

          <p>
            To modify these properties, add them to your project's global CSS stylesheet.
          </p>

          <pre>
{`:root {
  --F_Primary: hotpink;
}
`}
          </pre>

          <h2>Background Colors</h2>
          <table>
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

        </table>

        <h2>Outlines</h2>
        <table>
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
        </table>

        <h2>Typography</h2>
        <table>
          <tr>
            <th>CSS Variable</th>
            <th>Value</th>
          </tr>
          {
            fontColors.map(fontColor =>
              <tr>
                <S.Label>{
                  fontColor
                }</S.Label>
                <td><S.Color fontColor={fontColor}>
                
                {
                  getComputedStyle(document.documentElement).getPropertyValue(fontColor)
                }
              </S.Color></td>
              </tr>
              
            )
          }
        </table>
        </Article>
    </Page>

    </S.Theme>
  )
}

interface ColorProps {
  background?: string,
  outline?: string,
  fontColor?: string
}

const S = {
  H1: styled.h1`
    font-size: 20px;
    padding-bottom: 1.5rem;
  `,
  H2: styled.h2`
    font-size: var(--F_Font_Size_Title);
    padding-top: 1rem;
    padding-bottom: 1rem;
  `,
  P: styled.p`
    padding-bottom: 1rem;
    line-height: 1.1em;
    font-size: var(--F_Font_Size);
  `,
  Pre: styled.pre`
    margin-bottom: 1rem;
  `,
  Theme: styled.div`
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: var(--F_Font_Color);
  `,
  Color: styled.div<ColorProps>`
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    /* justify-content: center; */
    background: ${props => props.background ? `var(${props.background})` : null};
    color: ${props => props.fontColor ? `var(${props.fontColor})` : 'var(--F_Font_Color)'};
    box-shadow: ${props => props.outline ? `var(${props.outline})` : null};
    font-family: monospace;
  `,
  Label: styled.td`
    font-family: monospace;
    padding: 0 .75rem;
  `
}
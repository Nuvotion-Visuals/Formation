import React from 'react'
import styled from 'styled-components'
      
import { Page } from '../components/Page/Page'
import { StyleHTML } from '../components/StyleHTML/StyleHTML'

interface Props {
  
}

/**
 * Component for displaying the CSS variables used for theming in the storybook. This is used to illustrate the different ways the look and feel of Formation components can be customized. 
 * 
 * These variables are used in the Formation component library to adjust the colours, fonts and other visual settings of the components. They are attached to the `:root` pseudo-selector, 
 * which is effectively setting them on the document object. Because of this, they will be available globally across all Formation components.
 * 
 * Note: The various CSS variables displayed and their current values, are retrieved from the document object itself — using `getComputedStyle(document.documentElement).getPropertyValue(variableName)`.
 * 
 * @component
 * @example
 * return <Theme />
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties|CSS Custom Properties (Variables)}
 */
export const Theme = ({  }: Props) => {
  const colors = [
    '--F_Primary',
    '--F_Primary_Variant',
    '--F_Primary_Hover',

    '--F_Background',
    '--F_Background_Light',
    '--F_Background_Alternating',
    
    '--F_Emphasize',
    '--F_Emphasize_Hover',
    
    '--F_Surface_0',
    '--F_Surface',
    '--F_Surface_1',
    '--F_Surface_2',

    '--F_Backdrop',
    '--F_Backdrop_Light'
  ]

  const labelColors = [
    '--F_Label_Color_Red',
    '--F_Label_Color_Orange',
    '--F_Label_Color_Yellow',
    '--F_Label_Color_Green',
    '--F_Label_Color_Blue',
    '--F_Label_Color_Indigo',
    '--F_Label_Color_Purple',
    '--F_Label_Color_Pink',
    '--F_Label_Color_Cyan',
    '--F_Label_Color_Teal',
    '--F_Label_Color_Gray',
  ]

  const outlines = [
    '--F_Outline',
    '--F_Outline_Hover',
    '--F_Outline_Focus',
    '--F_Outline_Primary',
    '--F_Outline_Error',
    '--F_Outline_Disabled',
    '--F_Outline_Success'
  ]

  const fontColors = [
    '--F_Font_Color',
    '--F_Font_Color_Disabled',
    '--F_Font_Color_Label',
    '--F_Font_Color_Error',
    '--F_Font_Color_Success',
    '--F_Font_Color_Warning',
    '--F_Font_Color_Link',
  ]

  const fontSizes = [
    '--F_Font_Size',
    '--F_Font_Size_Label',
    '--F_Font_Size_Small',
    '--F_Font_Size_Title',
  ]

  return (
    <S.Theme>
      <Page>
        <StyleHTML>
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

        <h2>Colors</h2>
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

        <h2>Label Colors</h2>
        <table>
          <tr>
            <th>CSS Variable</th>
            <th>Value</th>
          </tr>
          {
            labelColors.map(color =>
              <tr>
                <S.Label>{
                  color
                }</S.Label>
                <td><S.Color background={color} isLabel>
                
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
                <S.Label>
                  {
                    outline
                  }
                </S.Label>
                <td><S.Color outline={outline}>
                {
                  getComputedStyle(document.documentElement).getPropertyValue(outline)
                }
              </S.Color></td>
              </tr>
              
            )
          }
        </table>

        <h2>Font Colors</h2>
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

        <h2>Font Sizes</h2>
        <table>
          <tr>
            <th>CSS Variable</th>
            <th>Value</th>
          </tr>
          {
            fontSizes.map(fontSize =>
              <tr>
                <S.Label>
                  {
                    fontSize
                  }
                </S.Label>
                <td>
                  <S.Font 
                    size={getComputedStyle(document.documentElement).getPropertyValue(fontSize)}
                  >
                    {
                      `${fontSize} is ${getComputedStyle(document.documentElement).getPropertyValue(fontSize)}`
                    }
                  </S.Font>
                </td>
              </tr>
              
            )
          }
        </table>
      </StyleHTML>
    </Page>

    </S.Theme>
  )
}

interface ColorProps {
  background?: string,
  outline?: string,
  fontColor?: string,
  fontSize?: string,
  isLabel?: boolean
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
    font-size: var(--F_Font_Size);
    line-height: 1.1em;
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
    color: ${props => props.isLabel? 'white' : props.fontColor ? `var(${props.fontColor})` : 'var(--F_Font_Color)'};
    box-shadow: ${props => props.outline ? `var(${props.outline})` : null};
    font-family: monospace;
  `,
  Font: styled.div<{
    size: string
  }>`
    font-size: ${props => `${props.size} !important`};
  `,
  Label: styled.td`
    font-family: monospace;
    padding: 0 .75rem;
  `
}
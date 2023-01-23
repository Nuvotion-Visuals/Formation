import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}


export const StyleHTML = ({ children }: Props) => {
  return (<S.StyleHTML>
      {
        children
      }
    </S.StyleHTML>
    
  )
}

const S = {
  StyleHTML: styled.div`
    font-size: 16px;
    line-height: 1.5em;
    padding-bottom: 1rem;
    color: var(--F_Font_Color);
    overflow-x: hidden;
    * {
      color: var(--F_Font_Color);
    }

    h1 {
      margin: 1rem 0 0 0;
      font-size: 2.714em;
      font-weight: 600;
      line-height: 1.166;
    }

    h2 {
      font-size: 1.43em;
      font-weight: 600;
      line-height: 1.2;
      text-transform: none;
      margin: 30px 0 0 0;
    }

    h3 {
      font-size: 1.142em;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: -0.006em;
      margin-top: 2em;
      margin-bottom: 0px;
    }

    h4 {
      font-size: 1em;
      line-height: 1.428;
      margin-top: 10px;
    }

    h5 {
      font-size: 0.857em;
      line-height: 1.333;
      margin-top: 10px;
      color: var(--F_Font_Color_Label);
    }

    h6 {
      line-height: 1.454;
      font-size: 0.785em;
      margin-top: 10px;
      color: var(--F_Font_Color_Label);
    }

    p {
      font-size: 1em;
      line-height: 1.714;
      font-weight: normal;
      margin-top: 0.75rem;
      margin-bottom: 0px;
      letter-spacing: -0.005em;
    }

    a {
      color: var(--F_Font_Color_Link);
      text-decoration: none;
    }

    ul, ol {
      box-sizing: border-box;
      padding-left: 24px;
      margin: 10px 0 0 0;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
      font-size: 16px;
      line-height: 1.5rem;
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }

    ol {
      li {
        list-style-type: decimal; 
      }
    }

    li {
      display: list-item;
      list-style-type: disc;
    }

    pre {
      max-width: calc(100% - 2rem);
      overflow: auto;
      margin-top: 10px;
      font-size: var(--F_Font_Size);
      background: var(--F_Surface_0);
      padding: 1rem;
      border-radius: .5rem;
      
    }

    blockquote {
      margin-top: 10px;
      background: var(--F_Surface_0);
      padding: 1rem;
      color: var(--F_Font_Color_Label);
      border-left: .5rem solid var(--F_Surface_2);
      * {
        color: var(--F_Font_Color_Label);
      }
    }

    img {
      padding: 0;
      margin-top: 10px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    figure {
      text-align: center;
    }
    figcaption {
      font-size: var(--F_Font_Size);
      margin-bottom: 20px;
      color: var(--F_Font_Color_Label);
    }

    table {
      border-collapse:separate;
      border: solid var(--F_Surface_1) 1px;
      border-radius:.5rem;
      color: var(--F_Font_Color);
      margin-top: 1rem;
      table-layout: fixed;
      display: block;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      width: 100%;
      
    }

    tr {
      width: 100%;
    }

    td, th {
      border-left: solid var(--F_Surface_1) 1px;
      padding: 5px;
      padding: .75rem;
    }

    th {
      border-top: none;
      background: var(--F_Surface_0);
      padding: 1rem;
    }

    td {
      border-top: solid var(--F_Surface_1) 1px;
    }

    td:last-child {
      width: 100%;
    }

    td:first-child, th:first-child {
        border-left: none;
    }

    th:first-child { border-radius: .5rem 0 0 0; }
    th:last-child { border-radius: 0 .5rem 0 0; }

    tr:last-child td:first-child { border-radius: 0 0 0 .5rem; }
    tr:last-child td:last-child { border-radius: 0 0 .5rem 0; }

    button {
      height: var(--F_Input_Height);
      background: var(--F_Primary);
      padding: 0 1rem;
      border: none;
      font-size: var(--F_Font_Size);
      border-radius: 8px;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        background: var(--F_Primary_Hover);

      }
      &:active {
        background: var(--F_Primary_Variant);

      }
    }

    mark {
      background: var(--F_Primary);
    }
  `
}

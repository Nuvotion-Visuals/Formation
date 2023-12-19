import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

/**
 * StyleHTML component is used style HTML content in accordance with the design system.
 * It styles h1-h6 headings, paragraphs (p), links (a), lists (ul, ol), preformatted text (pre),
 * blockquote, images, figures, tables etc. It also includes styles for subscripts and superscripts.
 * 
 * The styling includes text styles, margin, padding, colors, background colors, overflow behaviors, etc.
 *
 * @param {React.ReactNode} children - The HTML content to be styled.
 *
 *
 * @example
 * return (
 *  <div>
 *    <StyleHTML>
 *      {
 *        //Your HTML content
 *      }
 *    </StyleHTML>
 *  </div>
 * )
 * 
 * @component
 */
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
    color: var(--F_Font_Color);
    width: 100%;
    overflow-x: hidden;
    * {
      color: var(--F_Font_Color);
    }

    h1 {
      margin: 1rem 0 0 0;
      font-size: 2.714em;
      font-weight: 800;
      line-height: 1.166;
    }

    h2 {
      font-size: 2em;
      font-weight: 800;
      line-height: 1.2;
      text-transform: none;
      margin: 30px 0 0 0;
    }

    h3 {
      font-size: 1.442em;
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: -0.006em;
      margin-top: 1.3em;
      margin-bottom: 0px;
    }

    h4 {
      font-weight: 800;
      font-size: 1.1em;
      line-height: 1.2;

      margin-top: 1.3em;
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

    strong, u, em {
      color: var(--F_Font_Color_Label);
    }

    a {
      color: var(--F_Font_Color_Link);
      text-decoration: none;
    }

    ul, ol {
      box-sizing: border-box;
      padding-left: 24px;
      margin: 0; /* ensure there are no extra margins on the list itself */
      padding-inline-start: 40px; /* adjust padding for the start of list */
      font-size: 16px; /* keep the font size as is */
      overflow-wrap: break-word;
      white-space: pre-wrap;
      line-height: 1.5;
      margin-top: .75rem;
    }

    ol li {
      list-style-type: decimal; 
      display: list-item;
      margin-block-start: 0.25em; /* reduced margin at the start of the list item */
      margin-block-end: 0.25em; /* reduced margin at the end of the list item */
      /* line-height: 1; */
    }

    ul li {
      display: list-item;
      list-style-type: disc; /* disc style for unordered lists, which can be overridden by ordered lists */
      margin-block-start: 0.25em; /* reduced margin at the start of the list item */
      margin-block-end: 0.25em; 
    }

    ol li {
      display: list-item;
      margin-block-start: 0.25em; /* reduced margin at the start of the list item */
      margin-block-end: 0.25em; 
    }

    pre, code {
      max-width: calc(100% - 2rem);
      overflow: auto;
      margin-top: 10px;
      font-size: var(--F_Font_Size);
      background: var(--F_Surface_0);
      padding: 0 .5rem;
      border-radius: .5rem;
      font-family: monospace !important;
      
    }

    blockquote {
      margin-top: 10px;
      background: var(--F_Surface_0);
      padding: .5rem;
      color: var(--F_Font_Color_Label);
      border-left: .5rem solid var(--F_Surface_2);
      * {
        color: var(--F_Font_Color_Label);
      }
    }

    img {
      padding: 0;
      margin-top: 10px;
      max-width: 100%;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    iframe {
      margin-top: 10px;
      max-width: 100%;
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
      padding: .5rem;
    }

    th {
      border-top: none;
      background: var(--F_Surface_0);
      padding: .5rem;
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

    /* button {
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
    } */

    mark {
      background: var(--F_Primary);
    }

    sub {
      vertical-align: sub;
      font-size: smaller;
    }

    sup {
      vertical-align: super;
      font-size: smaller;
    }

    p, li {
      color: var(--F_Font_Color_Label);
    }
  `
}

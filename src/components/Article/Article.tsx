import React from 'react'
import styled from 'styled-components'

import { Page } from '../Page/Page'

interface Props {
  children: React.ReactNode
}

export const Article = ({ children }: Props) => {
  return (<Page>
    <S.Article>
      
      {
        children
      }
    </S.Article>
  </Page>
  )
}

const S = {
  Article: styled.article`
    font-size: 16px;
    line-height: 1.5em;
    padding-bottom: 1rem;
    * {
    color: var(--Font_Color);

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
      color: var(--Font_Color_Label);
    }

    h6 {
      line-height: 1.454;
      font-size: 0.785em;
      margin-top: 10px;
      color: var(--Font_Color_Label);
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
      color: var(--Font_Color_Link);
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

    li {
      display: list-item;
      text-align: -webkit-match-parent;
      list-style-type: disc;
    }

    pre {
      max-width: calc(100% - 2rem);
      overflow: auto;
      margin-top: 10px;
      font-size: var(--Font_Size);
      background: var(--Surface_0);
      padding: 1rem;
    }

    blockquote {
      margin-top: 10px;
      background: var(--Surface_0);
      padding: 1rem;
      color: var(--Font_Color_Label);
      border-left: .5rem solid var(--Surface_2);
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
      font-size: var(--Font_Size);
      margin-bottom: 20px;
      color: var(--Font_Color_Label);
    }

        /* counter-reset: heading;
    h2::before{
            counter-increment: heading;
            content: '0'counter(heading)': ';
    }
    #toc h2 {
            text-transform: uppercase;
            font-size: 11pt;
            letter-spacing: 2px;
    }
    #toc h3 {
            font-weight: normal;
            font-size: inherit;
    } */
  `
}

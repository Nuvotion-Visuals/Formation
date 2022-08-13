import React from 'react'
import styled from 'styled-components'

import { StyleHTML } from '../StyleHTML/StyleHTML'

interface Props {
  children: React.ReactNode
}

export const Article = ({ children }: Props) => {
  return (
    <S.Article>
      <StyleHTML>
        {
          children
        }
      </StyleHTML>
    </S.Article>
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

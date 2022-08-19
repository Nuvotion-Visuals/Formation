import React from 'react'
import styled from 'styled-components'

import { StyleHTML } from '../../internal'

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
    line-height: 1.5em;
    padding-bottom: 1rem;
    * {
    color: var(--Font_Color);

    }
  `
}

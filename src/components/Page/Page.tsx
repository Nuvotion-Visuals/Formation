import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

export const Page = ({ children }: Props) => {
  return (
    <S.Page>
      <S.Content>
        {
          children
        }
      </S.Content>
    </S.Page>
  )
}

const S = {
  Page: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
  Content: styled.div`
    max-width: var(--F_Page_Width);
    width: 100%;
  `
}

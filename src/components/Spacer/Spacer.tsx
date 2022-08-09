import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: (JSX.Element | null)[] | null | JSX.Element
}

export const Spacer = React.memo(({ children } : Props) => 
  <S.Spacer> 
    { 
      children 
    } 
  </S.Spacer>
)

const S = {
  Spacer: styled.div`
    display: flex;
    flex-grow: 1;
  `
}

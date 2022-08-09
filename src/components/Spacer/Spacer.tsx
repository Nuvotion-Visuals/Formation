import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
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

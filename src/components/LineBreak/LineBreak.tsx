import React from 'react'
import styled from 'styled-components'

interface Props {
  light?: boolean
}

export const LineBreak = ({ light } : Props) => <S.Break light={light}/>

const S = {
  Break: styled.div<Props>`
    width: 100%;
    display: flex;
    border-bottom: ${props => props.light ? '1px solid var(--F_Surface_0)' : '2px solid var(--F_Surface)'};
  `
}

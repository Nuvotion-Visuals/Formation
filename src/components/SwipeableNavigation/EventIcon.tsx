import React from 'react'
import styled from 'styled-components'

interface Props {

}

export const EventIcon = ({ }: Props) => {
  return (
    <S_MonthIcon>
      
    </S_MonthIcon>
  )
}

const S_MonthIcon = styled.div<{
  active?: boolean
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 60px;
  background-size: cover;
  background-position: center;
  box-shadow: ${props => props.active ? 'none' : 'var(--Outline_Label)'};
  overflow: hidden;
  align-items: start;
  border-radius: 4px;
`


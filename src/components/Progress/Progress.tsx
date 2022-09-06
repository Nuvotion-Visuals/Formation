import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

interface Props {
  minimum?: number,
  maximum: number,
  value: number,
}

export const Progress = ({ minimum, maximum, value }: Props) => {
  
  const [status, setStatus] = useState<number>(0)

  useEffect(() => {
    if(maximum !== undefined)
      setStatus(value / maximum * 100)
      console.log(status, ":status")
  }, [value])

  return (
    <S.Container>
      <S.Slider
         status={status}   
      />
    </S.Container>
  );
};
  
const S = {
  Container: styled.div<{}>`
    height: 0.5rem;
    width: 100%;
    border-radius: 0.25rem;
    background: var(--F_Surface);
  `,
  Slider: styled.div<{
    status: number
  }>`
    height: 100%;
    width: ${props => `${props.status}%`};
    background: var(--F_Primary);
    border-radius: 0.5rem;
  `
}
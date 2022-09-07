import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

interface Props {
  minimum?: number,
  maximum: number,
  value: number,
  small?: boolean,
  gradient?: boolean,
}

export const Progress = ({ minimum, maximum, value, small, gradient }: Props) => {
  
  const [status, setStatus] = useState<number>(0)
  const [gradientColor, setGradientColor] = useState<string>('')

  const calculateGradient = (status: number) => {
    switch (true) {
      case (status > 0 && status <= 25):
        setGradientColor('var(--F_Progress_Red)')
        break;
      case (status > 25.01 && status <= 50):
        setGradientColor('var(--F_Progress_Orange)')
        break;
      case (status > 50.01 && status <= 75):
        setGradientColor('var(--F_Progress_Yellow)')
        break;
      case (status > 75.01 && status <= 99.5):
        setGradientColor('var(--F_Progress_Green)')
        break;
      case (status > 99.6 && status <= 100):
        setGradientColor('var(--F_Progress_Complete)')
        break;
    }
  }

  useEffect(() => {
    if(maximum !== undefined && value !== undefined)
      setStatus(value / maximum * 100)
  }, [value])

  useEffect(() => {
    calculateGradient(status)
  }, [status])

  return (
    <S.Container
      small={small !== undefined ? small : false}
    >
      <S.Slider
        status={status}  
        gradient={gradient !== undefined ? gradient : false}
        gradientColor={gradientColor}
      />
    </S.Container>
  );
};
  
const S = {
  Container: styled.div<{
    small: boolean
  }>`
    height: ${props => props.small ? `0.25rem` : '0.5rem'};
    width: 100%;
    border-radius: 0.25rem;
    background: var(--F_Surface);
  `,
  Slider: styled.div<{
    status: number,
    gradient: boolean,
    gradientColor: string,
  }>`
    height: 100%;
    width: ${props => `${props.status}%`};
    background: ${props => props.gradient ? `${props.gradientColor}` : 'var(--F_Primary)' };
    border-radius: 0.5rem;
  `
}
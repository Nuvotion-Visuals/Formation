import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

interface Props {
  maximum: number,
  value: number,
  small?: boolean,
  gradient?: boolean,
  showLabel?: boolean,
  centerLabel?: boolean,
}

export const Progress = ({  maximum, value, small, gradient, showLabel, centerLabel }: Props) => {
  
  const [gradientColor, setGradientColor] = useState<string>('')

  const calculateGradient = (status: number) => {
    if (status > 33) {
      setGradientColor('var(--F_Label_Color_Red)')
    }
    if (status > 33 && status > 66) {
      setGradientColor('var(--F_Label_Color_Orange)')
    }
    if (status > 66 && status > 99) {
      setGradientColor('var(--F_Label_Color_Orange)')
    }
    else {
      setGradientColor('var(--F_Label_Color_Green)')
    }
  }

  useEffect(() => {
    calculateGradient(value / maximum * 100)
  }, [value])

  const constrainedValue = value > maximum ? maximum : value

  return (
    <S.Container
      small={small !== undefined ? small : false}
    >
      <S.Slider
        status={constrainedValue / maximum * 100}  
        gradient={gradient}
        gradientColor={gradientColor}
      />
      { 
        showLabel 
          ? <S.LabelContainer centerLabel={centerLabel ? centerLabel : false}>
              <S.Label>
                {`${constrainedValue} / ${maximum}`}
              </S.Label>
            </S.LabelContainer>
          : null
      }
      
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
    gradient?: boolean,
    gradientColor: string,
  }>`
    height: 100%;
    width: ${props => `${props.status}%`};
    transition: width 0.3s ease-in-out; 
    background: ${props => props.gradient ? props.gradientColor : 'var(--F_Primary)' };
    border-radius: 0.5rem;
  `,
  LabelContainer: styled.div<{
    centerLabel: boolean
  }>`
    width: 100%;
    display: flex;
    justify-content: ${props => props.centerLabel ? 'center' : ''};
    font-size: var(--F_Font_Size_Label);
  `,
  Label: styled.div<{}>`
    margin-top: 0.5rem;
  `
}
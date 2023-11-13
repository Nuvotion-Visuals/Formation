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

/**
 * This is a Progress Bar component showcasing the completion status of a process. A gradient coloring option can wholly change the color as the progress varies. Optionally, a label can be added to numerically display the current progress, and can be centered if needed. The bar's height can also be adjusted.
 *
 * @component
 * @param {number} maximum - Total quantum of the process that the progress bar signifies.
 * @param {number} value - Current progression of the process.
 * @param {boolean} [small=false] - If set true, results in a reduced height of the progress bar.
 * @param {boolean} [gradient=false] - If set true, the progress bar's color shifts according to its progression.
 * @param {boolean} [showLabel=false] - When true, a label demonstrating current and maximum progress is displayed above the progress bar.
 * @param {boolean} [centerLabel=false] - When true, the label is oriented at the center. Only applicable if showLabel is true.
 *
 * @example
 * // A standard Progress component
 * <Progress maximum={100} value={45} />
 *
 * @example
 * // A Progress component using every optional property
 * <Progress maximum={100} value={45} small={true} gradient={true} showLabel={true} centerLabel={true} />
 */
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
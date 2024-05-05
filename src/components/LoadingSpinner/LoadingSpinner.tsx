import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  size?: string
  compact?: boolean
}
/**
 * `LoadingSpinner` is a visual component that displays a rotating spinner animation, commonly used to indicate loading or processing status in a user interface. It is customizable in size and can be set to a more compact version which reduces the spinner size. This flexibility makes it suitable for various UI spaces, such as forms, buttons, or page load indicators.
 *
 * @component
 * @param {string} [size='var(--F_Input_Height)'] - Specifies the size of the spinner, defaulting to the CSS variable `--F_Input_Height`. This can be overridden to change the spinner's dimensions.
 * @param {boolean} [compact=false] - If set to true, the spinner size is reduced to `--F_Input_Height_Compact`, suitable for smaller spaces or alongside compact elements.
 *
 * @example
 * // Standard sized spinner for general loading scenarios
 * <LoadingSpinner />
 *
 * @example
 * // Compact spinner for use in smaller components or alongside form inputs
 * <LoadingSpinner compact />
 */
export const LoadingSpinner = memo(({
  size = 'var(--F_Input_Height)',
  compact
}: Props) => {

  if (compact) {
    size = 'var(--F_Input_Height_Compact)'
  }

  return (
    <S.SpinnerWrapper size={size}>
      <S.Spinner size={size} />
    </S.SpinnerWrapper>
  )
})

const rotate = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`

const S = {
  SpinnerWrapper: styled.div<{
    size: string
  }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => `${props.size}`};
    height: ${props => `${props.size}`};
  `,
  Spinner: styled.div<{
    size: string
  }>`
    box-sizing: border-box; 
    border-radius: 50%;
    width: ${props => `${props.size}`};
    height: ${props => `${props.size}`};
    border: ${props => `calc(0.1875 * ${props.size}) solid rgba(255,255,255,0.25)`};
    border-top-color: rgba(255,255,255,0.75);
    animation: ${rotate} .8s linear infinite;
  `
}

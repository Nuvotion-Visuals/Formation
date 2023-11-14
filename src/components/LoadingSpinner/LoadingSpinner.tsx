import React from 'react'
import styled from 'styled-components'

interface Props {
  small?: boolean,
}

/**
 * `LoadingSpinner` is a component that renders an animated loading spinner graphic. It can be styled to different sizes
 * and used in different contexts, such as a chat loader or a general page/content loading indicator.
 *
 * @component
 * @param {Object} props - Props for the `LoadingSpinner` component.
 * @param {boolean} [props.small=false] - If true, renders a smaller version of the loading spinner.
 *
 * @example
 * // Basic usage for a general loading spinner.
 * <LoadingSpinner />
 *
 * @example
 * // For a smaller spinner.
 * <LoadingSpinner small />
 *
 * @example
 * // For a chat loading spinner.
 * <LoadingSpinner chat />
 */
export const LoadingSpinner = React.memo(({
  small,
}: Props) => <>
  <S.LoadingSpinner small={small} />
</>
)

const S = {
  LoadingSpinner: styled.span<Props>`
    display: flex;
    align-items: center;
    height: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    width: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    min-height: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    min-width: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation: pulsOut 3s ease-in-out infinite alternate-reverse;
    filter: drop-shadow(0 0 0rem var(--F_Font_Color));
  }
  &:before {
    width: 100%;
    padding-bottom: 100%;
    animation-name: pulsIn;

  }
  &:after {
    width: ${props => props.small ? 'calc(100% - 1.5rem)' : 'calc(100% - 1.8rem)'};
    padding-bottom: ${props => props.small ? 'calc(100% - 1.5rem)' : 'calc(100% - 1.8rem)'};
  }

  @keyframes pulsIn {
    0% {
      box-shadow: inset 0 0 0 .8rem var(--F_Font_Color);
      opacity: .9;
    }
    50%, 100% {
      box-shadow: inset 0 0 0 0rem var(--F_Font_Color);
      opacity: .5;
    }
  }

  @keyframes pulsOut {
    0%, 50% {
      opacity: .5;
    }
    100% {
      box-shadow: 0 0 0 .8rem var(--F_Font_Color);
      opacity: .9;
    }
  }
  `
};


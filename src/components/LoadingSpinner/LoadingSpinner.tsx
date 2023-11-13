import React from 'react'
import styled from 'styled-components'

interface Props {
  small?: boolean,
  chat?: boolean
}

/**
 * `LoadingSpinner` is a component that renders an animated loading spinner graphic. It can be styled to different sizes
 * and used in different contexts, such as a chat loader or a general page/content loading indicator.
 *
 * @component
 * @param {Object} props - Props for the `LoadingSpinner` component.
 * @param {boolean} [props.small=false] - If true, renders a smaller version of the loading spinner.
 * @param {boolean} [props.chat=false] - If true, renders a chat-specific loading spinner.
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
  chat
}: Props) => <>
  {
    chat
      ? <S.Chat>

        </S.Chat>
      : <S.LoadingSpinner small={small}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </S.LoadingSpinner>
  }
</>
)

const S = {
  LoadingSpinner: styled.div<Props>`
    
    height: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
    width: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      height: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
      width: ${props => props.small ? 'var(--F_Input_Height)' : 'var(--F_Input_Height_Hero)'};
      border: ${props => props.small ? '6px solid var(--F_Font_Color_Label)' : '8px solid var(--F_Font_Color_Label);'};
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--F_Font_Color) transparent transparent transparent;
    }
    div:nth-child(1) {
      animation-delay: -0.45s;
    }
    div:nth-child(2) {
      animation-delay: -0.3s;
    }
    div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  Chat: styled.span<Props>`
    display: flex;
    align-items: center;
    width: var(--F_Input_Height_Hero);
    max-width: var(--F_Input_Height_Hero);
    min-width: var(--F_Input_Height_Hero);
    height: var(--F_Input_Height_Hero);
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
    width: calc(100% - 1.8rem);
    padding-bottom: calc(100% - 1.8rem);

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


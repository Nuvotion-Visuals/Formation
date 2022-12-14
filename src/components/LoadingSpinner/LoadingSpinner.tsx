import React from 'react'
import styled from 'styled-components'

interface Props {
  small?: boolean,
  chat?: boolean
}

export const LoadingSpinner = React.memo(({
  small,
  chat
}: Props) => <>
  {
    chat
      ? <S.Chat>
          <span className='loader'></span>
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
      max-width: var(--F_Input_Height_Hero);
      height: var(--F_Input_Height_Hero);
  .loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--F_Input_Height_Hero);
    margin-top:var(--F_Input_Height_Hero);
    margin-bottom: var(--F_Input_Height_Hero);
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation: pulsOut 3s ease-in-out infinite alternate-reverse;
    filter: drop-shadow(0 0 0rem var(--F_Font_Color));
  }
  .loader:before {
    width: 100%;
    padding-bottom: 100%;
    animation-name: pulsIn;

  }
  .loader:after {
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


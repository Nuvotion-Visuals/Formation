import React from 'react'
import styled from 'styled-components'

interface Props {
  small?: boolean
}

export const LoadingSpinner = React.memo(({
  small
}: Props) => 
  <S.LoadingSpinner small={small}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </S.LoadingSpinner>
)

const S = {
  LoadingSpinner: styled.div<Props>`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    transform: ${props => props.small ? 'scale(0.4)' : 'none'};

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid var(--F_Font_Color_Label);
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
  `
}


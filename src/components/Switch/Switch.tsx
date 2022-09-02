import styled from 'styled-components'
import React from 'react'

interface Props {
  value?: boolean,
  handleSwitch?: Function,
  size?: string
}

export const Switch = ({ value, handleSwitch, size }: Props) => {
    
  return (
        <S.Container>
          <S.Input
            checked={value}
            type="checkbox"
          />
          <S.Label
            onClick={handleSwitch ? () => handleSwitch() : () => {}}
            value={value ? value : false}
            size={size !== undefined ? size : 'medium'}
          >
        <S.Span
          value={value ? value : false}
          size={size !== undefined ? size : 'medium'}
        />
          </S.Label>
        </S.Container>
      );
};
  
const S = {
  Container: styled.div<{}>`
  `,
  Input: styled.input<{}>`
    height: 0;
    width: 0;
    visibility: hidden;
  `,
  Label: styled.label<{
    value: boolean,
    onClick: Function,
    size: string
  }>`
    display: flex;
    width: ${props => props.size === 'small' ? '2.5rem' : '3.5rem'};
    height: ${props => props.size === 'small' ? '1.75rem' : '2.25rem'};
    background: ${props => props.value ? `var(--F_Font_Color_Success)` : `var(--F_Font_Color_Disabled)`};
    border-radius: 100px;
    position: relative;
    transition: background-color .5s;
  `,
  Span: styled.span<{
    value: boolean,
    size: string
  }>`
    position: absolute;
    top: ${props => props.size === 'small' ? '.4rem' : '0.4rem'};
    transform: ${props => props.value
                            ? props.size === 'medium'
                              ? `translateX(1.5rem)`
                              : `translateX(1.1rem)`
                                : `translateX(0.4rem)`};
    width: ${props => props.size === 'small' ? '1rem' : '1.5rem'};
    height: ${props => props.size === 'small' ? '1rem' : '1.5rem'};
    border-radius: 50%;
    transition: 0.2s;
    background: #fff;
  `
}

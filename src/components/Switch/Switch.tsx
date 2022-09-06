import styled from 'styled-components'
import React from 'react'

interface Props {
  value?: boolean,
  handleSwitch?: Function,
  size?: string,
  required?: boolean,
  label?: string,
  disabled?: boolean,
}

export const Switch = ({ value, handleSwitch, size, required, disabled }: Props) => {
    
  return (
        <S.Container>
          <S.Input
            checked={value}
            type="checkbox"
            required={required ? required : false}
          />
          <S.Label
            onClick={
              disabled
                ? () => {}
                : handleSwitch
                  ? () => handleSwitch()
                  : () => {}}
            value={value ? value : false}
            size={size !== undefined ? size : 'medium'}
          >
            <S.Span
              value={value ? value : false}
          size={size !== undefined
                  ? size === '' 
                    ? 'medium'
                    : size
                  : 'medium'}
            />
          </S.Label>
        </S.Container>
      );
};
  
const S = {
  Container: styled.div<{}>`
  `,
  Input: styled.input<{
    required: boolean,
  }>`
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
    border-radius: 1.25rem;
    position: relative;
    transition: background-color .5s;
  `,
  Span: styled.span<{
    value: boolean,
    size: string
  }>`
    position: absolute;
    top: ${props => props.size === 'small' ? '.325rem' : '0.375rem'};
    transform: ${props => props.value
                            ? props.size === 'medium'
                              ? `translateX(1.55rem)`
                              : `translateX(1.05rem)`
                            : props.size === 'medium'
                              ? `translateX(0.4rem)`
                              : `translateX(0.35rem)`
                              };
    width: ${props => props.size === 'small' ? '1.1rem' : '1.5rem'};
    height: ${props => props.size === 'small' ? '1.1rem' : '1.5rem'};
    border-radius: 50%;
    transition: 0.2s;
    background: #fff;
  `
}

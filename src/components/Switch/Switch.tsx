import styled from 'styled-components'
import React from 'react'

interface Props {
  value?: boolean,
  handleSwitch?: Function,
  small?: boolean,
  disabled?: boolean,
}

export const Switch = ({ value, handleSwitch, small, disabled }: Props) => {
    
  return (
        <S.Container>
          <S.Input
            checked={value}
            type="checkbox"
          />
          <S.Label
            onClick={
              disabled
                ? () => {}
                : handleSwitch
                  ? () => handleSwitch()
                  : () => {}}
            value={value ? value : false}
            small={small !== undefined ? small : false}
          >
            <S.Span
              value={value ? value : false}
              small={small !== undefined ? small : false}
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
    small: boolean
  }>`
    display: flex;
    width: ${props => props.small ? '2.75rem' : '3.75rem'};
    height: ${props => props.small ? '1.75rem' : '2.25rem'};
    background: ${props => props.value ? `var(--F_Font_Color_Success)` : `var(--F_Font_Color_Disabled)`};
    border-radius: 1.25rem;
    position: relative;
    transition: background-color .5s;
  `,
  Span: styled.span<{
    value: boolean,
    small: boolean
  }>`
    position: absolute;
    top: ${props => props.small ? '.325rem' : '0.375rem'};
    transform: ${props => props.value
                            ? props.small
                              ? `translateX(1.25rem)`
                              : `translateX(1.8rem)`
                            : props.small
                              ? `translateX(0.4rem)`
                              : `translateX(0.45rem)`
                              };
    width: ${props => props.small ? '1.1rem' : '1.5rem'};
    height: ${props => props.small ? '1.1rem' : '1.5rem'};
    border-radius: 50%;
    transition: 0.2s;
    background: #fff;
  `
}

import styled from 'styled-components'
import React from 'react'

interface Props {
  value?: boolean,
  onChange: Function,
  disabled?: boolean
}

/**
 * Switch component is a simple boolean switch component which toggles between active (true) and inactive (false) states.
 * The component receives a value prop which it uses to determine its initial state and onChange handler to update 
 * the state.The Switch component includes an "enabled" and "disabled" state.
 *
 * @param {boolean} value - The current state of the switch.
 * @param {Function} onChange - Function to be executed when the switch is toggled.
 * @param {boolean} disabled - Defines whether the switch is interactable or not. Default: false.
 *
 * @example
 * return (
 *  <div>
 *    <Switch value={isTrue} onChange={setIsTrue} />
 *  </div>
 * )
 * 
 * @component
 */
export const Switch = ({ value, onChange, disabled }: Props) => {
  return (
    <S.Switch>
      <input
        hidden
        disabled={disabled}
        checked={value}
        type="checkbox"
      />
      <S.Container
        onClick={() => disabled ? null : onChange(!value)}
        value={value ? value : false}
      >
        <S.Dot
          value={value ? value : false}
        />
      </S.Container>
    </S.Switch>
  )
}

const S = {
  Switch: styled.div`
    cursor: pointer;
  `,
  Container: styled.div<{
    value: boolean,
    onClick: Function
  }>`
    display: flex;
    align-items: center;
    width: 2.75rem;
    height: var(--F_Input_Height_Compact);
    background: ${props => props.value ? `var(--F_Font_Color_Success)` : `var(--F_Surface_1)`};
    border-radius: 1.25rem;
    position: relative;
    &:hover {
      background: ${props => props.value ? `var(--F_Font_Color_Success)` : `var(--F_Surface_2)`};
    }
  `,
  Dot: styled.span<{
    value: boolean
  }>`
    position: absolute;
    left: ${props => props.value ? `1.35rem` : `.25rem`};
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    transition: 0.2s;
    background: var(--F_Font_Color);
  `
}

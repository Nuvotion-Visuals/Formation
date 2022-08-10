import React, { useCallback, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { Icon } from '../Icon/Icon'

type Props = {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  success?: boolean,
  textarea?: boolean,
  type?: string,
  id?: string,
  onChange?: (value: string) => void,
  value: string,
  autoFocus?: boolean
}

export const TextInput = ({ 
  label, 
  error, 
  success, 
  disabled, 
  textarea, 
  type, 
  onChange,
  id,
  value,
  autoFocus,
  ...props
}: Props) => {

  const [textValue, setTextValue] = useState('')
  const [locked, setLocked] = useState(false)
  const [focused, setFocused] = useState(false)

  // const autoFocusRef = useCallback((el : any) => el && autoFocus ? el.focus() : null, [])

  const icon = null

  return (
    <S.Container>
      <S.ErrorIconContainer>
        {
          success 
            ? <S.IconContainer error={false}>
                <Icon icon='check' iconPrefix='fas'/>
              </S.IconContainer> 
            : null
        }
        {
          error 
            ? <S.IconContainer error={true}>
                <Icon icon='exclamation-triangle' iconPrefix='fas'/>
              </S.IconContainer> 
            : null
        }
      </S.ErrorIconContainer>

      <S.Input
        value={value}
        // ref={autoFocusRef}
        id={id}
        icon={icon !== null}
        type={type ? type : 'text'}
        locked={locked}
        focused={focused}
        onChange={event => {
          const newValue = (event.target as HTMLInputElement).value

          if (onChange) {
            onChange(newValue)
          }

          setTextValue(newValue)
          setLocked(newValue == '')
          if (focused === true) {
            setLocked(true)
          } else {
            setLocked(false)
          }
        }}
        autoComplete={'off'}
        onFocus={event => {
          setLocked(true)
          setFocused(true)
        }}
        onBlur={event => {
          setLocked(textValue == '' ? false : true)
          setFocused(false)
        }}
      />
      <S.Label 
        locked={locked} 
        focused={focused} 
        icon={icon !== null} 
        shrink={value !== '' || focused}
      >
        {
          label
        }
      </S.Label>
      
      {
        error
          ? <S.ErrorContainer>
              <S.Error>{ error }</S.Error>
            </S.ErrorContainer>
          : null
      }
      
      
    </S.Container>
  )
}

interface InputProps {
  name?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  focused: boolean,
  type?: string,
  locked: boolean,
  id?: string,
  pad?: boolean,
  icon: boolean,
  onChange?: (e : any) => void
}

interface LabelProps {
  locked: boolean,
  icon: boolean,
  focused: boolean,
  shrink: boolean
}

interface FloatingLabelProps {
  error?: string,
  disabled?: boolean,
  success?: boolean
}

interface IconContainerProps {
  error: boolean
}

const moveUp = keyframes`
  0% { top: 0.5rem; }
  100% { top: -.5rem; }
`

const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    &:focus-within {
      input {
        color: white;
      }
    }
  `,
  Input: styled.input<InputProps>`
    width: 100%;
    box-sizing: border-box;
    height: var(--Input_Height);
    position: relative;
    font-size: var(--Font_Size);
    color: var(--EC_Black_1100);
    border-radius: 0.5rem;
    border: none;
    padding: 0 1rem;
    outline: none;
    -webkit-appearance: none;
    box-shadow: var(--Outline);
    border-radius: 16px;
    background: var(--Background_Alternating);
    color: var(--Font_Color);

  `,
  Label: styled.label<LabelProps>`
    position: absolute;
    top: 0.5rem;
    left: ${props => props.icon ? '2.75rem' : '1.1rem'};
    color: ${props => props.focused ? 'var(--Font_Color)' : 'var(--Font_Color_Label)'};
    font-size: ${props => props.shrink ? '13px' : '15px'};
    pointer-events: none;
    background: var(--Background);
    animation: ${props => props.locked ? css`${moveUp} .15s ease-in forwards` : 'none'};
  `,
  FloatingLabel: styled.div<FloatingLabelProps>`
    display: flex;
    font-size: var(--Font_Size);
    line-height: 1;
    pointer-events: none;
    letter-spacing: var(--Letter_Spacing_Header);
    left: 1rem;
    transition: 0.2s ease all;
    z-index: 1;
    margin-left: .5rem;
    padding-bottom: 8px;
    color: ${props => props.error 
      ? 'var(--Font_Color_Error)' 
      : props.disabled
        ? 'var(--Font_Color_Disabled)'
        : props.success
          ? 'var(--Font_Color_Success)'
          : 'var(--Font_Color_Label)'
    };
    
  `,
  ErrorContainer: styled.div`
    width: 100%;
    margin-top: .5rem;

    color: var(--Font_Color_Error);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* line-height: 1; */
  `,
  Error: styled.div`
    margin-left: .5rem;
    font-size: 14px;
  `,
  ErrorIconContainer: styled.div`
    position: relative;
  `,
  IconContainer: styled.div<IconContainerProps>`
    position: relative;

    * {
      position: absolute;
      height: 36px;
      width: 36px;
      top: 4px;
      left: 12px;
      z-index: 1;
      font-size: 24px;
      color: ${props => props.error ? 'var(--Font_Color_Error)' : 'var(--Font_Color_Success)'};
    }
  `
}

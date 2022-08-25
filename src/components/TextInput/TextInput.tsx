import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

import { Icon } from '../../internal'

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
  autoFocus?: boolean,
  icon?: IconName,
  iconPrefix?: IconPrefix,
  tooltip?: string,
  onClick?: () => void,
  preventFocus?: boolean,
  onBlur?: () => void,
  ref?: any
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
  icon,
  iconPrefix,
  tooltip,
  onClick,
  preventFocus,
  onBlur,
  ref
}: Props) => {

  const [locked, setLocked] = useState(value !== '')
  const [focused, setFocused] = useState(value !== '')

  useEffect(() => {
    if (value) {
      setLocked(false)
      setFocused(false)
    }
  }, [value])

  return (<S.OutterContainer onClick={() => {
    if (onClick) {
      onClick()
    }
  }}>
    <S.Container 
      error={error} 
      disabled={disabled} 
      success={success}
    >
      <S.ErrorIconContainer>
        {
          success 
            ? <S.IconContainer 
              error={false}
            >
                <Icon 
                  icon='check' 
                  iconPrefix='fas' 
                  fixedWidth
                />
              </S.IconContainer> 
            : null
        }
        {
          error 
            ? <S.IconContainer 
                error={true}
              >
                <Icon 
                  icon='exclamation-triangle' 
                  iconPrefix='fas'
                />
              </S.IconContainer> 
            : null
        }
        {
          !error && !success && icon
            ? <Icon 
                icon={icon} 
                iconPrefix='fas' 
              />
            : null
        }
      </S.ErrorIconContainer>

      <S.Input
        value={value}
        preventFocus={preventFocus}
        // ref={autoFocusRef}
        ref={ref}
        id={id}
        hasIcon={icon !== undefined} 
        type={type ? type : 'text'}
        locked={locked}
        focused={focused}
        onChange={event => {
          const newValue = (event.target as HTMLInputElement).value
          if (newValue && onChange) {
            onChange(newValue)
          }
          setLocked(newValue == '')
          if (focused === true) {
            setLocked(true)
          } else {
            setLocked(false)
          }
        }}
        autoComplete={'off'}
        onFocus={() => {
          setLocked(true)
          setFocused(true)
        }}
        onBlur={() => {
          setLocked(value == '' ? false : true)
          setFocused(false)
          if (onBlur) {
            onBlur()
          }
        }}
      />
      <S.Label 
        locked={locked} 
        focused={focused} 
        hasIcon={icon !== undefined} 
        shrink={value !== '' || focused}
        disableAnimation={value !== '' && !focused}
      >
        {
          label
        }
      </S.Label>

        {
          tooltip
            ? <S.ErrorIconContainer 
                title={tooltip}
              >
                <Icon 
                  icon={'info-circle'} 
                  iconPrefix='fas' 
                />
              </S.ErrorIconContainer>
            : null
        }
    </S.Container>
    
    {
      error
        ? <S.ErrorContainer>
            <S.Error>
              { error }
            </S.Error>
          </S.ErrorContainer>
        : null
    }
    </S.OutterContainer>
  )
}

const moveUp = keyframes`
  0% { 
    top: 0.6rem; 
    font-size: var(--F_Font_Size);

  }
  100% { 
    top: 0rem; 
    font-size: calc(var(--F_Font_Size) * .9);
  }
`

const S = {
  OutterContainer: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `,
  Container: styled.div<{
    error?: string,
    disabled?: boolean,
    success?: boolean
  }>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    width: 100%;

    &:hover {
      box-shadow: ${props => 
        props.success 
          ? 'var(--F_Outline_Success)' 
          : props.error
            ? 'var(--F_Outline_Error)'
            : 'var(--F_Outline_Hover)'
      };
    }
    
    &:focus-within {
      box-shadow: ${props => 
        props.success 
          ? 'var(--F_Outline_Success)' 
          : props.error
            ? 'var(--F_Outline_Error)'
            : 'var(--F_Outline_Hover)'
      };
    };
    background: var(--F_Background_Alternating);
    box-shadow: ${props => 
      props.success 
        ? 'var(--F_Outline_Success)' 
        : props.error
          ? 'var(--F_Outline_Error)'
          : 'var(--F_Outline)'
    };
    border-radius: 16px;

  `,
  Input: styled.input<{
    name?: string,
    label?: string,
    error?: string,
    disabled?: boolean,
    focused: boolean,
    type?: string,
    locked: boolean,
    hasIcon: boolean
    id?: string,
    pad?: boolean,
    onChange?: (e : any) => void,
    preventFocus?: boolean
  }>`
    width: 100%;
    height: var(--F_Input_Height);
    position: relative;
    font-size: var(--F_Font_Size);
    border-radius: 0.5rem;
    vertical-align: center;
    border: none;
    padding-left: ${props => props.hasIcon ? '.5rem' : '0'};
    outline: none;
    -webkit-appearance: none;
    border-radius: 16px;
    color: var(--F_Font_Color);
    background: none;
    pointer-events: ${props => props.preventFocus ? 'none' : 'auto'};
  `,
  Label: styled.label<{
    locked: boolean,
    hasIcon: boolean,
    focused: boolean,
    shrink: boolean,
    disableAnimation: boolean
  }>`
    position: absolute;
    top: 50%;
    line-height: 0;
    height: .5rem;
    left: ${props => props.hasIcon ? '2.5rem' : '1rem'};
    color: var(--F_Font_Color_Label);
    font-size: var(--F_Font_Size);
    pointer-events: none;
    background: ${props => props.shrink ? 'var(--F_Background_Alternating)' : 'none'};
    animation: ${props => props.shrink ? css`${moveUp} ${props.disableAnimation ? '0s' : '.15s'} forwards` : 'none'};
  `,
  FloatingLabel: styled.div<{
    error?: string,
    disabled?: boolean,
    success?: boolean
  }>`
    display: flex;
    font-size: var(--F_Font_Size);
    line-height: 1;
    pointer-events: none;
    letter-spacing: var(--F_Letter_Spacing_Header);
    left: 1rem;
    transition: 0.2s ease all;
    z-index: 1;
    margin-left: .5rem;
    padding-bottom: 8px;
    color: ${props => props.error 
      ? 'var(--F_Font_Color_Error)' 
      : props.disabled
        ? 'var(--F_Font_Color_Disabled)'
        : props.success
          ? 'var(--F_Font_Color_Success)'
          : 'var(--F_Font_Color_Label)'
    };
  `,
  ErrorContainer: styled.div`
    width: 100%;
    margin-top: .5rem;

    color: var(--F_Font_Color_Error);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* line-height: 1; */
  `,
  Error: styled.div`
    margin-top: -.25rem;
    margin-left: 1rem;
    font-size: 13px;
  `,
  ErrorIconContainer: styled.div`
    position: relative;
  `,
  IconContainer: styled.div<{
    error: boolean
  }>`
    position: relative;
    * {
      color: ${props => props.error ? 'var(--F_Font_Color_Error)' : 'var(--F_Font_Color)'};
    }
  `
}
